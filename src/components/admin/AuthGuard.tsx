import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '~/utils/supabase';
import { withRetry } from '~/utils/retryUtils';
import { Database } from '~/types/supabase';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const timeoutId = setTimeout(() => {
      if (isMounted && isLoading) {
        setIsLoading(false);
        setError('Authentication check timed out');
        void router.push('/login');
      }
    }, 10000); // 10 second timeout

    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!isMounted) return;

        if (!session) {
          setIsLoading(false);
          void router.push('/login');
          return;
        }

        // Check if user has admin role in user_profile
        const response = await withRetry<{ role: "user" | "admin" | null; }>(() =>
          Promise.resolve(
            supabase
              .from('user_profile')
              .select('role')
              .eq('id', session.user.id)
              .single()
          )
        );

        if (response.error) throw response.error;

        const profile = response.data as { role: "user" | "admin" | null };

        if (!isMounted) return;

        if (error) {
          console.error('Profile fetch error:', error);
          setError('Failed to fetch user profile');
          setIsAuthenticated(false);
          void router.push('/');
          return;
        }

        if (profile?.role !== 'admin') {
          setIsAuthenticated(false);
          void router.push('/');
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        if (!isMounted) return;
        console.error('Auth error:', error);
        setError('Authentication failed');
        void router.push('/');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void checkAuth();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [router, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to access this area.</p>
          <p className="text-gray-600">Redirecting to home page...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 