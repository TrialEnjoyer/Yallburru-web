import { useState, useEffect } from "react";
import { Menu, Users, Briefcase, Phone, X, LogIn, User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useUserProfile } from "~/utils/UserProfileContext";
import { motion } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { userProfile, signOut } = useUserProfile();

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
      fixed top-0 w-full z-50 h-16
      transition-colors duration-300 ease-in-out
      ${scrolled 
        ? 'bg-black/80 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/5' 
        : 'bg-transparent'}
    `}>
      <div className="container mx-auto flex justify-between items-center h-full px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center h-full">
          <div className="w-36 sm:w-40 h-8">
            <Image 
              src="/banner.webp" 
              alt="Yallburru Community Services banner" 
              width={192}
              height={48}
              priority
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {/* Nav Links */}
          <div className="flex gap-1 mr-4">
            {[
              { href: "/#about", icon: <Users size={16} />, label: "About" },
              { href: "/#services", icon: <Briefcase size={16} />, label: "Services" },
              { href: "/contact", icon: <Phone size={16} />, label: "Contact" }
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative group px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {link.icon}
                  {link.label}
                </span>
                <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-1 pl-4 border-l border-white/10">
            {userProfile ? (
              <>
                {userProfile.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="relative group px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <User size={16} />
                      Admin
                    </span>
                    <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="relative group px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <LogOut size={16} />
                    Sign Out
                  </span>
                  <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="relative group px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <LogIn size={16} />
                  Sign In
                </span>
                <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative group p-2 text-gray-300 hover:text-white transition-colors"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="relative z-10">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </span>
          <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`
        md:hidden 
        fixed
        inset-x-0
        top-16
        h-[calc(100vh-64px)]
        bg-gradient-to-b
        from-black/95
        to-sky-950/95
        backdrop-blur-md
        border-t border-white/5
        transition-all 
        duration-300 
        ease-in-out
        ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none'}
      `}>
        <div className="container h-full mx-auto p-6 overflow-y-auto">
          <div className="flex flex-col h-full">
            {/* Nav Links */}
            <div className="space-y-2">
              {[
                { href: "/#about", icon: <Users size={20} />, label: "About" },
                { href: "/#services", icon: <Briefcase size={20} />, label: "Services" },
                { href: "/contact", icon: <Phone size={20} />, label: "Contact" }
              ].map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1.0]
                  }}
                >
                  <Link
                    href={link.href}
                    className="relative group flex items-center w-full p-4 text-lg text-gray-300 hover:text-white transition-colors rounded-xl"
                    onClick={toggleMenu}
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      {link.icon}
                      {link.label}
                    </span>
                    <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Mobile Auth Section */}
            <motion.div 
              className="mt-auto pt-6 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={isMenuOpen ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {userProfile ? (
                <div className="space-y-2">
                  {userProfile.role === 'admin' && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.4,
                        ease: [0.25, 0.1, 0.25, 1.0]
                      }}
                    >
                      <Link
                        href="/admin"
                        className="relative group flex items-center w-full p-4 text-lg text-gray-300 hover:text-white transition-colors rounded-xl"
                        onClick={toggleMenu}
                      >
                        <span className="relative z-10 flex items-center gap-4">
                          <User size={20} />
                          Admin
                        </span>
                        <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: 0.5,
                      ease: [0.25, 0.1, 0.25, 1.0]
                    }}
                  >
                    <button
                      onClick={handleSignOut}
                      className="relative group flex items-center w-full p-4 text-lg text-gray-300 hover:text-white transition-colors rounded-xl"
                    >
                      <span className="relative z-10 flex items-center gap-4">
                        <LogOut size={20} />
                        Sign Out
                      </span>
                      <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </motion.div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.4,
                    ease: [0.25, 0.1, 0.25, 1.0]
                  }}
                >
                  <Link
                    href="/login"
                    className="relative group flex items-center w-full p-4 text-lg text-gray-300 hover:text-white transition-colors rounded-xl"
                    onClick={toggleMenu}
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      <LogIn size={20} />
                      Sign In
                    </span>
                    <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
} 