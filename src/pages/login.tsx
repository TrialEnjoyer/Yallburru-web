import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { supabase } from '~/utils/supabase';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/login`,
          },
        });

        if (error) {
          setError(error.message);
          return;
        }

        if (data) {
          setSuccess('Please check your email to verify your account');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setIsSignUp(false);
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setError(error.message);
          return;
        }

        if (data.session) {
          void router.push('/');
        }
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Auth error:', err);
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
        redirectTo: `${window.location.origin}/reset-password`,
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

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
    setSuccess(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <>
      <Head>
        <title>{isSignUp ? 'Sign Up' : 'Login'} - Yallburru Community Services</title>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              {isResetMode 
                ? 'Reset Password' 
                : isSignUp 
                  ? 'Create your account' 
                  : 'Sign in to your account'}
            </h2>
          </div>

          {!isResetMode && (
              <button
                onClick={toggleMode}
                className="text-sm w-full text-center text-purple-600 hover:text-purple-500"
              >
                {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
              </button>
            )}
          


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

          <form className="mt-8 space-y-6" onSubmit={isResetMode ? handlePasswordReset : handleAuth}>
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
                <>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete={isSignUp ? 'new-password' : 'current-password'}
                      required
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  {isSignUp && (
                    <div>
                      <label htmlFor="confirmPassword" className="sr-only">
                        Confirm Password
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-purple-400"
              >
                {isLoading 
                  ? (isResetMode ? 'Sending...' : isSignUp ? 'Creating Account...' : 'Signing in...') 
                  : (isResetMode ? 'Send Reset Instructions' : isSignUp ? 'Create Account' : 'Sign in')}
              </button>
            </div>
          </form>

          <div className="flex flex-col items-center space-y-2">

            {!isSignUp && (
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
            )}
            
          </div>
        </div>
      </div>
    </>
  );
} 