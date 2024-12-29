import { useState, useEffect } from 'react';
import { supabase } from './supabase';

interface AuthState {
  userId: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    userId: null,
    isLoading: true,
    error: null,
  });

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setAuthState({
        userId: null,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      setAuthState(state => ({
        ...state,
        error: err instanceof Error ? err.message : 'Failed to sign out',
      }));
    }
  };

  useEffect(() => {
    //let mounted = true;

    // Initial auth state check
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          //if (mounted) {
            setAuthState({
              userId: null,
              isLoading: false,
              error: error.message,
            });
          //}
          //return;
        }

        //if (mounted) {
          console.debug('Initial session check:', session?.user?.id ? 'Authenticated' : 'Not authenticated');
          setAuthState({
            userId: session?.user?.id ?? null,
            isLoading: false,
            error: null,
          });
        //}
      } catch (err) {
        console.error('Unexpected error during auth check:', err);
        //if (mounted) {
          setAuthState({
            userId: null,
            isLoading: false,
            error: err instanceof Error ? err.message : 'Failed to get session',
          });
        //}
      }
    };

    void checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.debug('Auth state change:', event, session?.user?.id);
      
      //if (!mounted) return;

      // Only update state for relevant auth events
      //if (['SIGNED_IN', 'SIGNED_OUT', 'USER_UPDATED', 'TOKEN_REFRESHED'].includes(event)) {
        //setAuthState({
          //userId: session?.user?.id ?? null,
          //isLoading: false,
          //error: null,
        //});
      //}
    });

//    return () => {
  //    mounted = false;
    //  subscription.unsubscribe();
    //};
  }, []);

  return {
    ...authState,
    isAuthenticated: !!authState.userId,
    signOut,
  };
} 