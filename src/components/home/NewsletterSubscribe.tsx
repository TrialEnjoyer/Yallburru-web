import { useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Mail } from 'lucide-react';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('Yallburru_Email_List')
        .insert([{ email }]);

      if (error) throw error;

      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      console.error('Error:', error);
    } finally {
      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="text-lg font-semibold mb-2 text-white">Stay Updated</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-sky-500"
              required
              disabled={status === 'loading'}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className={`
              px-4 py-2 rounded-lg flex items-center gap-2
              transition-all duration-200
              ${status === 'loading'
                ? 'bg-sky-400 cursor-not-allowed opacity-75'
                : 'bg-sky-500 hover:bg-sky-600'
              }
              text-white disabled:cursor-not-allowed
            `}
          >
            {status === 'loading' ? (
              <span className="flex items-center gap-2">
                Subscribing...
                <Mail size={18} className="opacity-50" />
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Subscribe
                <Mail size={18} />
              </span>
            )}
          </button>
        </div>
        {message && (
          <p className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
} 