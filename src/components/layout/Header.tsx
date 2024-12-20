import { useState, useEffect } from "react";
import { Menu, Users, Briefcase, Phone, X, LogIn, User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useUserProfile } from "~/utils/UserProfileContext";
import { useAuth } from "~/utils/useAuth";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { userProfile } = useUserProfile();
  const { signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className={`
      fixed top-0 w-full bg-black/90 backdrop-blur-sm shadow-sm z-50
      transition-all duration-300
      ${scrolled ? 'h-[64px]' : 'h-auto'}
    `}>
      <div className={`
        container mx-auto flex justify-between items-center h-full
        transition-all duration-300
        ${scrolled ? 'px-4' : 'px-6'}
      `}>
        {/* Logo */}
        <Link href="/" className="w-48 relative">
          <Image 
            src="/banner.webp" 
            alt="Yallburru Community Services banner" 
            width={192}
            height={48}
            priority
            className={`
              h-full w-auto object-contain
              transition-all duration-300
              ${scrolled ? 'scale-[0.74]' : 'scale-100'}
            `}
          />
        </Link>
        
        {/* Desktop Navigation links with Auth */}
        <div className="hidden md:flex gap-6 pr-4 items-center">
          <Link href="#about" className="text-white hover:text-sky-400 flex items-center gap-2">
            <Users size={18} />
            About
          </Link>
          <Link href="#services" className="text-white hover:text-sky-400 flex items-center gap-2">
            <Briefcase size={18} />
            Services
          </Link>
          <Link href="#contact" className="text-white hover:text-sky-400 flex items-center gap-2">
            <Phone size={18} />
            Contact
          </Link>
          
          {/* Auth Section */}
          {userProfile ? (
            <div className="flex items-center gap-4 border-l border-gray-700 pl-4">
              {userProfile.role === 'admin' && (
                <Link href="/admin" className="text-white hover:text-sky-400 flex items-center gap-2">
                  <User size={18} />
                  Admin
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="text-white hover:text-sky-400 flex items-center gap-2"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="text-white hover:text-sky-400 flex items-center gap-2">
              <LogIn size={18} />
              Sign In
            </Link>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-white hover:bg-sky-900/50 rounded-lg transition-colors pr-4"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu with Auth */}
      <div className={`
        md:hidden 
        absolute 
        top-full 
        left-0 
        w-full 
        bg-black/95 
        shadow-lg 
        transition-all 
        duration-300 
        ease-in-out
        ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 invisible'}
      `}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col space-y-4 pb-4">
            <Link
              href="#about" 
              className="text-white flex items-center gap-2 p-2 hover:bg-sky-900/50 rounded-lg transition-colors"
              onClick={toggleMenu}
            >
              <Users size={18} />
              About
            </Link>
            <Link
              href="#services" 
              className="text-white flex items-center gap-2 p-2 hover:bg-sky-900/50 rounded-lg transition-colors"
              onClick={toggleMenu}
            >
              <Briefcase size={18} />
              Services
            </Link>
            <Link 
              href="#contact" 
              className="text-white flex items-center gap-2 p-2 hover:bg-sky-900/50 rounded-lg transition-colors"
              onClick={toggleMenu}
            >
              <Phone size={18} />
              Contact
            </Link>
            
            {/* Mobile Auth Section */}
            <div className="border-t border-gray-700 pt-4 mt-2">
              {userProfile ? (
                <>
                  {userProfile.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="text-white flex items-center gap-2 p-2 hover:bg-sky-900/50 rounded-lg transition-colors"
                      onClick={toggleMenu}
                    >
                      <User size={18} />
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="text-white flex items-center gap-2 p-2 hover:bg-sky-900/50 rounded-lg transition-colors w-full"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-white flex items-center gap-2 p-2 hover:bg-sky-900/50 rounded-lg transition-colors"
                  onClick={toggleMenu}
                >
                  <LogIn size={18} />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 