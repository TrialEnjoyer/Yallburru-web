import { useState, useEffect } from "react";
import { Menu, Users, Briefcase, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        
        {/* Desktop Navigation links */}
        <div className="hidden md:flex gap-6 pr-4">
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

      {/* Mobile Navigation Menu */}
      <div 
        className={`
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
          ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 invisible'}
        `}
      >
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
          </div>
        </div>
      </div>
    </nav>
  );
} 