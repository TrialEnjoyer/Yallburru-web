import Head from 'next/head';
import ScheduleTab from '~/components/admin/ScheduleTab';

export default function SchedulePage() {
  return (
    <>
      <Head>
        <title>Schedule - Admin Dashboard - Yallburru Community Services</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto p-4 lg:p-8">
          <h1 className="text-2xl font-bold mb-8">Schedule Management</h1>
          
          <div className="bg-white rounded-lg shadow-sm">
            <ScheduleTab />
          </div>
        </div>
      </div>
    </>
  );
} 