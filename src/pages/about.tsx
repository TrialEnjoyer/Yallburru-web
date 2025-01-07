import Head from "next/head";
import Image from "next/image";
import { 
  ArrowRight, 
  Heart, 
  Globe, 
  Calendar, 
  CheckCircle,
  Users,
  Sparkles,
  Target,
  HandHeart,
  Award,
  Star,
  Clock,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Building2
} from "lucide-react";
import Link from "next/link";

export default function About() {
  const milestones = [
    {
      year: "2009",
      title: "Our Beginning",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      year: "2012",
      title: "NDIS Registration",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      year: "2015",
      title: "Expanding Services",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      year: "2020",
      title: "Community Growth",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  ];

  return (
    <>
      <Head>
        <title>About Us - Yallburru Community Services</title>
        <meta 
          name="description" 
          content="Learn about Yallburru Community Services - Our mission, values, and commitment to providing Elder Care & Disability Support services." 
        />
      </Head>

      {/* Hero Section with Parallax Effect */}
      <div className="relative pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900 to-sky-800 opacity-90" />
          <div className="absolute inset-0 bg-[url('/about-hero.jpg')] bg-cover bg-center" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm font-medium">
                <Building2 className="w-4 h-4" />
                Our Story
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Empowering Communities
              <span className="block mt-2 bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
                Since 2009
              </span>
            </h1>
            <p className="text-xl text-sky-100 mb-12 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
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

      {/* Quick Stats Section */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "15+", label: "Years of Service", icon: <Calendar className="w-6 h-6 text-sky-600" /> },
              { number: "1000+", label: "Lives Touched", icon: <Heart className="w-6 h-6 text-sky-600" /> },
              { number: "100%", label: "Indigenous Owned", icon: <Star className="w-6 h-6 text-sky-600" /> },
              { number: "24/7", label: "Community Support", icon: <Users className="w-6 h-6 text-sky-600" /> }
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
            {/* Mission and Vision Section */}
            <div className="pt-16">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm font-medium mb-4">
                  <Target className="w-4 h-4" />
                  Our Purpose
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Mission & Vision
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Mission Card */}
                <div className="group bg-white rounded-2xl shadow-sm p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-sky-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      "Duis aute irure dolor in reprehenderit",
                      "Excepteur sint occaecat cupidatat",
                      "Sunt in culpa qui officia deserunt"
                    ].map((goal, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0" />
                        <span className="text-gray-600">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vision Card */}
                <div className="group bg-white rounded-2xl shadow-sm p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6 text-sky-600" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      "Lorem ipsum dolor sit amet",
                      "Consectetur adipiscing elit",
                      "Sed do eiusmod tempor incididunt"
                    ].map((vision, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-sky-600 flex-shrink-0" />
                        <span className="text-gray-600">{vision}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Our Story Section */}
            <div className="mt-24">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm font-medium mb-4">
                  <Clock className="w-4 h-4" />
                  Our Journey
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  The Yallburru Story
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>

              <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-sky-100 hidden md:block" />
                <div className="space-y-12 relative">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative">
                      <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-auto"}`}>
                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Calendar className="w-6 h-6 text-sky-600" />
                            </div>
                            <div>
                              <div className="text-sm text-sky-600 font-medium mb-1">{milestone.year}</div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                              <p className="text-gray-600">{milestone.description}</p>
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

            {/* Core Values Section */}
            <div className="mt-24">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm font-medium mb-4">
                  <Heart className="w-4 h-4" />
                  Our Values
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  What We Stand For
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <HandHeart className="w-6 h-6 text-sky-600" />,
                    title: "Community First",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  },
                  {
                    icon: <Users className="w-6 h-6 text-sky-600" />,
                    title: "Cultural Connection",
                    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                  },
                  {
                    icon: <Award className="w-6 h-6 text-sky-600" />,
                    title: "Excellence in Care",
                    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                  }
                ].map((value, index) => (
                  <div 
                    key={index}
                    className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Section */}
            <div className="mt-24">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm font-medium mb-4">
                  <MapPin className="w-4 h-4" />
                  Our Location
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Visit Us
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-sky-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600">The Well, 58 Highland Way, Upper Coomera, QLD, 4209</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-sky-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <a href="tel:+61756325727" className="text-sky-600 hover:text-sky-700">(07) 5632 5727</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-sky-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <a href="mailto:contact@yallburru.org.au" className="text-sky-600 hover:text-sky-700">contact@yallburru.org.au</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 text-sky-600 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Hours</p>
                        <p className="text-gray-600">Monday - Friday: 8:30 AM - 4:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?q=Yallburru%20Community%20Services%2C%20The%20Well%2C%2058%20Highland%20Way%2C%20Upper%20Coomera%20QLD%204209&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                  ></iframe>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-900 to-sky-800 rounded-2xl" />
              <div className="absolute inset-0 bg-[url('/about-pattern.png')] opacity-10" />
              <div className="relative p-12 md:p-16 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Make a Difference?
                </h2>
                <p className="text-sky-100 mb-8 max-w-2xl mx-auto">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-sky-900 px-8 py-4 rounded-full hover:bg-sky-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  >
                    Get in Touch
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link 
                    href="/services"
                    className="inline-flex items-center gap-2 bg-sky-800 text-white border border-sky-700 px-8 py-4 rounded-full hover:bg-sky-700 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Our Services
                    <MessageCircle className="w-5 h-5" />
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