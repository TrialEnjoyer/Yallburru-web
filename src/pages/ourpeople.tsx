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
  Building2,
  History,
  Flame
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const DEFAULT_BANNER = "/banner.png"; // Default banner image

export default function OurPeople() {
  const [activeTab, setActiveTab] = useState("all");

  const founders = [
    {
      name: "Aunty Patricia 'Pat' Leavy",
      indigenousName: "[MISSING]",
      role: "Inaugural Chairperson/President",
      category: "founder",
      image: undefined,
      bio: "As our Inaugural Chairperson, Aunty Pat laid the foundation for Yallburru's commitment to community service.",
      yearsOfService: "[MISSING]",
      achievements: "[MISSING]",
      expertise: "[MISSING]",
      qualifications: "[MISSING]",
      languages: "[MISSING]",
      connections: "[MISSING]",
      email: "[MISSING]",
      phone: "[MISSING]",
      linkedIn: "[MISSING]"
    },
    {
      name: "Aunty Matilda Middleton",
      indigenousName: "[MISSING]",
      role: "Founding Member",
      category: "founder",
      image: undefined,
      bio: "A key figure in our establishment, Aunty Matilda helped shape our early vision and direction.",
      yearsOfService: "[MISSING]",
      achievements: "[MISSING]",
      expertise: "[MISSING]",
      qualifications: "[MISSING]",
      languages: "[MISSING]",
      connections: "[MISSING]",
      email: "[MISSING]",
      phone: "[MISSING]",
      linkedIn: "[MISSING]"
    },
    {
      name: "Aunty Yvonne Partridge",
      indigenousName: "[MISSING]",
      role: "Founding Member",
      category: "founder",
      image: undefined,
      bio: "Contributed significantly to establishing our community connections and cultural foundations.",
      yearsOfService: "[MISSING]",
      achievements: "[MISSING]",
      expertise: "[MISSING]",
      qualifications: "[MISSING]",
      languages: "[MISSING]",
      connections: "[MISSING]",
      email: "[MISSING]",
      phone: "[MISSING]",
      linkedIn: "[MISSING]"
    },
    {
      name: "Aunty Daphne Houston",
      indigenousName: "[MISSING]",
      role: "Founding Member",
      category: "founder",
      image: undefined,
      bio: "Helped establish our core values and community-focused approach.",
      yearsOfService: "[MISSING]",
      achievements: "[MISSING]",
      expertise: "[MISSING]",
      qualifications: "[MISSING]",
      languages: "[MISSING]",
      connections: "[MISSING]",
      email: "[MISSING]",
      phone: "[MISSING]",
      linkedIn: "[MISSING]"
    }
  ];

  const historicalMembers = [
    {
      name: "Annie Woodcock",
      indigenousName: "[MISSING]",
      role: "Youth Program Leader",
      category: "historical",
      image: undefined,
      bio: "Instrumental in securing NIAA funding and served as our first permanent staff member until 2019.",
      achievements: ["Secured NIAA funding", "Led Youth Program development", "First permanent staff member"],
      yearsOfService: "Until 2019",
      expertise: "[MISSING]",
      qualifications: "[MISSING]",
      languages: "[MISSING]",
      connections: "[MISSING]",
      email: "[MISSING]",
      phone: "[MISSING]",
      linkedIn: "[MISSING]"
    },
    {
      name: "Aunty Joyce Summers",
      indigenousName: "[MISSING]",
      role: "Board Advisor",
      category: "historical",
      image: undefined,
      bio: "Served as a valued Board Advisor through 2022, providing cultural guidance and wisdom.",
      achievements: ["Cultural guidance", "Board advisory", "Community leadership"],
      yearsOfService: "Until 2022",
      expertise: "[MISSING]",
      qualifications: "[MISSING]",
      languages: "[MISSING]",
      connections: "[MISSING]",
      email: "[MISSING]",
      phone: "[MISSING]",
      linkedIn: "[MISSING]"
    }
  ];

  const currentBoard = [
    {
      name: "Aunty Maureen Newton",
      indigenousName: "[MISSING]",
      role: "Director",
      category: "board",
      image: undefined,
      bio: "A member of the Emzin family with deep connections to the Gold Coast and South East Qld area, Aunty Maureen returned to serve on the Yallburru board in 2023. Her cultural knowledge and community leadership continue to guide our organization's direction.",
      expertise: [
        "Cultural Leadership",
        "Community Relations", 
        "Traditional Knowledge",
        "Elder Guidance"
      ],
      connections: "Traditional owner family connections across South East Queensland",
      qualifications: "[MISSING]",
      yearsOfService: "2023-present",
      email: "[MISSING]",
      phone: "[MISSING]",
      linkedIn: "[MISSING]"
    },
    {
      name: "Aunty Matilda 'Tilly' Middleton",
      indigenousName: "Aunty Tilly",
      role: "Director",
      category: "board",
      image: undefined,
      bio: "Born on Thursday Island, Aunty Tilly is a proud Torres Strait Islander woman from Erub Island (Darnley Island). She returned to serve on the Yallburru board in 2018 and brings extensive experience in Indigenous media and community leadership.",
      expertise: [
        "Cultural Leadership",
        "Community Guidance",
        "Elder Wisdom",
        "Media Relations"
      ],
      achievements: [
        "Former Kalwun CEO",
        "NITV establishment",
        "Community leadership"
      ],
      yearsOfService: "2018-present",
      qualifications: "[MISSING]",
      email: "[MISSING]",
      phone: "[MISSING]",
      linkedIn: "[MISSING]"
    },
    {
      name: "Racheal Cattle",
      indigenousName: "Dyumbag Gurrugan- Balang",
      role: "Managing Director",
      category: "board",
      image: undefined,
      bio: "A proud Wiradjuri and Ngiyampaa woman with connections to Kamilaroi and Gumbaynggirr first nations, Racheal has been living and working on the lands of traditional owners of the Gold Coast and wider South East Queensland for over 25 years. Her leadership drives our strategic vision forward.",
      expertise: [
        "Strategic Leadership",
        "Community Relations",
        "Cultural Connection",
        "Organizational Development"
      ],
      qualifications: "[MISSING]",
      yearsOfService: "[MISSING]",
      email: "racheal@yallburru.org.au",
      phone: "0423 223 213",
      officePhone: "07 5667 9099",
      linkedIn: "[MISSING]",
      languages: "[MISSING]"
    }
  ];

  const keyTeamMembers = [
    {
      name: "Rebecca Scott",
      indigenousName: "[MISSING]",
      role: "Care and Support Coordination",
      category: "team",
      image: undefined,
      bio: "Leading our care coordination team to ensure high-quality support services for all clients.",
      expertise: ["Care Coordination", "Support Services", "Client Relations"],
      yearsOfService: "[MISSING]",
      achievements: "[MISSING]",
      qualifications: "[MISSING]",
      languages: "[MISSING]",
      connections: "[MISSING]",
      email: "rebecca@yallburru.org.au",
      phone: "0450 828 587",
      linkedIn: "[MISSING]"
    },
    {
      name: "Chloe Thomas",
      indigenousName: "[MISSING]",
      role: "Business Services Manager",
      category: "team",
      image: undefined,
      bio: "Managing business operations to ensure smooth delivery of services to our community.",
      expertise: ["Business Operations", "Service Delivery", "Process Management"],
      yearsOfService: "[MISSING]",
      achievements: "[MISSING]",
      qualifications: "[MISSING]",
      languages: "[MISSING]",
      connections: "[MISSING]",
      email: "chloe@yallburru.org.au",
      phone: "07 5570 7122",
      linkedIn: "[MISSING]"
    },
    {
      name: "Trisha Newton",
      indigenousName: "[MISSING]",
      role: "Cultural Advisor",
      category: "team",
      image: undefined,
      bio: "Providing strategic guidance and cultural wisdom to support our organization's growth.",
      expertise: ["Cultural Advisory", "Community Relations", "Traditional Knowledge"],
      yearsOfService: "[MISSING]",
      achievements: "[MISSING]",
      qualifications: "[MISSING]",
      languages: "[MISSING]",
      connections: "[MISSING]",
      email: "trisha@yallburru.org.au",
      phone: "[MISSING]",
      linkedIn: "[MISSING]"
    }
  ];

  return (
    <>
      <Head>
        <title>Our People - Yallburru Community Services</title>
        <meta 
          name="description" 
          content="Meet the dedicated people behind Yallburru Community Services - our founders, historical figures, and current leadership team." 
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


        {/* Current Board Section */}
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
                  <Star className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-medium text-sky-900">Board of Directors</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                >
                  Our Leadership
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-gray-600 max-w-2xl mx-auto"
                >
                  Meet our esteemed board of directors who guide Yallburru Community Services with wisdom, experience, and deep cultural knowledge.
                </motion.p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {currentBoard.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`relative h-72 overflow-hidden ${member.image ? '' : 'bg-gray-900'}`}>
                      <Image
                        src={member.image ?? DEFAULT_BANNER}
                        alt={member.name}
                        fill
                        className={`${member.image ? 'object-cover group-hover:scale-110' : 'object-contain opacity-40'} transition-transform duration-500`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                        {member.indigenousName && member.indigenousName !== "[MISSING]" && (
                          <p className="text-sky-200 text-sm mb-2">{member.indigenousName}</p>
                        )}
                        <p className="text-sky-100 font-medium">{member.role}</p>
                        {member.yearsOfService && member.yearsOfService !== "[MISSING]" && (
                          <p className="text-sky-200/80 text-sm mt-1">Serving since {member.yearsOfService}</p>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                        <div className="space-y-3">
                          {member.expertise && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">Areas of Expertise</h4>
                              <div className="flex flex-wrap gap-2">
                                {member.expertise.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-medium"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {member.achievements && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements</h4>
                              <div className="flex flex-wrap gap-2">
                                {member.achievements.map((achievement, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium"
                                  >
                                    {achievement}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100 space-y-2">
                        {member.email && member.email !== "[MISSING]" && (
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors text-sm"
                          >
                            <Mail className="w-4 h-4" />
                            {member.email}
                          </a>
                        )}
                        {member.phone && member.phone !== "[MISSING]" && (
                          <a
                            href={`tel:${member.phone}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors text-sm"
                          >
                            <Phone className="w-4 h-4" />
                            {member.phone}
                          </a>
                        )}
                        {member.linkedIn && member.linkedIn !== "[MISSING]" && (
                          <a
                            href={member.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors text-sm"
                          >
                            <Linkedin className="w-4 h-4" />
                            LinkedIn Profile
                          </a>
                        )}
                      </div>
                      
                      {/* Missing Information Indicators */}
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex flex-wrap gap-2">
                          {member.qualifications === "[MISSING]" && (
                            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Qualifications Pending</span>
                          )}
                          {member.languages === "[MISSING]" && (
                            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Languages Pending</span>
                          )}
                          {member.indigenousName === "[MISSING]" && (
                            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Traditional Name Pending</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

      <main className="bg-white">
        {/* Founders Section */}
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
                  <Flame className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-medium text-sky-900">Our Founders</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                >
                  Our Foundation
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-gray-600 max-w-2xl mx-auto"
                >
                  Honoring the visionary leaders who established Yallburru Community Services and laid the foundation for our mission of culturally sensitive care.
                </motion.p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {founders.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`relative h-48 overflow-hidden ${member.image ? '' : 'bg-gray-900'}`}>
                      <Image
                        src={member.image ?? DEFAULT_BANNER}
                        alt={member.name}
                        fill
                        className={`${member.image ? 'object-cover' : 'object-contain opacity-40'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                        {member.indigenousName && member.indigenousName !== "[MISSING]" && (
                          <p className="text-sky-200 text-sm mb-1">{member.indigenousName}</p>
                        )}
                        <p className="text-sky-100 text-sm">{member.role}</p>
                        {member.yearsOfService && member.yearsOfService !== "[MISSING]" && (
                          <p className="text-sky-200/80 text-xs mt-1">{member.yearsOfService}</p>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-3">{member.bio}</p>
                      
                      {/* Missing Information Indicators */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {member.indigenousName === "[MISSING]" && (
                          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Traditional Name Pending</span>
                        )}
                        {member.yearsOfService === "[MISSING]" && (
                          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Service Period Pending</span>
                        )}
                        {member.achievements === "[MISSING]" && (
                          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Achievements Pending</span>
                        )}
                        {member.languages === "[MISSING]" && (
                          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Languages Pending</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 mb-4"
                >
                  <History className="w-3.5 h-3.5 text-gray-600" />
                  <span className="text-xs font-medium text-gray-700">Core Team</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                >
                  Supporting Staff
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-gray-600 max-w-2xl mx-auto text-sm"
                >
                  Meet our dedicated team members who work tirelessly to support our mission.
                </motion.p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {keyTeamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    <div className={`relative h-48 overflow-hidden ${member.image ? '' : 'bg-gray-900'}`}>
                      <Image
                        src={member.image ?? DEFAULT_BANNER}
                        alt={member.name}
                        fill
                        className={`${member.image ? 'object-cover' : 'object-contain opacity-40'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-base font-semibold text-white mb-0.5">{member.name}</h3>
                        {member.indigenousName && member.indigenousName !== "[MISSING]" && (
                          <p className="text-sky-200 text-xs mb-1">{member.indigenousName}</p>
                        )}
                        <p className="text-sky-100 text-sm">{member.role}</p>
                        {member.yearsOfService && member.yearsOfService !== "[MISSING]" && (
                          <p className="text-sky-200/80 text-xs mt-0.5">{member.yearsOfService}</p>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{member.bio}</p>
                      
                      {member.expertise && Array.isArray(member.expertise) && (
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1.5">
                            {member.expertise.map((skill, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Contact Information */}
                      {(member.email !== "[MISSING]" || member.phone !== "[MISSING]") && (
                        <div className="mt-3 pt-3 border-t border-gray-200 space-y-1.5">
                          {member.email !== "[MISSING]" && (
                            <a
                              href={`mailto:${member.email}`}
                              className="flex items-center gap-1.5 text-gray-600 hover:text-sky-600 transition-colors text-sm"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              {member.email}
                            </a>
                          )}
                          {member.phone !== "[MISSING]" && (
                            <a
                              href={`tel:${member.phone}`}
                              className="flex items-center gap-1.5 text-gray-600 hover:text-sky-600 transition-colors text-sm"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              {member.phone}
                            </a>
                          )}
                        </div>
                      )}
                      
                      {/* Missing Information Indicators */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex flex-wrap gap-1.5">
                          {member.indigenousName === "[MISSING]" && (
                            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Traditional Name Pending</span>
                          )}
                          {member.yearsOfService === "[MISSING]" && (
                            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Service Period Pending</span>
                          )}
                          {member.achievements === "[MISSING]" && (
                            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Achievements Pending</span>
                          )}
                          {member.qualifications === "[MISSING]" && (
                            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Qualifications Pending</span>
                          )}
                          {member.languages === "[MISSING]" && (
                            <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Languages Pending</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Historical Figures Section */}
        <section className="py-20 bg-white">
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
                  <History className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-medium text-sky-900">Historical Figures</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                >
                  Our Legacy
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-gray-600 max-w-2xl mx-auto"
                >
                  Celebrating the individuals who have made significant contributions to our growth and development over the years.
                </motion.p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {historicalMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className={`relative h-56 overflow-hidden ${member.image ? '' : 'bg-gray-900'}`}>
                      <Image
                        src={member.image ?? DEFAULT_BANNER}
                        alt={member.name}
                        fill
                        className={`${member.image ? 'object-cover' : 'object-contain opacity-40'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                        {member.indigenousName && member.indigenousName !== "[MISSING]" && (
                          <p className="text-sky-200 text-sm mb-1">{member.indigenousName}</p>
                        )}
                        <p className="text-sky-100 text-sm">{member.role}</p>
                        {member.yearsOfService && member.yearsOfService !== "[MISSING]" && (
                          <p className="text-sky-200/80 text-xs mt-1">{member.yearsOfService}</p>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                      
                      {member.achievements && Array.isArray(member.achievements) && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Achievements</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {member.achievements.map((achievement, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-medium"
                              >
                                {achievement}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Missing Information Indicators */}
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
                        {member.indigenousName === "[MISSING]" && (
                          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Traditional Name Pending</span>
                        )}
                        {member.expertise === "[MISSING]" && (
                          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Expertise Areas Pending</span>
                        )}
                        {member.qualifications === "[MISSING]" && (
                          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Qualifications Pending</span>
                        )}
                        {member.languages === "[MISSING]" && (
                          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Languages Pending</span>
                        )}
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