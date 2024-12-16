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

const TEST_SUBMISSIONS: Submission[] = [
  {
    id: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    first_name: 'John',
    last_name: 'Smith',
    email: 'john.smith@email.com',
    phone: '0412345678',
    preferred_contact: 'phone',
    subject: 'NDIS Support Query',
    message: 'Hi, I\'m interested in learning more about your NDIS support services. Could someone please contact me to discuss options?',
    status: 'new',
    read: false,
    removed: false
  },
  {
    id: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    first_name: 'Sarah',
    last_name: 'Johnson',
    email: 'sarah.j@email.com',
    phone: '0423456789',
    preferred_contact: 'email',
    subject: 'Elder Care Services',
    message: 'Looking for information about elder care services for my mother. What services do you provide and what are the costs involved?',
    status: 'new',
    read: false,
    removed: false
  },
  {
    id: 3,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    first_name: 'Michael',
    last_name: 'Williams',
    email: 'mike.w@email.com',
    phone: null,
    preferred_contact: 'email',
    subject: 'General Enquiry',
    message: 'I would like to know more about your community services and how to get involved.',
    status: 'new',
    read: true,
    removed: false
  },
  {
    id: 4,
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    first_name: 'Emma',
    last_name: 'Brown',
    email: 'emma.brown@email.com',
    phone: '0434567890',
    preferred_contact: 'phone',
    subject: 'Urgent Support Request',
    message: 'Need assistance with disability support services. Please contact me as soon as possible.',
    status: 'new',
    read: false,
    removed: false
  },
  {
    id: 5,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    first_name: 'David',
    last_name: 'Wilson',
    email: 'david.wilson@email.com',
    phone: '0445678901',
    preferred_contact: 'email',
    subject: 'Feedback',
    message: 'I wanted to share some positive feedback about your services. The support worker who visited last week was excellent.',
    status: 'new',
    read: true,
    removed: false
  }
];

export default function Submissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // For testing, just set the test data directly
    //setSubmissions(TEST_SUBMISSIONS);
    //setIsLoading(false);

    // Comment out or remove the actual fetch for testing
     void fetchSubmissions();
  }, []);

  useEffect(() => {
    if (selectedSubmission && !selectedSubmission.read) {
      void markAsRead(selectedSubmission.id);
      // Update the local state to show the message as read
      setSubmissions(prevSubmissions => 
        prevSubmissions.map(sub => 
          sub.id === selectedSubmission.id 
            ? { ...sub, read: true }
            : sub
        )
      );
    }
  }, [selectedSubmission]);

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
                      onClick={() => setSelectedSubmission(submission)}
                      className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
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
        <div onClick={() => setSelectedSubmission(null)} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">Message Details</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      void removeSubmission(selectedSubmission.id);
                      setSelectedSubmission(null);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete submission"
                  >
                    <Trash2 size={20} />
                  </button>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
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