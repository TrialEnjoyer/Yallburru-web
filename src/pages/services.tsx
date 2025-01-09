import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Heart, 
  Users, 
  Clock, 
  Home, 
  Accessibility, 
  Phone, 
  Calendar,
  Clock4,
  Sparkles,
  Target,
  HandHeart,
  Leaf,
  Award,
  MessageCircle,
  CheckCircle2,
  Star,
  Shield,
  MapPin,
  Mail
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Services() {
  const [activeTab, setActiveTab] = useState("all");

  const services = [
    {
      title: "Elder Care Services",
      category: "elder",
      description: "Culturally sensitive care and support services tailored for our Elders, delivered with respect and understanding.",
      icon: <Heart className="w-6 h-6 text-sky-600" />,
      features: [
        "Personalized care plans",
        "Cultural connection activities",
        "Social engagement",
        "Health & wellbeing support"
      ],
      image: "/elder-care.jpg"
    },
    {
      title: "Disability Services",
      category: "disability",
      description: "NDIS-registered support services focused on empowerment, independence, and cultural connection.",
      icon: <Accessibility className="w-6 h-6 text-sky-600" />,
      features: [
        "NDIS registered provider",
        "Specialized support workers",
        "Community participation",
        "Cultural engagement"
      ],
      image: "/disability-support.jpg"
    },
    {
      title: "Youth & Family Services",
      category: "youth",
      description: "Supporting young people and families with culturally appropriate services and programs.",
      icon: <Users className="w-6 h-6 text-sky-600" />,
      features: [
        "Family support programs",
        "Youth engagement",
        "Cultural education",
        "Community activities"
      ],
      image: "/youth-services.jpg"
    },
    {
      title: "Community Consultation",
      category: "community",
      description: "Working with communities to ensure our services meet their needs and preserve cultural connections.",
      icon: <MessageCircle className="w-6 h-6 text-sky-600" />,
      features: [
        "Cultural consultation",
        "Community engagement",
        "Service planning",
        "Needs assessment"
      ],
      image: "/community.jpg"
    },
    {
      title: "Culture & Connection",
      category: "culture",
      description: "Programs and services focused on maintaining and strengthening cultural connections.",
      icon: <Leaf className="w-6 h-6 text-sky-600" />,
      features: [
        "Cultural activities",
        "Traditional practices",
        "Community events",
        "Knowledge sharing"
      ],
      image: "/culture.jpg"
    },
    {
      title: "Advocacy & Education",
      category: "advocacy",
      description: "Supporting our community through advocacy and educational programs.",
      icon: <Award className="w-6 h-6 text-sky-600" />,
      features: [
        "Community advocacy",
        "Educational programs",
        "Capacity building",
        "Rights awareness"
      ],
      image: "/advocacy.jpg"
    }
  ];

  return (
    <>
      <Head>
        <title>Our Services - Yallburru Community Services</title>
        <meta 
          name="description" 
          content="Explore our comprehensive Elder Care & Disability Support services at Yallburru Community Services." 
        />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-sky-900 via-sky-800 to-purple-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]">
            <div className="absolute inset-0 bg-sky-900 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_20%,black_100%)]"></div>
          </div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span className="text-sm font-medium text-sky-100">Our Services</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Empowering Lives Through
              <span className="block mt-2 bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
                Compassionate Care
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-sky-100/90 mb-12"
            >
              Providing culturally sensitive support services that enhance quality of life and promote independence
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link 
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-900 rounded-full
                         hover:bg-sky-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#services"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-sky-800/50 text-white border border-sky-400/30 
                         rounded-full hover:bg-sky-700/50 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
              >
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      </section>

      {/* Stats Section */}
      <section className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "15+", label: "Years Experience", icon: <Calendar className="w-6 h-6 text-sky-600" /> },
              { number: "1000+", label: "Clients Served", icon: <Users className="w-6 h-6 text-sky-600" /> },
              { number: "24/7", label: "Support Available", icon: <Clock4 className="w-6 h-6 text-sky-600" /> },
              { number: "100%", label: "Satisfaction Rate", icon: <Target className="w-6 h-6 text-sky-600" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-100 mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 mb-6"
              >
                <HandHeart className="w-4 h-4 text-sky-600" />
                <span className="text-sm font-medium text-sky-900">Our Services</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              >
                Comprehensive Care Solutions
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Tailored support services delivered with compassion and cultural sensitivity
              </motion.p>
            </div>

            {/* Service Filter Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {[
                { id: "all", label: "All Services" },
                { id: "elder", label: "Elder Care" },
                { id: "disability", label: "Disability Support" },
                { id: "youth", label: "Youth & Family Services" },
                { id: "community", label: "Community Consultation" },
                { id: "culture", label: "Culture & Connection" },
                { id: "advocacy", label: "Advocacy & Education" }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-sky-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-sky-50"
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </motion.div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {services
                .filter((service) => activeTab === "all" || service.category === activeTab)
                .map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={/*service.image*/ "logo.svg"}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                        <p className="text-sky-100 text-sm line-clamp-2">{service.description}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-gray-600">
                            <CheckCircle2 className="w-5 h-5 text-sky-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <Link
                          href={`/services/${service.category}`}
                          className="group inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 mb-6"
              >
                <Star className="w-4 h-4 text-sky-600" />
                <span className="text-sm font-medium text-sky-900">Why Choose Us</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              >
                What Sets Us Apart
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Experience the difference with our unique approach to care and support
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="w-6 h-6 text-sky-600" />,
                  title: "Quality Assurance",
                  description: "Registered NDIS provider meeting the highest industry standards"
                },
                {
                  icon: <Users className="w-6 h-6 text-sky-600" />,
                  title: "Expert Team",
                  description: "Highly trained and experienced professionals dedicated to your care"
                },
                {
                  icon: <Heart className="w-6 h-6 text-sky-600" />,
                  title: "Cultural Connection",
                  description: "Services grounded in Aboriginal & Torres Strait Islander values"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-sky-800 to-purple-900">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]">
            <div className="absolute inset-0 bg-sky-900 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_20%,black_100%)]"></div>
          </div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span className="text-sm font-medium text-sky-100">Get Started Today</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to Experience Better Care?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-sky-100/90 mb-12"
            >
              Join the Yallburru community and discover the difference compassionate, culturally-sensitive care can make
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link 
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-900 rounded-full
                         hover:bg-sky-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="tel:+61756325727"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-sky-800/50 text-white border border-sky-400/30 
                         rounded-full hover:bg-sky-700/50 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      </section>
    </>
  );
} 