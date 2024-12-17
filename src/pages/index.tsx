import Head from "next/head";
import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  Home,
  Briefcase,
  Users,
  ArrowRight,
  X,
  LayoutGrid,
  Award,
  Shield,
  CheckCircle,
  BadgeCheck,
  Accessibility,
  MapPinned,
  Handshake
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WaveDivider from "../components/home/WaveDivider";
import NewsletterSubscribe from "../components/home/NewsletterSubscribe";
import ContactForm from "../components/home/ContactForm";
//import yallburrubanner from "/banner.webp";

export default function Homepage() {
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

      {/* Hero Section */}
      <section className="pt-24 pb-0 bg-gradient-to-b from-black via-sky-900 to-sky-600">
        <div className="container mx-auto px-4 py-28 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">
            Yallburru Community Services
          </h1>
          <p className="text-xl md:text-2xl font-light text-purple-100 mb-12 max-w-3xl mx-auto">
            Providing Elder Care & Disability Support Across Gold Coast, South East QLD & Nationwide
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
              <h3 className="text-xl font-semibold mb-4 text-sky-900">Home Care</h3>
              <p className="text-gray-600">Prefessional care services delivered to your home.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-sky-100 rounded-full mb-4 flex items-center justify-center">
                <Accessibility size={32} className="text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-sky-900">Disability Support</h3>
              <p className="text-gray-600">Culturally sensitive disability support services and NDIS coordination.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-sky-100 rounded-full mb-4 flex items-center justify-center">
                <Users size={32} className="text-sky-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-sky-900">Elder Care</h3>
              <p className="text-gray-600">Respectful and compassionate care services for our Elders.</p>
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
              <Image 
                src="/banner.webp"
                alt="Caring staff member with client"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <p className="text-gray-600 leading-relaxed">
                Yallburru Community Services is a leading Indiginous, Disability and aged care service provider 
                at the forefront of service and program development in South East Queensland.
              </p>
              <p className="text-gray-600 leading-relaxed">
                {`With over 15 years of experience, we specialize in providing personalized care 
                solutions that enhance the quality of life for our clients. Our dedicated team 
                of professionals is committed to delivering exceptional care with compassion, respect and honoring our communities' cultural heritage.`}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-sky-50 rounded-lg">
                  <h4 className="text-2xl font-bold text-sky-900">Community</h4>
                  <p className="text-gray-600">First Approach</p>
                </div>
                <div className="text-center p-4 bg-sky-50 rounded-lg">
                  <h4 className="text-2xl font-bold text-sky-900">Nationwide</h4>
                  <p className="text-gray-600">Service Coverage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* Removed for now 
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
      </section>*/
      }

      {/* Why Choose Us Section */}
      <section className="py-20 bg-sky-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Yallburru?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Cultural Connection",
                description: "Services grounded in Aboriginal & Torres Strait Islander values",
                icon: <Handshake className="mx-auto text-white" size={40} />
              },
              {
                title: "Qualified Staff",
                description: "Experienced and professionally trained caregivers",
                icon: "👥"
              },
              {
                title: "Holistic Care",
                description: "Supporting physical, social, and cultural wellbeing",
                icon: "🌟"
              },
              {
                title: "Nationwide Support",
                description: "Serving communities across Australia",
                icon: <MapPinned className="mx-auto text-white" size={40} />
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-4">
                  {typeof feature.icon === 'string' ? feature.icon : feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-sky-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation Section */}
      {/*
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-sky-900">Our Accreditations</h2>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
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
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-sky-900">Contact Us</h2>
          
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-sm mb-8">
            <h3 className="text-xl font-semibold mb-6 text-sky-900">Get in Touch</h3>
            <div className="space-y-4">
              <p className="flex items-center gap-3">
                <Phone className="text-sky-600 flex-shrink-0" size={24} />
                <span>(07) 5632 5727</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="text-sky-600 flex-shrink-0" size={24} />
                <Link href="mailto:contact@yallburru.org.au">contact@yallburru.org.au</Link>
              </p>
              <p className="flex items-center gap-3">
                <MapPin className="text-sky-600 flex-shrink-0" size={24} />
                <span>55 Highland way, Upper Coomera, QLD, 4209</span>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Link href="/">
                  <Image 
                    src="/Logo.webp" 
                    alt="Yallburru Community Services Logo" 
                    className="rounded-full" 
                    width={36} 
                    height={36} 
                  />
                </Link>
              </div>
              <p className="text-gray-400">
                © {new Date().getFullYear()} Yallburru Community Services. All rights reserved.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <NewsletterSubscribe />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}