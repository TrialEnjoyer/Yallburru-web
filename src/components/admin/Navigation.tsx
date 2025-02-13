import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, 
  Server,
  X,
  Calendar,
  LayoutDashboard,
  Pencil,
  InboxIcon,
  Settings
} from 'lucide-react';
import AuthGuard from './AuthGuard';

type NavigationProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

function Navigation({ isSidebarOpen, setIsSidebarOpen }: NavigationProps) {
  const router = useRouter();

  const navigationItems: { name: string; href: string; icon: React.ReactNode, target?: string }[] = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin' },
    { name: 'Site Editor', icon: <Pencil size={20} />, href: '/admin/editor' },
    { name: 'Form Submissions', icon: <InboxIcon size={20} />, href: '/admin/submissions' },
    { name: 'Schedule', icon: <Calendar size={20} />, href: '/admin/schedule' },
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
      {/* Admin Header */}
      <nav className={`
        bg-black/90 backdrop-blur-sm shadow-sm h-[64px]
        transition-all duration-300
      `}>
        <div className="container mx-auto h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 text-white hover:bg-sky-900/50 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/banner.png" 
                alt="Yallburru Community Services banner" 
                width={192}
                height={48}
                priority
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="text-white font-semibold">Admin Panel</div>
        </div>
      </nav>

      {/* Mobile Backdrop Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/50 transition-opacity duration-300
          lg:hidden
          ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar - updated z-index to appear above overlay */}
      <aside
        className={`
          fixed top-[64px] left-0 h-[calc(100vh-64px)] w-64 bg-sky-900 text-white 
          transition-transform duration-300 ease-in-out z-50
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="p-4">
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

export default function ProtectedNavigation(props: NavigationProps) {
  return (
    <AuthGuard>
      <Navigation {...props} />
    </AuthGuard>
  );
} 