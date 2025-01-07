import Head from "next/head";
import Image from "next/image";
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
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Services() {
  const [activeTab, setActiveTab] = useState("all");

  const services = [
    {
      title: "Elder Care",
      category: "elder",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      icon: <Heart className="w-6 h-6 text-sky-600" />,
      features: [
        "Personalized care plans",
        "24/7 support available",
        "Cultural sensitivity",
        "Social engagement activities"
      ],
      image: "/elder-care.jpg" // Replace with actual image
    },
    {
      title: "Disability Support",
      category: "disability",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      icon: <Accessibility className="w-6 h-6 text-sky-600" />,
      features: [
        "NDIS registered provider",
        "Specialized support workers",
        "Community participation",
        "Skill development programs"
      ],
      image: "/disability-support.jpg" // Replace with actual image
    },
    {
      title: "Home Care",
      category: "home",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      icon: <Home className="w-6 h-6 text-sky-600" />,
      features: [
        "Personal care assistance",
        "Household support",
        "Medication management",
        "Meal preparation"
      ],
      image: "/home-care.jpg" // Replace with actual image
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

      {/* Hero Section with Parallax Effect */}
      <div className="relative pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900 to-sky-800 opacity-90" />
          <div className="absolute inset-0 bg-[url('/services-hero.jpg')] bg-cover bg-center" /> {/* Replace with actual image */}
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Trusted Care Provider
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Empowering Lives Through
              <span className="block mt-2 bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
                Compassionate Care
              </span>
            </h1>
            <p className="text-xl text-sky-100 mb-12 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-sky-900 px-8 py-4 rounded-full hover:bg-sky-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 bg-sky-800/50 text-white border border-sky-400/30 px-8 py-4 rounded-full hover:bg-sky-700/50 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
              >
                Explore Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="relative h-16 bg-gray-50">
          <svg
            className="absolute bottom-0 w-full h-16 -mb-0.5"
            preserveAspectRatio="none"
            viewBox="0 0 1200 120"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              fill: "rgb(249, 250, 251)",
              width: "100%",
              height: 40,
              transform: "rotateY(180deg)"
            }}
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "15+", label: "Years Experience", icon: <Calendar className="w-6 h-6 text-sky-600" /> },
              { number: "1000+", label: "Clients Served", icon: <Users className="w-6 h-6 text-sky-600" /> },
              { number: "24/7", label: "Support Available", icon: <Clock4 className="w-6 h-6 text-sky-600" /> },
              { number: "100%", label: "Satisfaction Rate", icon: <Target className="w-6 h-6 text-sky-600" /> }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sky-100 mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="bg-gray-50 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Service Categories */}
            <div id="services" className="pt-16">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm font-medium mb-4">
                  <HandHeart className="w-4 h-4" />
                  Our Services
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Comprehensive Care Solutions
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>

              {/* Service Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                {[
                  { id: "all", label: "All Services" },
                  { id: "elder", label: "Elder Care" },
                  { id: "disability", label: "Disability Support" },
                  { id: "home", label: "Home Care" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-sky-600 text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-sky-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {services
                  .filter((service) => activeTab === "all" || service.category === activeTab)
                  .map((service, index) => (
                    <div 
                      key={index}
                      className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={service.image}
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
                            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium"
                          >
                            Learn More
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="mt-24">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm font-medium mb-4">
                  <Leaf className="w-4 h-4" />
                  Why Choose Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  What Sets Us Apart
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Award className="w-6 h-6 text-sky-600" />,
                    title: "Quality Assurance",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                  },
                  {
                    icon: <Users className="w-6 h-6 text-sky-600" />,
                    title: "Expert Team",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                  },
                  {
                    icon: <MessageCircle className="w-6 h-6 text-sky-600" />,
                    title: "Personalized Care",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                  }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Process Section */}
            <div className="mt-24">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm font-medium mb-4">
                  <Clock className="w-4 h-4" />
                  Our Process
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  How We Work
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-sky-100 hidden md:block" />
                <div className="space-y-12 relative">
                  {[
                    {
                      step: 1,
                      title: "Initial Consultation",
                      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                      icon: <MessageCircle className="w-6 h-6 text-sky-600" />
                    },
                    {
                      step: 2,
                      title: "Care Assessment",
                      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                      icon: <Users className="w-6 h-6 text-sky-600" />
                    },
                    {
                      step: 3,
                      title: "Care Planning",
                      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
                      icon: <Target className="w-6 h-6 text-sky-600" />
                    },
                    {
                      step: 4,
                      title: "Service Delivery",
                      description: "[Description of service delivery]",
                      icon: <HandHeart className="w-6 h-6 text-sky-600" />
                    }
                  ].map((step, index) => (
                    <div key={index} className="relative">
                      <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-auto"}`}>
                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                              {step.icon}
                            </div>
                            <div>
                              <div className="text-sm text-sky-600 font-medium mb-1">Step {step.step}</div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                              <p className="text-gray-600">{step.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-sky-600 border-4 border-sky-100 hidden md:block" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-900 to-sky-800 rounded-2xl" />
              <div className="absolute inset-0 bg-[url('/cta-pattern.png')] opacity-10" /> {/* Replace with actual pattern */}
              <div className="relative p-12 md:p-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Experience Better Care?
                </h2>
                <p className="text-sky-100 mb-8 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-sky-900 px-8 py-4 rounded-full hover:bg-sky-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  >
                    Get Started Today
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link 
                    href="tel:+61756325727"
                    className="inline-flex items-center gap-2 bg-sky-800 text-white border border-sky-700 px-8 py-4 rounded-full hover:bg-sky-700 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <Phone className="w-5 h-5" />
                    Call Us Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 