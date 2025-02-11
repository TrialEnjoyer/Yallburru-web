import Head from "next/head";
import { useState, useEffect, useRef } from "react";
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
  Handshake,
  Calendar,
  Clock,
  Sparkles,
  ArrowUpRight,
  Star,
  Heart,
  Building2,
  MessageCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WaveDivider from "../components/home/WaveDivider";
import ContactForm from "../components/home/ContactForm";
import { supabase } from "~/utils/supabase";
import { motion } from "framer-motion";
import PartnersCarousel from "~/components/home/PartnersCarousel";

interface Article {
  id: string;
  title: string;
  description: string;
  slug: string;
  created_at: string;
  imageurl?: string;
}

export async function getStaticProps() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('id, title, description, slug, created_at, imageurl')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching articles:', error);
    return {
      props: {
        articles: [],
      },
      revalidate: 60 * 60, // Revalidate every hour
    };
  }

  return {
    props: {
      articles: articles || [],
    },
    revalidate: 60 * 60, // Revalidate every hour
  };
}

export default function Homepage({ articles }: { articles: Article[] }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen pt-12 md:pt-24 pb-0 bg-gradient-to-b from-black via-sky-900 to-sky-600 overflow-hidden"
      >
        {/* Interactive Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Dynamic Gradient Mesh */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
                          rgba(56, 189, 248, 0.3) 0%, 
                          rgba(59, 130, 246, 0.2) 45%, 
                          rgba(0, 0, 0, 0) 70%)`
            }}
          />
        </div>

        {/* Content Container */}
        <div className="container relative mx-auto px-4 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-5xl mx-auto text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span className="text-sm font-medium text-sky-100">Transforming Lives Through Care</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8">
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-white">
                Yallburru
              </span>
              <span className="block mt-2 text-2xl sm:text-3xl md:text-5xl text-sky-100 font-light">
                Community Services
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-2xl text-sky-100/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Providing Elder Care & Disability Support Across Gold Coast, 
              South East QLD & Nationwide with Compassion and Cultural Understanding
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 sm:px-0">
              {/* Primary CTA */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link 
                  href="#contact"
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-sky-900 rounded-full
                           overflow-hidden transition-all duration-300"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-sky-100 to-white opacity-0 
                                 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-sm sm:text-base">Get In Touch</span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 relative transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link 
                  href="#services"
                  className="group relative inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 sm:px-8 py-3 sm:py-4 
                           border border-white/30 text-white rounded-full
                           overflow-hidden transition-all duration-300"
                >
                  <span className="absolute inset-0 bg-white/10 opacity-0 
                                 group-hover:opacity-100 transition-opacity" />
                  <span className="relative text-sm sm:text-base">Explore Services</span>
                  <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5 relative transition-transform group-hover:rotate-12" />
                </Link>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className={`mt-16 sm:mt-24 hidden sm:block transition-opacity duration-500 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start p-1">
                  <motion.div
                    animate={{ y: [0, 16, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-full h-2 bg-white/50 rounded-full"
                  />
                </div>
                <span className="text-xs sm:text-sm text-white/50">scroll to explore</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Custom Animated Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <WaveDivider />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
        </div>

        <div className="container relative mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 mb-6"
            >
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span className="text-sm font-medium text-sky-900">Our Services</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Comprehensive Care Solutions
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-600"
            >
              Tailored support services delivered with compassion and cultural sensitivity
            </motion.p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {[
              {
                icon: <Home className="w-8 h-8" />,
                title: "Home Care",
                description: "Professional care services delivered to your home, ensuring comfort and independence.",
                features: ["Personal Care Assistance", "Household Support", "Medication Management", "Social Support"],
                color: "sky",
                delay: 0.2
              },
              {
                icon: <Accessibility className="w-8 h-8" />,
                title: "Disability Support",
                description: "Culturally sensitive disability support services",// and NDIS coordination.",
                features: [/*"NDIS Support", */"Community Access", "Skill Development", "Allied Health"],
                color: "purple",
                delay: 0.4
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Elder Care",
                description: "Respectful and compassionate care services for our Elders.",
                features: ["Respite Care", "Social Activities", "Transport Services", "Cultural Programs"],
                color: "indigo",
                delay: 0.6
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: service.delay, duration: 0.8 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className={`group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl 
                             transition-all duration-500 h-full border border-gray-100
                             hover:border-${service.color}-200`}
                >
                  {/* Service Card Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${service.color}-50 to-transparent 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
                  
                  {/* Icon */}
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-xl bg-${service.color}-100/30 flex items-center justify-center
                                   group-hover:scale-110 transition-transform duration-500`}>
                      <div className={`text-${service.color}-600`}>
                        {service.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative mt-6">
                    <h3 className={`text-2xl font-semibold mb-4 text-${service.color}-900`}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: service.delay + (idx * 0.1), duration: 0.5 }}
                          className="flex items-center gap-3"
                        >
                          <div className={`w-5 h-5 rounded-full bg-${service.color}-100 flex items-center justify-center`}>
                            <CheckCircle className={`w-3 h-3 text-${service.color}-600`} />
                          </div>
                          <span className="text-gray-600">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Learn More Link */}
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="mt-8"
                    >
                      <Link
                        href={`/services#${service.title.toLowerCase().replace(' ', '-')}`}
                        className={`inline-flex items-center gap-2 text-${service.color}-600 font-medium
                                   group-hover:text-${service.color}-700 transition-colors`}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
          <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
        </div>
      </section>

      {/* About Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gray-50">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Main Image */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-purple-500 rounded-2xl transform rotate-1 opacity-20 group-hover:rotate-2 group-hover:scale-105 transition-transform"></div>
                <div className="relative bg-gray-900 rounded-2xl p-2 shadow-lg transform -rotate-1 group-hover:rotate-0 transition-transform">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image 
                      src="/banner.png"
                      alt="Caring staff member with client"
                      fill
                      className=" object-scale-down transform group-hover:scale-105 transition-transform duration-700"
                      style={{ objectPosition: 'center center' }}
                    />
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute -bottom-12 -right-8 md:-right-12 bg-white rounded-2xl shadow-xl p-6 max-w-[240px]"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-sky-100 rounded-xl">
                    <Users className="w-6 h-6 text-sky-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">1000+</div>
                    <div className="text-sm text-gray-600">Clients Supported</div>
                  </div>
                </div>
              </motion.div>

              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">15+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Section Label */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-sky-100 mb-4 sm:mb-6"
              >
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" />
                <span className="text-xs sm:text-sm font-medium text-sky-900">About Yallburru</span>
              </motion.div>

              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Empowering Communities Through Compassionate Care
                </h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
                  Yallburru Community Services is a leading Indigenous, Disability and aged care service provider 
                  at the forefront of service and program development in South East Queensland.
                </p>
                <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12">
                  With over 15 years of experience, we specialize in providing personalized care solutions that 
                  enhance the quality of life for our clients. Our dedicated team of professionals is committed 
                  to delivering exceptional care with compassion, respect and honoring our communities&apos; cultural heritage.
                </p>

                {/* Feature Grid */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group p-6 bg-gradient-to-br from-sky-50 to-white rounded-xl border border-sky-100/50 hover:border-sky-200 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-sky-100 rounded-lg group-hover:bg-sky-200 transition-colors">
                        <Handshake className="w-6 h-6 text-sky-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-sky-900">Community First</h4>
                    </div>
                    <p className="text-gray-600">Prioritizing the needs of our community in everything we do</p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group p-6 bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-100/50 hover:border-purple-200 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                        <MapPinned className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="text-xl font-semibold text-purple-900">Nationwide</h4>
                    </div>
                    <p className="text-gray-600">Supporting communities across Australia</p>
                  </motion.div>
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="mt-12"
                >
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition-colors"
                  >
                    Learn More About Us
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <PartnersCarousel />
      {/* Testimonials Section }
      <section className="relative py-32 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        {/* Background Pattern }
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#f1f5f9_25%,transparent_25%,transparent_75%,#f1f5f9_75%,#f1f5f9)] bg-[length:32px_32px] [background-position:0_0,16px_16px] opacity-30" />
        </div>

        <div className="relative container mx-auto px-4">
          {/* Section Header }
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 mb-6"
            >
              <MessageCircle className="w-4 h-4 text-sky-600" />
              <span className="text-sm font-medium text-sky-900">Client Stories</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              What Our Clients Say
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-gray-600"
            >
              Real stories from the people we&apos;re proud to serve
            </motion.p>
          </motion.div>

          {/* Testimonials Grid */}
          {/*<div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "The care and attention provided by Yallburru has made a significant difference in my father&apos;s life. Their cultural understanding and respect for our traditions sets them apart.",
                author: "Sarah Mitchell",
                role: "Family Member",
                image: "/testimonials/1.jpg",
                rating: 5,
                delay: 0.2
              },
              {
                text: "As an NDIS participant, I&apos;ve found Yallburru&apos;s services to be professional, reliable, and truly person-centered. They understand my needs and support my independence.",
                author: "James Wilson",
                role: "Client",
                image: "/testimonials/2.jpg",
                rating: 5,
                delay: 0.4
              },
              {
                text: "The team at Yallburru goes above and beyond. Their commitment to quality care and cultural sensitivity makes them an invaluable partner in our community.",
                author: "Emma Thompson",
                role: "Family Member",
                image: "/testimonials/3.jpg",
                rating: 5,
                delay: 0.6
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: testimonial.delay, duration: 0.8 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl
                           transition-all duration-500 border border-gray-100"
                >
                  {/* Quote Icon }
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-sky-600" />
                  </div>

                  {/* Rating }
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Quote }
                  <blockquote className="text-gray-600 mb-6">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>

                  {/* Author }
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.author}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>

                  {/* Decorative Elements }
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-purple-500 
                                transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </motion.div>
              </motion.div>
            ))}
          </div>}

          {/* CTA }
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center mt-16"
          >
            <Link
              href="/testimonials"
              className="group inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 transition-colors"
            >
              View More Stories
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-32 bg-gradient-to-br from-sky-900 via-sky-800 to-purple-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c7_1px,transparent_1px),linear-gradient(to_bottom,#0284c7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-[0.2]" />
        </div>

        <div className="relative container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
            >
              <Star className="w-4 h-4 text-sky-300" />
              <span className="text-sm font-medium text-sky-100">Why Choose Us</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              What Sets Us Apart
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl text-sky-100/90"
            >
              Experience the difference with our unique approach to care and support
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
            {[
              {
                icon: <Handshake className="w-8 h-8" />,
                title: "Cultural Connection",
                description: "Services grounded in Aboriginal & Torres Strait Islander values and traditions",
                color: "sky",
                delay: 0.2
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Expert Team",
                description: "Highly trained and experienced professionals dedicated to your care",
                color: "purple",
                delay: 0.4
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Person-Centered Care",
                description: "Tailored support that puts your needs and preferences first",
                color: "pink",
                delay: 0.6
              },
              /*{
                icon: <Shield className="w-8 h-8" />,
                title: "Quality Assured",
                description: "Registered NDIS provider meeting highest industry standards",
                color: "indigo",
                delay: 0.8
              },*/
              {
                icon: <Clock className="w-8 h-8" />,
                title: "24/7 Support",
                description: "Round-the-clock assistance when you need it most",
                color: "blue",
                delay: 1.0
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "Nationwide Coverage",
                description: "Supporting communities across Australia with local expertise",
                color: "teal",
                delay: 1.2
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, duration: 0.8 }}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10
                           hover:bg-white/10 transition-all duration-500"
                >
                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  {/* Icon */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center
                                  group-hover:scale-110 transition-transform duration-500">
                      <div className="text-sky-300 group-hover:text-sky-200 transition-colors duration-500">
                        {feature.icon}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative mt-6">
                    <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-sky-200 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sky-100/80">
                      {feature.description}
                    </p>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                    <div className="absolute top-0 right-0 w-12 h-12 translate-x-6 -translate-y-6
                                  bg-white/5 rotate-45 transform origin-bottom-left" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
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

      {/* News Section - Add before the Contact Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center md:text-left md:flex md:justify-between md:items-center mb-8 md:mb-12">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-2">Latest Updates</h2>
                <p className="text-gray-600 text-sm md:text-base">Stay informed with our latest news and announcements</p>
              </div>
              {articles?.length > 2 && (
                <Link 
                  href="/news" 
                  className="group inline-flex items-center justify-center gap-2 
                         bg-white px-5 py-2.5 md:px-6 md:py-3 rounded-full shadow-sm hover:shadow-md 
                         border border-gray-200 text-sky-600 hover:text-sky-700 
                         text-sm md:text-base transition-all duration-300"
                >
                  View All News
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
            
            {/* Articles Grid */}
            <div className="grid gap-6 md:gap-8">
              {articles?.map((article, index) => (
                <Link 
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className={`group transform hover:-translate-y-1 transition-all duration-300 ${
                    index === 0 ? 'md:col-span-2' : ''
                  }`}
                >
                  <article className="bg-white rounded-xl md:rounded-2xl shadow-sm overflow-hidden hover:shadow-lg h-full">
                    {article.imageurl ? (
                      <div className="flex flex-col md:flex-row">
                        <div className={`relative ${
                          index === 0 ? 'aspect-[16/9] md:aspect-[3/2] md:w-2/3' : 'aspect-video md:w-2/5'
                        }`}>
                          <Image
                            src={article.imageurl}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                        </div>
                        <div className={`relative p-4 md:p-6 ${
                          index === 0 ? 'md:w-1/3' : 'md:w-3/5'
                        }`}>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <Calendar size={16} className="text-sky-600" />
                            {new Date(article.created_at).toLocaleDateString('en-AU', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <h3 className={`font-semibold text-gray-900 group-hover:text-sky-600 transition-colors mb-3 ${
                            index === 0 ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
                          }`}>
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm md:text-base line-clamp-2 mb-4">
                            {article.description}
                          </p>
                          <div className="inline-flex items-center gap-1 text-sky-600 font-medium text-sm md:text-base group-hover:gap-2 transition-all">
                            Read More
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row">
                        <div className={`relative ${
                          index === 0 ? 'aspect-[16/9] md:aspect-[3/2] md:w-2/3' : 'aspect-video md:w-2/5'
                        }`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-sky-100 to-sky-50 flex items-center justify-center">
                            <Image
                              src="/Logo.svg"
                              alt="Yallburru Logo"
                              width={index === 0 ? 120 : 80}
                              height={index === 0 ? 120 : 80}
                              className="rounded-full opacity-50"
                            />
                          </div>
                        </div>
                        <div className={`relative p-4 md:p-6 ${
                          index === 0 ? 'md:w-1/3' : 'md:w-3/5'
                        }`}>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <Calendar size={16} className="text-sky-600" />
                            {new Date(article.created_at).toLocaleDateString('en-AU', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <h3 className={`font-semibold text-gray-900 group-hover:text-sky-600 transition-colors mb-3 ${
                            index === 0 ? 'text-xl md:text-2xl' : 'text-lg md:text-xl'
                          }`}>
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm md:text-base line-clamp-2 mb-4">
                            {article.description}
                          </p>
                          <div className="inline-flex items-center gap-1 text-sky-600 font-medium text-sm md:text-base group-hover:gap-2 transition-all">
                            Read More
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                </Link>
              ))}

              {!articles || articles.length === 0 && (
                <div className="bg-white rounded-xl md:rounded-2xl shadow-sm p-6 md:p-12 text-center">
                  <div className="max-w-md mx-auto">
                    <Calendar size={32} className="mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No News Yet</h3>
                    <p className="text-sm md:text-base text-gray-600">
                      Check back soon for updates and announcements from Yallburru Community Services.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-sky-800 to-purple-900">
          {/* Animated Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]">
            <div className="absolute inset-0 bg-sky-900 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_20%,black_100%)]"></div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
              >
                <Sparkles className="w-4 h-4 text-sky-300" />
                <span className="text-sm font-medium text-sky-100">Get Started Today</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                Ready to Experience Better Care?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl text-sky-100/90 mb-12 max-w-3xl mx-auto"
              >
                Join the Yallburru community and discover the difference compassionate, culturally-sensitive care can make
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-6 justify-center"
              >
                {/* Primary CTA */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-sky-900 rounded-full
                             overflow-hidden transition-all duration-300"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-sky-100 to-white opacity-0 
                                   group-hover:opacity-100 transition-opacity" />
                    <span className="relative">Start Your Journey</span>
                    <ArrowRight className="w-5 h-5 relative transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>

                {/* Secondary CTA */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="tel:1300071157"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 
                             border border-white/30 text-white rounded-full
                             overflow-hidden transition-all duration-300"
                  >
                    <span className="absolute inset-0 bg-white/10 opacity-0 
                                   group-hover:opacity-100 transition-opacity" />
                    <Phone className="w-5 h-5 relative" />
                    <span className="relative">1300 071 157</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              {[
                {
                  icon: <Clock className="w-6 h-6" />,
                  title: "24/7 Support",
                  description: "Round-the-clock assistance whenever you need it",
                  delay: 0.2
                },
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: "Nationwide Coverage",
                  description: "Supporting communities across Australia",
                  delay: 0.4
                },
                {
                  icon: <Heart className="w-6 h-6" />,
                  title: "Personalized Care",
                  description: "Tailored support for your unique needs",
                  delay: 0.6
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: feature.delay, duration: 0.8 }}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group relative bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10
                             hover:bg-white/10 transition-all duration-500"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                        <div className="text-sky-300">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sky-100/80 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 sm:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.15] mix-blend-multiply">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-12 sm:mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-sky-100 mb-4 sm:mb-6"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-600" />
              <span className="text-xs sm:text-sm font-medium text-sky-900">Get in Touch</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6"
            >
              Contact Us Today
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 px-4 sm:px-0"
            >
              {"We're here to help. Reach out to us for any inquiries about our services."}
            </motion.p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-4 sm:gap-8 items-start">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-8">Ways to Connect</h3>
                  <div className="space-y-4 sm:space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="group"
                    >
                      <Link 
                        href="tel:1300071157"
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-sky-50 transition-colors"
                      >
                        <div className="p-2 sm:p-3 bg-sky-100 rounded-lg group-hover:bg-sky-200 transition-colors">
                          <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">Phone</div>
                          <div className="text-base sm:text-lg font-medium text-gray-900">1300 071 157</div>
                        </div>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="group"
                    >
                      <Link 
                        href="mailto:contact@yallburru.org.au"
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-sky-50 transition-colors"
                      >
                        <div className="p-2 sm:p-3 bg-sky-100 rounded-lg group-hover:bg-sky-200 transition-colors">
                          <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">Email</div>
                          <div className="text-base sm:text-lg font-medium text-gray-900 break-all">contact@yallburru.org.au</div>
                        </div>
                      </Link>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="group"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl hover:bg-sky-50 transition-colors">
                        <div className="p-2 sm:p-3 bg-sky-100 rounded-lg group-hover:bg-sky-200 transition-colors">
                          <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">Location</div>
                          <div className="text-base sm:text-lg font-medium text-gray-900">The Well, 58 Highland Way</div>
                          <div className="text-sm sm:text-base text-gray-600">Upper Coomera, QLD, 4209</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-8">
                  <ContactForm />
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
      </section>
    </>
  );
}