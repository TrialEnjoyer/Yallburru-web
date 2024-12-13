import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { supabase } from '~/utils/supabase';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        void router.push('/admin');
      }
    } catch (err) {
      setError('Invalid login credentials');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (error) throw error;

      setSuccess('Password reset instructions have been sent to your email');
      setIsResetMode(false);
    } catch (err) {
      setError('Failed to send reset instructions. Please try again.');
      console.error('Reset error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login - Yallburru Community Services</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              {isResetMode ? 'Reset Password' : 'Admin Login'}
            </h2>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-md text-center">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 text-green-500 p-4 rounded-md text-center">
              {success}
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={isResetMode ? handlePasswordReset : handleLogin}>
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              {!isResetMode && (
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-400"
              >
                {isLoading 
                  ? (isResetMode ? 'Sending...' : 'Signing in...') 
                  : (isResetMode ? 'Send Reset Instructions' : 'Sign in')}
              </button>
            </div>
          </form>

          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={() => {
                setIsResetMode(!isResetMode);
                setError(null);
                setSuccess(null);
              }}
              className="text-sm text-purple-600 hover:text-purple-500"
            >
              {isResetMode ? 'Back to login' : 'Forgot your password?'}
            </button>
            
            <p className="text-sm text-gray-500">
              {`Not a member? `}
              <Link href="/login" className="text-purple-600 hover:text-purple-500">
                Click here{' '}
              </Link>
              to register.
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 