import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from './supabase';
import { useAuth } from './useAuth';

export type UserProfile = {
  id: string;
  email: string;
  role: 'user' | 'admin';
  first_name: string | null;
  last_name: string | null;
  created_at: string;
  updated_at: string;
};

type UserProfileContextType = {
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); 
  const [userId, setUserId] = useState<string | null>(null);
  //const {userId, isLoading: authLoading, isAuthenticated} = useAuth();
  //const router = useRouter();

  const getUser = async () => {
    //check for jwt
    const sess = await supabase.auth.getSession();
    //if no active jwt, exit.
    if (!sess.data.session?.user) return;
    //use jwt to obtain user
    const { data, error } = await supabase.auth.getUser(
      sess.data.session?.access_token,
    );
    if (error) {
      console.log(error);
    }
    setUserId(data.user?.id ?? null);
  };

  const fetchProfile = async () => {
    if (!userId) return;
    try {
      const { data, error } = await supabase
        .from('user_profile')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      if (!data?.role) return;
      setUserProfile(data as UserProfile);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    }
  };

  const refreshProfile = async () => {
    if (!userId) return;
    void fetchProfile();
  };

  useEffect(() => {
    if (!userId) {
      getUser().catch(console.error);
      return;
    }

    // Initial profile fetch
    const initializeProfile = async () => {
      try {
        await fetchProfile();
      } catch (err) {
        console.error('Profile initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize profile');
      } finally {
        setIsLoading(false);
      }
    };
    void initializeProfile();

    // Set up auth state change listener
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if ((event === 'INITIAL_SESSION') && session) {
          if (!userProfile) {
            await fetchProfile();
          }
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(null);
        }
      }
    );

    // Set up real-time subscription for profile changes
    const profileSubscription = supabase
      .channel('user_profile_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_profile',
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          if (payload.new !== payload.old) {
            setUserProfile(payload.new as UserProfile);
          }
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      authSubscription.unsubscribe();
      void profileSubscription.unsubscribe();
    };
  }, [userId]);

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        isLoading,
        error,
        refreshProfile,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}