import Head from "next/head";
import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  Home,
  Heart,
  Users,
  ArrowRight,
  Building2,
  X
} from "lucide-react";
import Image from "next/image";
//import yallburrubanner from "/banner.webp";

export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Head>
        <title>Yallburru Community Services</title>
        <meta 
          name="description" 
          content="Elder Care & Disability Services Provider - Gold Coast, South East Qld & Nationwide" 
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="w-48 relative">
            <Image 
              src="/banner.webp" 
              alt="Yallburru Community Services Logo" 
              width={192}
              height={48}
              priority
              className="h-12 w-auto object-contain"
            />
          </a>
          
          {/* Desktop Navigation links */}
          <div className="hidden md:flex gap-6">
            <a href="#about" className="hover:text-blue-600 flex items-center gap-2">
              <Users size={18} />
              About
            </a>
            <a href="#services" className="hover:text-blue-600 flex items-center gap-2">
              <Heart size={18} />
              Services
            </a>
            <a href="#contact" className="hover:text-blue-600 flex items-center gap-2">
              <Phone size={18} />
              Contact
            </a>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
            bg-white 
            shadow-lg 
            transition-all 
            duration-300 
            ease-in-out
            ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 invisible'}
          `}
        >
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-4 pb-4">
              <a 
                href="#about" 
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                <Users size={18} />
                About
              </a>
              <a 
                href="#services" 
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                <Heart size={18} />
                Services
              </a>
              <a 
                href="#contact" 
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={toggleMenu}
              >
                <Phone size={18} />
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-blue-50">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Elder Care & Disability Services Provider
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gold Coast, South East Qld & Nationwide
          </p>
          <a 
            href="#contact" 
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 inline-flex items-center gap-2"
          >
            Get In Touch
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full mb-4 flex items-center justify-center">
                <Home size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Home Health Care</h3>
              <p className="text-gray-600">Professional care services in the comfort of your home.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full mb-4 flex items-center justify-center">
                <Heart size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Disability Support</h3>
              <p className="text-gray-600">Specialized support for individuals with disabilities.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full mb-4 flex items-center justify-center">
                <Users size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Elder Care</h3>
              <p className="text-gray-600">Compassionate care services for elderly individuals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Contact Us</h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6 text-center">
              <p className="flex items-center justify-center gap-2">
                <Phone className="text-blue-600" size={24} />
                <span>(07) 5632 5727</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <Mail className="text-blue-600" size={24} />
                <span>admin@yallburru.org.au</span>
              </p>
              <p className="flex items-center justify-center gap-2">
                <MapPin className="text-blue-600" size={24} />
                <span>55 Highland way, Upper Coomera, QLD, 4209</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 size={24} />
          </div>
          <p>© {new Date().getFullYear()} Yallburru Community Services. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}