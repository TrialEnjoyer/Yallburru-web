import Head from "next/head";
import Image from "next/image";
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
  Briefcase
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Team() {
  const [activeTab, setActiveTab] = useState("all");

  const teamMembers = [
    {
      name: "[Leader Name 1]",
      role: "CEO",
      category: "leadership",
      image: "/team/leader1.jpg", // Replace with actual image
      bio: "[Brief biography highlighting experience and vision]",
      email: "email@example.com",
      phone: "+61 XXX XXX XXX",
      linkedin: "https://linkedin.com/in/username",
      expertise: ["Strategic Planning", "Community Relations", "Elder Care"],
      quote: "[A personal quote about their vision for care]"
    },
    {
      name: "[Leader Name 2]",
      role: "Operations Director",
      category: "leadership",
      image: "/team/leader2.jpg", // Replace with actual image
      bio: "[Brief biography highlighting operational expertise]",
      email: "email@example.com",
      phone: "+61 XXX XXX XXX",
      linkedin: "https://linkedin.com/in/username",
      expertise: ["Operations Management", "Quality Assurance", "Team Leadership"],
      quote: "[A personal quote about operational excellence]"
    },
    {
      name: "[Leader Name 3]",
      role: "Care Services Manager",
      category: "leadership",
      image: "/team/leader3.jpg", // Replace with actual image
      bio: "[Brief biography highlighting care expertise]",
      email: "email@example.com",
      phone: "+61 XXX XXX XXX",
      linkedin: "https://linkedin.com/in/username",
      expertise: ["Care Management", "Staff Development", "Client Relations"],
      quote: "[A personal quote about quality care]"
    }
  ];

  const careTeam = [
    {
      name: "[Team Member 1]",
      role: "Care Coordinator",
      category: "care",
      image: "/team/care1.jpg", // Replace with actual image
      bio: "[Brief description of role and experience]",
      specialties: ["Elder Care", "Care Planning", "Family Support"]
    },
    {
      name: "[Team Member 2]",
      role: "Support Worker",
      category: "care",
      image: "/team/care2.jpg", // Replace with actual image
      bio: "[Brief description of role and experience]",
      specialties: ["Disability Support", "Personal Care", "Community Access"]
    },
    {
      name: "[Team Member 3]",
      role: "Support Worker",
      category: "care",
      image: "/team/care3.jpg", // Replace with actual image
      bio: "[Brief description of role and experience]",
      specialties: ["Home Care", "Medication Management", "Social Support"]
    },
    {
      name: "[Team Member 4]",
      role: "Support Worker",
      category: "care",
      image: "/team/care4.jpg", // Replace with actual image
      bio: "[Brief description of role and experience]",
      specialties: ["Disability Support", "Life Skills", "Community Engagement"]
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

      {/* Hero Section with Parallax Effect */}
      <div className="relative pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900 to-sky-800 opacity-90" />
          <div className="absolute inset-0 bg-[url('/team-hero.jpg')] bg-cover bg-center" /> {/* Replace with actual image */}
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm font-medium">
                <Users className="w-4 h-4" />
                Our Amazing Team
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Meet the People Who
              <span className="block mt-2 bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
                Make a Difference
              </span>
            </h1>
            <p className="text-xl text-sky-100 mb-12 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
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

      {/* Team Stats Section */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "20+", label: "Team Members", icon: <Users className="w-6 h-6 text-sky-600" /> },
              { number: "50+", label: "Years Combined Experience", icon: <Clock className="w-6 h-6 text-sky-600" /> },
              { number: "100%", label: "Certified Professionals", icon: <GraduationCap className="w-6 h-6 text-sky-600" /> },
              { number: "24/7", label: "Dedicated Support", icon: <Heart className="w-6 h-6 text-sky-600" /> }
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
            {/* Leadership Team Section */}
            <div className="pt-16">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm font-medium mb-4">
                  <Star className="w-4 h-4" />
                  Leadership Team
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Guided by Experience
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index}
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
                      <blockquote className="italic text-gray-600 border-l-4 border-sky-200 pl-4 mb-6">
                        {member.quote}
                      </blockquote>
                      <div className="space-y-2 pt-4 border-t border-gray-100">
                        <a 
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 text-gray-600 hover:text-sky-600 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          {member.email}
                        </a>
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Care Team Section */}
            <div className="mt-24">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm font-medium mb-4">
                  <HandHeart className="w-4 h-4" />
                  Care Team
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Our Dedicated Professionals
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                {careTeam.map((member, index) => (
                  <div 
                    key={index}
                    className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="text-center p-4">
                          <p className="text-white text-sm">{member.bio}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-sky-600 font-medium mb-3">{member.role}</p>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty, idx) => (
                          <span 
                            key={idx}
                            className="inline-block px-2 py-1 bg-sky-50 text-sky-600 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Values Section */}
            <div className="mt-24">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm font-medium mb-4">
                  <Heart className="w-4 h-4" />
                  Our Values
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  What Drives Us
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Heart className="w-6 h-6 text-sky-600" />,
                    title: "Compassionate Care",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                  },
                  {
                    icon: <Target className="w-6 h-6 text-sky-600" />,
                    title: "Excellence",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                  },
                  {
                    icon: <HandHeart className="w-6 h-6 text-sky-600" />,
                    title: "Cultural Sensitivity",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
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

            {/* Join Our Team Section */}
            <div className="mt-24 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-900 to-sky-800 rounded-2xl" />
              <div className="absolute inset-0 bg-[url('/team-pattern.png')] opacity-10" /> {/* Replace with actual pattern */}
              <div className="relative p-12 md:p-16 text-center">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 text-sm font-medium mb-6">
                  <Briefcase className="w-4 h-4" />
                  Career Opportunities
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Join Our Growing Team
                </h2>
                <p className="text-sky-100 mb-8 max-w-2xl mx-auto">
                  (Not sure if we need this kind of thing, can be removed later - just a guideline.)
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link 
                    href="/careers"
                    className="inline-flex items-center gap-2 bg-white text-sky-900 px-8 py-4 rounded-full hover:bg-sky-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  >
                    View Opportunities
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-sky-800 text-white border border-sky-700 px-8 py-4 rounded-full hover:bg-sky-700 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Contact Us
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