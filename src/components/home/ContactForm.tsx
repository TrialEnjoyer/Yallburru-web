import { useState } from 'react';
import { supabase } from '../../utils/supabase';
import { Send, ChevronDown } from 'lucide-react';
import { api } from '~/utils/api';

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  preferred_contact: 'email' | 'phone';
};

const initialFormData: FormData = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  preferred_contact: 'email'
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const sendEmail = api.mail.send.useMutation();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('Contact_Submissions')
        .insert([formData]);

      if (error) throw error;

      // send email to origin
      await sendEmail.mutateAsync({
        email: formData.email,
        message: formData.message,
        subject: formData.subject,
        name: formData.first_name,
        fullName: formData.first_name + ' ' + formData.last_name,
        phone: formData.phone,
        preferred_contact: formData.preferred_contact,
      });

      setStatus('success');
      setMessage('Thank you for your message. We will get back to you soon!');
      setFormData(initialFormData);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleForm = () => {
    if (status === 'loading') return;
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <button
        onClick={toggleForm}
        disabled={status === 'loading'}
        className={`
          w-full flex items-center justify-between p-4 
          text-white rounded-lg transition-colors
          ${status === 'loading' 
            ? 'bg-sky-400 cursor-not-allowed opacity-75' 
            : 'bg-sky-500 hover:bg-sky-600'
          }
        `}
      >
        <span className="font-semibold">
          {status === 'loading' ? 'Sending Message...' : 'Send Us a Message'}
        </span>
        <ChevronDown 
          className={`
            transform transition-transform duration-200 
            ${isOpen ? 'rotate-180' : ''}
            ${status === 'loading' ? 'opacity-50' : ''}
          `} 
          size={20} 
        />
      </button>

      <div className={`
        transition-all duration-300 ease-in-out overflow-hidden
        ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="pt-6 px-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="preferred_contact" className="block text-sm font-medium text-gray-700 mb-1">
                Preferred Contact Method *
              </label>
              <select
                id="preferred_contact"
                name="preferred_contact"
                value={formData.preferred_contact}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full md:w-auto px-8 py-3 bg-sky-500 text-white rounded-lg 
                         hover:bg-sky-600 transition-colors disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {message && (
        <div className={`mt-4 p-4 rounded-lg ${status === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message}
        </div>
      )}
    </div>
  );
} 