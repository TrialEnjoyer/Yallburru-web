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
  X,
  LayoutGrid,
  Image as ImageIcon,
  Award,
  Shield,
  CheckCircle,
  BadgeCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WaveDivider from "../components/WaveDivider";
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
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="w-48 relative">

            <Image 
              src="/banner.webp" 
              alt="Yallburru Community Services banner" 
              width={192}
              height={48}
              priority
              className="h-full w-auto object-contain"
            />
          </Link>
          
          {/* Desktop Navigation links */}
          <div className="hidden md:flex gap-6 pr-4">
            <Link href="#about" className="text-white hover:text-sky-400 flex items-center gap-2">
              <Users size={18} />
              About
            </Link>
            <Link href="#services" className="text-white hover:text-sky-400 flex items-center gap-2">
              <Heart size={18} />
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
                <Heart size={18} />
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

      {/* Hero Section */}
      <section className="pt-24 pb-0 bg-gradient-to-b from-black via-sky-900 to-sky-600">
        <div className="container mx-auto px-4 py-28 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            Elder Care & Disability Services Provider
          </h1>
          <p className="text-xl md:text-2xl font-light text-purple-100 mb-12 max-w-3xl mx-auto">
            Gold Coast, South East Qld & Nationwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="#contact" 
              className="bg-sky-500 text-white px-8 py-4 rounded-full 
                         hover:bg-sky-400 inline-flex items-center gap-2 
                         transition-colors shadow-lg"
            >
              Get In Touch
              <ArrowRight size={20} />
            </Link>
            <Link 
              href="#services" 
              className="text-white px-8 py-4 rounded-full 
                         border border-white/30 hover:border-sky-300 hover:text-sky-300
                         inline-flex items-center gap-2 transition-colors"
            >
              Our Services
              <LayoutGrid size={20} />
            </Link>
          </div>
        </div>
        <WaveDivider />
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-sky-900">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-sky-100 rounded-full mb-4 flex items-center justify-center">
                <Home size={32} className="text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-sky-900">Home Health Care</h3>
              <p className="text-gray-600">Professional care services in the comfort of your home.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-sky-100 rounded-full mb-4 flex items-center justify-center">
                <Heart size={32} className="text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-sky-900">Disability Support</h3>
              <p className="text-gray-600">Specialized support for individuals with disabilities.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-sky-100 rounded-full mb-4 flex items-center justify-center">
                <Users size={32} className="text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-sky-900">Elder Care</h3>
              <p className="text-gray-600">Compassionate care services for elderly individuals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-sky-900">About Yallburru</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex items-center justify-center bg-sky-100 rounded-lg p-12">
              <ImageIcon size={200} className="text-sky-400" />
            </div>
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Yallburru Community Services is a leading provider of disability and aged care services 
                in South East Queensland. Our name, derived from Indigenous Australian language, 
                reflects our commitment to community and care.
              </p>
              <p className="text-gray-600 leading-relaxed">
                With over (X) years of experience, we specialize in providing personalized care 
                solutions that enhance the quality of life for our clients. Our dedicated team 
                of professionals is committed to delivering exceptional care with compassion and respect.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-sky-50 rounded-lg">
                  <h4 className="text-2xl font-bold text-sky-900">(X)+</h4>
                  <p className="text-gray-600">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-sky-50 rounded-lg">
                  <h4 className="text-2xl font-bold text-sky-900">1000+</h4>
                  <p className="text-gray-600">Clients Served</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-sky-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-sky-900">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "The care and attention provided by Yallburru has made a significant difference in my father's life. Their staff is exceptional.",
                author: "Sarah Mitchell",
                role: "Family Member"
              },
              {
                text: "As an NDIS participant, I've found Yallburru's services to be professional, reliable, and truly person-centered.",
                author: "James Wilson",
                role: "Client"
              },
              {
                text: "The team at Yallburru goes above and beyond. Their commitment to quality care is evident in everything they do.",
                author: "Emma Thompson",
                role: "Family Member"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  {"⭐".repeat(5)}
                </div>
                <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-sky-900">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-sky-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Yallburru?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Person-Centered Care",
                description: "Tailored support plans that put your needs first",
                icon: "🎯"
              },
              {
                title: "Qualified Staff",
                description: "Experienced and professionally trained caregivers",
                icon: "👥"
              },
              {
                title: "Cultural Sensitivity",
                description: "Respect for diverse cultural backgrounds",
                icon: "🤝"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock care when you need it",
                icon: "⏰"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sky-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-sky-900">Our Accreditations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="flex flex-col items-center p-6 bg-sky-50 rounded-lg w-full max-w-[200px] aspect-video">
              <Shield size={48} className="text-sky-600 mb-2" />
              <p className="text-sm text-sky-900 text-center">NDIS Registered Provider</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-sky-50 rounded-lg w-full max-w-[200px] aspect-video">
              <Award size={48} className="text-sky-600 mb-2" />
              <p className="text-sm text-sky-900 text-center">Aged Care Quality Standards</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-sky-50 rounded-lg w-full max-w-[200px] aspect-video">
              <CheckCircle size={48} className="text-sky-600 mb-2" />
              <p className="text-sm text-sky-900 text-center">ISO Certified</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-sky-50 rounded-lg w-full max-w-[200px] aspect-video">
              <BadgeCheck size={48} className="text-sky-600 mb-2" />
              <p className="text-sm text-sky-900 text-center">Disability Services Certified</p>
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
            <Link href="/">
            <Image src="/Logo.webp" alt="Yallburru Community Services Logo" className="rounded-full" width={36} height={36} />
            </Link>
          </div>
          <p>© {new Date().getFullYear()} Yallburru Community Services. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}