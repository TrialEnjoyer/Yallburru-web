import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
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
      description: "Yallburru Community Services was established with a vision to provide culturally sensitive care and support services to our community."
    },
    {
      year: "2012",
      title: "Service Expansion",
      description: "Expanded our services to include comprehensive disability support and elder care programs."
    },
    {
      year: "2015",
      title: "Community Growth",
      description: "Strengthened our community connections and expanded our cultural programs and services."
    },
    {
      year: "2020",
      title: "New Headquarters",
      description: "Established our new headquarters in Upper Coomera to better serve our growing community."
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
              <Building2 className="w-4 h-4 text-sky-300" />
              <span className="text-sm font-medium text-sky-100">Our Story</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Empowering Communities
              <span className="block mt-2 bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
                Since 2009
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-sky-100/90 mb-12"
            >
              Yallburru Community Services is a leading Indigenous-owned organization providing culturally sensitive care and support services from our base in Gold Coast, Queensland.
            </motion.p>
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
              { number: "15+", label: "Years of Service", icon: <Calendar className="w-6 h-6 text-sky-600" /> },
              { number: "1000+", label: "Lives Touched", icon: <Heart className="w-6 h-6 text-sky-600" /> },
              { number: "100%", label: "Indigenous Owned", icon: <Star className="w-6 h-6 text-sky-600" /> },
              { number: "6", label: "Core Services", icon: <Users className="w-6 h-6 text-sky-600" /> }
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

      {/* Mission and Vision Section */}
      <section className="relative py-20 bg-white">
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
                <Target className="w-4 h-4 text-sky-600" />
                <span className="text-sm font-medium text-sky-900">Our Purpose</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              >
                Strength Through Connections
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                {`strengthening our community through culturally sensitive care and support services`}
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group bg-white rounded-2xl shadow-sm p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide culturally sensitive care and support services that empower our community. We are committed to maintaining strong cultural connections while delivering professional, high-quality care that respects and honors our traditions.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    "Delivering culturally appropriate care",
                    "Supporting community independence",
                    "Preserving cultural connections"
                  ].map((goal, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-sky-600 flex-shrink-0" />
                      <span className="text-gray-600">{goal}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="group bg-white rounded-2xl shadow-sm p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To be a leading provider of culturally sensitive community services, where every individual is supported to thrive while maintaining strong connections to culture and community.
                </p>
                <div className="mt-6 space-y-3">
                  {[
                    "Building stronger communities",
                    "Empowering cultural identity",
                    "Creating lasting positive impact"
                  ].map((vision, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-sky-600 flex-shrink-0" />
                      <span className="text-gray-600">{vision}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-20 bg-gray-50">
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
                <Clock className="w-4 h-4 text-sky-600" />
                <span className="text-sm font-medium text-sky-900">Our Journey</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              >
                The Yallburru Story
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Since 2009, Yallburru Community Services has grown from a vision of culturally sensitive care to become a leading provider of community services in the Gold Coast and surrounding regions.
              </motion.p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-sky-100 hidden md:block" />
              <div className="space-y-12 relative">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="relative"
                  >
                    <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-auto"}`}>
                      <div className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="relative py-20 bg-white">
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
                <Heart className="w-4 h-4 text-sky-600" />
                <span className="text-sm font-medium text-sky-900">Our Values</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              >
                What We Stand For
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Our values are deeply rooted in Aboriginal & Torres Strait Islander culture, guiding every aspect of our service delivery and community engagement.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <HandHeart className="w-6 h-6 text-sky-600" />,
                  title: "Community First",
                  description: "We prioritize the needs of our community, providing culturally sensitive services that respect and honor our traditions."
                },
                {
                  icon: <Users className="w-6 h-6 text-sky-600" />,
                  title: "Cultural Connection",
                  description: "Our services are grounded in Aboriginal & Torres Strait Islander values, maintaining strong cultural connections."
                },
                {
                  icon: <Award className="w-6 h-6 text-sky-600" />,
                  title: "Excellence in Care",
                  description: "As a registered service provider, we maintain the highest standards in care and support services."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
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
              <span className="text-sm font-medium text-sky-100">Ready to Make a Difference?</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Join Us in Our Mission
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-sky-100/90 mb-12"
            >
              Contact us at our Upper Coomera office to learn more about how we can support you and your family.
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
                Visit Us
                <span className="text-sm">Suite 4.3 - 58 Highland Way, Upper Coomera QLD 4210</span>
                <MapPin className="w-5 h-5" />
              </Link>
              <Link 
                href="tel:0756679099"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-sky-800/50 text-white border border-sky-400/30 
                         rounded-full hover:bg-sky-700/50 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
              >
                Call Us
                <span className="text-sm">07 5667 9099</span>
                <Phone className="w-5 h-5" />
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