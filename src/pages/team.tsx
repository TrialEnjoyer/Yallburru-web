import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Mail, 
  Phone, 
  Linkedin,
  Users,
  Sparkles,
  Heart,
  Star,
  HandHeart,
  GraduationCap,
  Award,
  Clock,
  Target,
  MessageCircle,
  MapPin,
  Globe,
  Briefcase,
  Building2
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Team() {
  const [activeTab, setActiveTab] = useState("all");

  const teamMembers = [
    {
      name: "Racheal Cattle",
      indigenousName: "Dyumbag Gurrugan- Balang",
      role: "Managing Director",
      category: "leadership",
      image: "/team/leader1.jpg", // Replace with actual image
      bio: "As Managing Director, Racheal leads Yallburru Community Services with a vision for empowering communities through culturally sensitive care and support.",
      email: "racheal@yallburru.org.au",
      phone: "0423 223 213",
      officePhone: "07 5667 9099",
      expertise: ["Strategic Leadership", "Community Relations", "Cultural Connection"],
      quote: "Strength through connections"
    },
    {
      name: "Matilda Middleton",
      indigenousName: "Aunty Tilly",
      role: "Chairperson",
      category: "leadership",
      image: "/team/leader2.jpg", // Replace with actual image
      bio: "Known affectionately as Aunty Tilly, Matilda brings wisdom and cultural guidance to her role as Chairperson.",
      email: "tilly@yallburru.org.au",
      phone: "07 5570 7122",
      officePhone: "07 5667 9099",
      expertise: ["Cultural Leadership", "Community Guidance", "Elder Wisdom"],
      quote: "Preserving our culture, building our future"
    },
    {
      name: "Rebecca Scott",
      role: "Care and Support Coordination",
      category: "leadership",
      image: "/team/leader3.jpg", // Replace with actual image
      bio: "Rebecca leads our care coordination team, ensuring high-quality support services for all our clients.",
      email: "rebecca@yallburru.org.au",
      phone: "0450 828 587",
      officePhone: "07 5667 9099",
      expertise: ["Care Coordination", "Support Services", "Client Relations"],
      quote: "Quality care through understanding"
    },
    {
      name: "Chloe Thomas",
      role: "Business Services",
      category: "leadership",
      image: "/team/leader4.jpg", // Replace with actual image
      bio: "Chloe manages our business operations, ensuring smooth delivery of services to our community.",
      email: "chloe@yallburru.org.au",
      phone: "07 5570 7122",
      officePhone: "07 5667 9099",
      expertise: ["Business Operations", "Service Delivery", "Organizational Management"],
      quote: "Efficient systems for better care"
    }
  ];

  const careTeam = [
    {
      name: "Care Coordinator",
      role: "Support Services",
      category: "care",
      image: "/team/care1.jpg", // Replace with actual image
      bio: "Our care coordinators work closely with clients and families to develop personalized support plans that respect cultural values and individual needs.",
      specialties: ["Care Planning", "Cultural Support", "Family Engagement"]
    },
    {
      name: "Elder Care Specialist",
      role: "Elder Services",
      category: "care",
      image: "/team/care2.jpg", // Replace with actual image
      bio: "Dedicated to providing respectful and culturally appropriate care for our Elders, ensuring their wisdom and traditions are honored.",
      specialties: ["Elder Care", "Cultural Activities", "Health Support"]
    },
    {
      name: "Disability Support Worker",
      role: "Disability Services",
      category: "care",
      image: "/team/care3.jpg", // Replace with actual image
      bio: "Our NDIS-registered support workers are trained to provide empowering and culturally sensitive disability support services.",
      specialties: ["NDIS Support", "Community Access", "Life Skills"]
    },
    {
      name: "Youth Support Worker",
      role: "Youth Services",
      category: "care",
      image: "/team/care4.jpg", // Replace with actual image
      bio: "Supporting young people in our community through cultural connection, education, and personal development programs.",
      specialties: ["Youth Programs", "Cultural Education", "Community Engagement"]
    }
  ];

  return (
    <>
      <Head>
        <title>Our Team - Yallburru Community Services</title>
        <meta 
          name="description" 
          content="Meet the dedicated team behind Yallburru Community Services - committed to providing exceptional care and support." 
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
              <Users className="w-4 h-4 text-sky-300" />
              <span className="text-sm font-medium text-sky-100">Our Amazing Team</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Meet the People Behind
              <span className="block mt-2 bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
                Yallburru Community Services
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-sky-100/90 mb-12"
            >
              Our dedicated team of professionals brings together cultural knowledge, expertise, and a shared commitment to strengthening our community through culturally sensitive care.
            </motion.p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      </section>

      {/* Team Stats Section */}
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
              { number: "20+", label: "Team Members", icon: <Users className="w-6 h-6 text-sky-600" /> },
              { number: "50+", label: "Years Combined Experience", icon: <Clock className="w-6 h-6 text-sky-600" /> },
              { number: "100%", label: "Certified Professionals", icon: <GraduationCap className="w-6 h-6 text-sky-600" /> },
              { number: "24/7", label: "Dedicated Support", icon: <Heart className="w-6 h-6 text-sky-600" /> }
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

      <main className="bg-white">
        {/* Leadership Team Section */}
        <section className="py-20">
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
                  <span className="text-sm font-medium text-sky-900">Leadership Team</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                >
                  Guided by Experience
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-gray-600 max-w-2xl mx-auto"
                >
                  Our leadership team brings together decades of experience in community services, cultural knowledge, and professional expertise to guide Yallburru&apos;s mission of strengthening communities through culturally sensitive care.
                </motion.p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={/*member.image ??*/ "logo.svg"}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                        <p className="text-sky-100 font-medium">{member.role}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <p className="text-gray-600 mb-4">{member.bio}</p>
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.map((skill, idx) => (
                            <span 
                              key={idx}
                              className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/*<blockquote className="italic text-gray-600 border-l-4 border-sky-200 pl-4 mb-6">
                        {member.quote}
                      </blockquote>*/}
                      <div className="space-y-2 pt-4 border-t border-gray-100">
                        <a 
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          {member.email}
                        </a>{/*
                        <a 
                          href={`tel:${member.phone}`}
                          className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          {member.phone}
                        </a>
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          LinkedIn Profile
                        </a>
                        */}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Care Team Section }
        <section className="py-20 bg-gray-50">
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
                  <HandHeart className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-medium text-sky-900">Care Team</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                >
                  Dedicated to Your Care
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-gray-600 max-w-2xl mx-auto"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </motion.p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                {careTeam.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-sky-600 font-medium mb-3">{member.role}</p>
                      <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {member.specialties.map((specialty, idx) => (
                          <span 
                            key={idx}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-600 text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
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
                <span className="text-sm font-medium text-sky-100">Join Our Team</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-white mb-6"
              >
                Be Part of Our Story
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-sky-100/90 mb-12"
              >
                Join our team of dedicated professionals and help us make a difference in our community. We&apos;re always looking for passionate individuals who share our values and commitment to culturally sensitive care.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link 
                  href="/careers"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-900 rounded-full
                           hover:bg-sky-50 transition-all duration-300 transform hover:-translate-y-1"
                >
                  View Career Opportunities
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-sky-800/50 text-white border border-sky-400/30 
                           rounded-full hover:bg-sky-700/50 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
                >
Get in touch
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        </section>
      </main>
    </>
  );
} 