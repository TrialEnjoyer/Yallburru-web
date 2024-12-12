import { useEffect, useState } from 'react';
import Head from 'next/head';
import { supabase } from '~/utils/supabase';
import { 
  Check, 
  X, 
  Mail, 
  Phone, 
  Trash2, 
  RefreshCw,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Navigation from '~/components/admin/Navigation';

type Submission = {
  id: number;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  preferred_contact: string;
  subject: string;
  message: string;
  status: string;
  read: boolean;
  removed: boolean;
}

export default function Submissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    void fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from('Contact_Submissions')
      .select('*')
      .eq('removed', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching submissions:', error);
      return;
    }

    setSubmissions(data || []);
    setIsLoading(false);
  };

  const markAsRead = async (id: number) => {
    const { error } = await supabase
      .from('Contact_Submissions')
      .update({ read: true })
      .eq('id', id);

    if (error) {
      console.error('Error marking as read:', error);
      return;
    }

    void fetchSubmissions();
  };

  const removeSubmission = async (id: number) => {
    const { error } = await supabase
      .from('Contact_Submissions')
      .update({ removed: true })
      .eq('id', id);

    if (error) {
      console.error('Error removing submission:', error);
      return;
    }

    void fetchSubmissions();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading submissions...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Form Submissions - Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <Navigation 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Main Content */}
        <main className={`
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'lg:ml-64' : ''}
          p-4 lg:p-8
        `}>
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Form Submissions</h1>
              <button
                onClick={() => void fetchSubmissions()}
                className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              >
                <RefreshCw size={20} />
                Refresh
              </button>
            </div>

            {/* Submissions List */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="grid grid-cols-1 divide-y divide-gray-200">
                {submissions.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No submissions found
                  </div>
                ) : (
                  submissions.map((submission) => (
                    <div 
                      key={submission.id}
                      className={`p-6 hover:bg-gray-50 transition-colors ${
                        !submission.read ? 'bg-sky-50' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">
                              {submission.first_name} {submission.last_name}
                            </h3>
                            {!submission.read && (
                              <span className="bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{submission.subject}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Mail size={16} />
                              {submission.email}
                            </div>
                            {submission.phone && (
                              <div className="flex items-center gap-1">
                                <Phone size={16} />
                                {submission.phone}
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            Preferred Contact: {submission.preferred_contact}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {!submission.read && (
                            <button
                              onClick={() => void markAsRead(submission.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <CheckCircle size={20} />
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedSubmission(submission)}
                            className="p-2 text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                            title="View details"
                          >
                            <Mail size={20} />
                          </button>
                          <button
                            onClick={() => void removeSubmission(submission.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Remove submission"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Message Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Message Details</h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">From</h3>
                  <p>{selectedSubmission.first_name} {selectedSubmission.last_name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Subject</h3>
                  <p>{selectedSubmission.subject}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Message</h3>
                  <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p>{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <p>{selectedSubmission.phone ?? 'Not provided'}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Preferred Contact Method</h3>
                  <p>{selectedSubmission.preferred_contact}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Submitted</h3>
                  <p>{new Date(selectedSubmission.created_at).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 