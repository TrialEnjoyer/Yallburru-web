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
  Handshake,
  Calendar,
  Clock
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WaveDivider from "../components/home/WaveDivider";
import ContactForm from "../components/home/ContactForm";
import { supabase } from "~/utils/supabase";

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
                              src="/Logo.webp"
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
                <span>The Well, 58 Highland Way, Upper Coomera, QLD, 4209</span>
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}