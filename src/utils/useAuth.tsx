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
    // Initial auth state check
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          setAuthState({
            userId: null,
            isLoading: false,
            error: error.message,
          });
          return;
        }

        setAuthState({
          userId: session?.user?.id ?? null,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        setAuthState({
          userId: null,
          isLoading: false,
          error: err instanceof Error ? err.message : 'Failed to get session',
        });
      }
    };

    void checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setAuthState({
        userId: session?.user?.id ?? null,
        isLoading: false,
        error: null,
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    ...authState,
    isAuthenticated: !!authState.userId,
    signOut,
  };
} 