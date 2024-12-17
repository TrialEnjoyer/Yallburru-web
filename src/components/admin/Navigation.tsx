import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, 
  Server,
  X,
  LayoutDashboard,
  Pencil,
  InboxIcon,
  Settings
} from 'lucide-react';

type NavigationProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function Navigation({ isSidebarOpen, setIsSidebarOpen }: NavigationProps) {
  const router = useRouter();

  const navigationItems: { name: string; href: string; icon: React.ReactNode, target?: string }[] = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
    { name: 'Site Editor', icon: <Pencil size={20} />, href: '/admin/editor' },
    { name: 'Form Submissions', icon: <InboxIcon size={20} />, href: '/admin/submissions' },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: <Settings size={20} />
    },
    {
      name: 'cPanel',
      href: 'http://110.232.143.63:2083',
      icon: <Server size={20} />,
      target: '_blank'
    }
  ];

  return (
    <>
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-md shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-sky-900 text-white transition-transform duration-300 ease-in-out z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-8">
            <Image 
              src="/Logo.webp" 
              alt="Yallburru Logo" 
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold">Admin Panel</span>
          </div>
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                target={item.target ?? undefined}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                  ${router.pathname === item.href 
                    ? 'bg-sky-800 text-white' 
                    : 'hover:bg-sky-800/50'}
                `}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
} 