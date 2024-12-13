import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Search, Shield, ShieldOff, X } from 'lucide-react';
import { supabase } from '~/utils/supabase';
import Navigation from '~/components/admin/Navigation';
import AuthGuard from '~/components/admin/AuthGuard';

type UserProfile = {
  id: string;
  email: string;
  role: 'user' | 'admin';
  first_name: string | null;
  last_name: string | null;
};

type ConfirmationModal = {
  isOpen: boolean;
  userId: string;
  newRole: 'user' | 'admin';
} | null;

export default function Settings() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmModal, setConfirmModal] = useState<ConfirmationModal>(null);

  const fetchInitialUsers = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('user_profile')
      .select('*')
      .order('email')
      .limit(20);

    if (error) {
      console.error('Error fetching users:', error);
      alert('Error fetching users');
    } else {
      setUsers(data as UserProfile[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    void fetchInitialUsers();
  }, []);

  const searchUsers = async () => {
    if (!searchQuery.trim()) {
      return fetchInitialUsers();
    }
    
    setIsLoading(true);
    const { data, error } = await supabase
      .from('user_profile')
      .select('*')
      .ilike('email', `%${searchQuery}%`)
      .order('email');

    if (error) {
      console.error('Error searching users:', error);
      alert('Error searching users');
    } else {
      setUsers(data as UserProfile[]);
    }
    setIsLoading(false);
  };

  const handleRoleUpdate = (userId: string, newRole: 'user' | 'admin') => {
    setConfirmModal({ isOpen: true, userId, newRole });
  };

  const updateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
    const { error } = await supabase
      .from('user_profile')
      .update({ role: newRole })
      .eq('id', userId);

    if (error) {
      console.error('Error updating user role:', error);
      alert('Error updating user role');
    } else {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
    }
    setConfirmModal(null);
  };

  const getUserDisplayName = (user: UserProfile) => {
    if (user.first_name) {
      return `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`;
    }
    return user.email;
  };

  return (
    <AuthGuard>
      <Head>
        <title>Settings - Admin Dashboard - Yallburru Community Services</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <Navigation 
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className={`
          transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'lg:ml-64' : ''}
          p-4 lg:p-8
        `}>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Settings</h1>

            {/* User Management Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              
              {/* Search Bar */}
              <div className="flex gap-2 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search users by email..."
                    className="w-full px-4 py-2 border rounded-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
                  />
                </div>
                <button
                  onClick={searchUsers}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
                >
                  <Search size={20} />
                </button>
              </div>

              {/* Users List */}
              <div className="space-y-4">
                {users.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      {user.first_name ? (
                        <>
                          <p className="font-medium">{getUserDisplayName(user)}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </>
                      ) : (
                        <p className="font-medium">{user.email}</p>
                      )}
                      <p className="text-sm text-gray-500">
                        Role: <span className="font-medium">{user.role}</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {user.role === 'user' ? (
                        <button
                          onClick={() => handleRoleUpdate(user.id, 'admin')}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                          title="Grant Admin Access"
                        >
                          <Shield size={20} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRoleUpdate(user.id, 'user')}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          title="Remove Admin Access"
                        >
                          <ShieldOff size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {users.length === 0 && !isLoading && (
                  <p className="text-gray-500 text-center py-4">No users found</p>
                )}
                {isLoading && (
                  <p className="text-gray-500 text-center py-4">Searching...</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Confirm Role Change</h3>
              <button
                onClick={() => setConfirmModal(null)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="mb-2">
              {confirmModal.newRole === 'admin' 
                ? "Are you sure you want to grant admin access? This will give the user full administrative privileges."
                : "Are you sure you want to remove admin access? This will revoke the user's administrative privileges."}
            </p>

            <p className="mb-6 text-sm text-gray-600">
              User: <span className="font-medium">
                {getUserDisplayName(users.find(u => u.id === confirmModal.userId)!)}
              </span>
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => updateUserRole(confirmModal.userId, confirmModal.newRole)}
                className={`px-4 py-2 text-white rounded-lg ${
                  confirmModal.newRole === 'admin'
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthGuard>
  );
} 