import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '~/utils/supabase';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          void router.push('/admin/login');
          return;
        }

        // Check if user has admin role in user_profile
        const { data: profile, error } = await supabase
          .from('user_profile')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Profile fetch error:', error);
          setIsAuthenticated(false);
          void router.push('/admin/login');
          return;
        }

        if (profile?.role !== 'admin') {
          setIsAuthenticated(false);
          setTimeout(() => {
            void router.push('/');
          }, 5000);
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth error:', error);
        void router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    void checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading...</div>
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