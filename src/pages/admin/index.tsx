import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Mail, Calendar } from 'lucide-react';
import { supabase } from '~/utils/supabase';
import Link from 'next/link';

type Stat = { label: string; value: string; color: string, icon?: React.ReactNode }

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    void fetchUnreadMessages();
  }, []);

  const fetchUnreadMessages = async () => {
    const { count, error } = await supabase
      .from('Contact_Submissions')
      .select('*', { count: 'exact', head: true })
      .eq('read', false)
      .eq('removed', false);

    if (error) {
      console.error('Error fetching messages:', error);
      return;
    }

    setStats(prevStats => [
      ...prevStats.filter(stat => stat.label !== 'New Submissions'),
      {
        label: 'New Submissions',
        value: count?.toString() ?? '0',
        color: 'bg-purple-500',
        icon: <Mail size={20} className="text-white" />
      }
    ]);
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - Yallburru Community Services</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Link href="/admin/schedule" className="block">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center text-white mb-4">
                  <Calendar size={20} />
                </div>
                <h3 className="text-gray-500 text-sm">Schedule Management</h3>
                <p className="text-lg font-medium">View Calendar</p>
              </div>
            </Link>
            
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                  {stat.icon}
                </div>
                <h3 className="text-gray-500 text-sm">{stat.label}</h3>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent Activity Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {/* Add your recent activity items here */}
              <p className="text-gray-600">No recent activity to display.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
