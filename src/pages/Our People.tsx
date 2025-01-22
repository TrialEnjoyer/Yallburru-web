import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Users, Mail, History, Flame, Heart, Phone } from 'lucide-react';
import Head from 'next/head';

export default function OurPeople() {
  const [activeTab, setActiveTab] = useState("all");

  const currentBoard = [
    {
      name: "Aunty Maureen Newton",
      role: "Director",
      category: "board",
      image: "/team/board1.jpg",
      bio: "A member of the Emzin family with deep connections to the Gold Coast and South East Qld area, Aunty Maureen returned to serve on the Yallburru board in 2023.",
      expertise: ["Cultural Leadership", "Community Relations", "Traditional Knowledge"],
      connections: "Traditional owner family connections across South East Queensland"
    },
    {
      name: "Aunty Matilda 'Tilly' Middleton",
      indigenousName: "Aunty Tilly",
      role: "Director",
      category: "board",
      image: "/team/board2.jpg",
      bio: "Born on Thursday Island, Aunty Tilly is a proud Torres Strait Islander woman from Erub Island (Darnley Island). She returned to serve on the Yallburru board in 2018 and played a key role in establishing NITV.",
      expertise: ["Cultural Leadership", "Community Guidance", "Elder Wisdom"],
      achievements: ["Former Kalwun CEO", "NITV establishment", "Community leadership"]
    },
    {
      name: "Racheal Cattle",
      indigenousName: "Dyumbag Gurrugan- Balang",
      role: "Managing Director",
      category: "board",
      image: "/team/board3.jpg",
      bio: "A proud Wiradjuri and Ngiyampaa woman with connections to Kamilaroi and Gumbaynggirr first nations, Racheal has been living and working on the lands of traditional owners of the Gold Coast and wider South East Queensland for over 25 years.",
      expertise: ["Strategic Leadership", "Community Relations", "Cultural Connection"],
      email: "racheal@yallburru.org.au",
      phone: "0423 223 213",
      officePhone: "07 5667 9099"
    }
  ];

  const coreTeam = [
    {
      name: "Rebecca Scott",
      role: "Care and Support Coordination",
      category: "core",
      image: "/team/core1.jpg",
      bio: "Leading our care coordination team to ensure high-quality support services for all clients.",
      expertise: ["Care Coordination", "Support Services", "Client Relations"],
      email: "rebecca@yallburru.org.au"
    },
    {
      name: "Chloe Thomas",
      role: "Business Services",
      category: "core",
      image: "/team/core2.jpg",
      bio: "Managing business operations to ensure smooth delivery of services to our community.",
      expertise: ["Business Operations", "Service Delivery", "Process Management"],
      email: "chloe@yallburru.org.au"
    },
    {
      name: "Trisha Newton",
      role: "Board Advisor",
      category: "core",
      image: "/team/core3.jpg",
      bio: "Providing strategic guidance and cultural wisdom to support our organization's growth.",
      expertise: ["Strategic Advisory", "Cultural Guidance", "Community Relations"],
      email: "trisha@yallburru.org.au"
    }
  ];

  const founders = [
    {
      name: "Aunty Patricia 'Pat' Leavy",
      role: "Inaugural Chairperson/President",
      category: "founder",
      image: "/team/founder1.jpg",
      bio: "As our Inaugural Chairperson, Aunty Pat laid the foundation for Yallburru's commitment to community service.",
    },
    {
      name: "Aunty Matilda Middleton",
      role: "Founding Member",
      category: "founder",
      image: "/team/founder2.jpg",
      bio: "A key figure in our establishment, Aunty Matilda helped shape our early vision and direction.",
    },
    {
      name: "Aunty Yvonne Partridge",
      role: "Founding Member",
      category: "founder",
      image: "/team/founder3.jpg",
      bio: "Contributed significantly to establishing our community connections and cultural foundations.",
    },
    {
      name: "Aunty Daphne Houston",
      role: "Founding Member",
      category: "founder",
      image: "/team/founder4.jpg",
      bio: "Helped establish our core values and community-focused approach.",
    }
  ];

  const historicalMembers = [
    {
      name: "Annie Woodcock",
      role: "Youth Program Leader",
      category: "historical",
      image: "/team/historical1.jpg",
      bio: "Instrumental in securing NIAA funding and served as our first permanent staff member until 2019.",
      achievements: ["Secured NIAA funding", "Led Youth Program development", "First permanent staff member"]
    },
    {
      name: "Aunty Joyce Summers",
      role: "Board Advisor",
      category: "historical",
      image: "/team/historical2.jpg",
      bio: "Served as a valued Board Advisor through 2022, providing cultural guidance and wisdom.",
      achievements: ["Cultural guidance", "Board advisory", "Community leadership"]
    }
  ];

  const keyTeamMembers = [
    {
      name: "Rebecca Scott",
      role: "Care and Support Coordination",
      category: "team",
      image: "/team/team1.jpg",
      bio: "Leading our care coordination team to ensure high-quality support services for all clients.",
      expertise: ["Care Coordination", "Support Services", "Client Relations"],
      email: "rebecca@yallburru.org.au",
      phone: "0450 828 587"
    },
    {
      name: "Chloe Thomas",
      role: "Business Services Manager",
      category: "team",
      image: "/team/team2.jpg",
      bio: "Managing business operations to ensure smooth delivery of services to our community.",
      expertise: ["Business Operations", "Service Delivery", "Process Management"],
      email: "chloe@yallburru.org.au",
      phone: "07 5570 7122"
    },
    {
      name: "Trisha Newton",
      role: "Cultural Advisor",
      category: "team",
      image: "/team/team3.jpg",
      bio: "Providing strategic guidance and cultural wisdom to support our organization's growth.",
      expertise: ["Cultural Advisory", "Community Relations", "Traditional Knowledge"],
      email: "trisha@yallburru.org.au"
    }
  ];

  return (
    <>
      <Head>
        <title>Our People - Yallburru Community Services</title>
        <meta 
          name="description" 
          content="Meet the dedicated people behind Yallburru Community Services - our leadership, founders, and team members." 
        />
      </Head>

      <main className="bg-white">
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
                  <span className="text-sm font-medium text-sky-900">Current Board</span>
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
                  Meet our current board of directors who guide Yallburru Community Services with wisdom, experience, and cultural knowledge.
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
                    className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={member.image}
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
                      {member.email && (
                        <div className="space-y-2 pt-4 border-t border-gray-100">
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            {member.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

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
                  <Users className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-medium text-sky-900">Core Team</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                >
                  Our Core Team
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-gray-600 max-w-2xl mx-auto"
                >
                  Meet the dedicated professionals who work tirelessly to deliver our services and support our community.
                </motion.p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {coreTeam.map((member, index) => (
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
                        src={member.image}
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
                      {member.email && (
                        <div className="space-y-2 pt-4 border-t border-gray-100">
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            {member.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

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
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                        <p className="text-sky-100 text-sm">{member.role}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

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
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                        <p className="text-sky-100">{member.role}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{member.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {member.achievements.map((achievement, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-sm"
                          >
                            {achievement}
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
                  <Heart className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-medium text-sky-900">Our Team</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                >
                  Key Team Members
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-gray-600 max-w-2xl mx-auto"
                >
                  Meet our dedicated team members who play integral roles in delivering our services and supporting our community.
                </motion.p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {keyTeamMembers.map((member, index) => (
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
                        src={member.image}
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
                      {member.email && (
                        <div className="space-y-2 pt-4 border-t border-gray-100">
                          <a
                            href={`mailto:${member.email}`}
                            className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors"
                          >
                            <Mail className="w-4 h-4" />
                            {member.email}
                          </a>
                          {member.phone && (
                            <a
                              href={`tel:${member.phone}`}
                              className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors"
                            >
                              <Phone className="w-4 h-4" />
                              {member.phone}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 