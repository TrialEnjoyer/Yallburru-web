import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export function useAuth() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signOut = async () => {
    console.log('Signing out');
    await supabase.auth.signOut();
    console.log('Signed out');
    setUserId(null);
  };

  useEffect(() => {
    // Initial auth state check
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUserId(session?.user?.id ?? null);
      } finally {
        setIsLoading(false);
      }
    };

    void checkAuth();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    userId,
    isLoading,
    isAuthenticated: !!userId,
    signOut,
  };
} 