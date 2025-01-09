import Head from "next/head";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ExternalLink, 
  ArrowRight,
  MessageCircle,
  Building2,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import ContactForm from "~/components/home/ContactForm";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us - Yallburru Community Services</title>
        <meta 
          name="description" 
          content="Get in touch with Yallburru Community Services. We're here to help with your Elder Care & Disability Support needs." 
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
              <MessageCircle className="w-4 h-4 text-sky-300" />
              <span className="text-sm font-medium text-sky-100">Get in Touch</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Let&apos;s Start a
              <span className="block mt-2 bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
                Conversation
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-sky-100/90 mb-12"
            >
              We&apos;re here to help and answer any questions you might have about our services and support.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <a 
                href="tel:0756325727"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-900 rounded-full
                         hover:bg-sky-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact-form"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-sky-800/50 text-white border border-sky-400/30 
                         rounded-full hover:bg-sky-700/50 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
              >
                <Mail className="w-5 h-5" />
                Send a Message
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      </section>

      <main className="bg-gray-50">
        {/* Contact Cards Section */}
        <section className="relative -mt-16 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Phone className="w-6 h-6 text-sky-600" />,
                    title: "Call Us",
                    description: "Available Mon-Fri, 8:30am-4:30pm",
                    action: {
                      text: "(07) 5632 5727",
                      href: "tel:0756325727"
                    }
                  },
                  {
                    icon: <Mail className="w-6 h-6 text-sky-600" />,
                    title: "Email Us",
                    description: "We'll respond within 24 hours",
                    action: {
                      text: "contact@yallburru.org.au",
                      href: "mailto:contact@yallburru.org.au"
                    }
                  },
                  {
                    icon: <MapPin className="w-6 h-6 text-sky-600" />,
                    title: "Visit Us",
                    description: "The Well, 58 Highland Way, Upper Coomera",
                    action: {
                      text: "Get Directions",
                      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('The well, 58 Highland Way, Upper Coomera QLD 4209')}`
                    }
                  }
                ].map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    className="group bg-white rounded-xl shadow-lg p-8 transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {card.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{card.title}</h3>
                    <p className="text-gray-600 mb-6">{card.description}</p>
                    <a 
                      href={card.action.href}
                      target={card.action.href.startsWith('http') ? '_blank' : undefined}
                      rel={card.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sky-600 hover:text-sky-700 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all"
                    >
                      {card.action.text}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Map and Hours Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Map */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white rounded-xl shadow-sm p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-sky-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900">Our Location</h2>
                  </div>
                  <div className="space-y-6">
                    <div className="aspect-video w-full rounded-xl overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        title="58 Highland Way, Upper Coomera QLD 4209"
                        src={`https://www.google.com/maps/embed/v1/place?q=Yallburru%20Community%20Services%2C%20The%20Well%2C%2058%20Highland%20Way%2C%20Upper%20Coomera%20QLD%204209&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&zoom=15`}
                      ></iframe>
                    </div>
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('The Well, 58 Highland Way, Upper Coomera QLD 4209')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open in Google Maps
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>

                {/* Hours */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="bg-white rounded-xl shadow-sm p-8"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-sky-600" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900">Operating Hours</h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      { days: "Monday - Friday", hours: "8:30 AM - 4:30 PM" },
                      { days: "Saturday", hours: "Closed" },
                      { days: "Sunday", hours: "Closed" }
                    ].map((schedule, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`flex justify-between items-center py-4 ${
                          index !== 2 ? "border-b border-gray-100" : ""
                        }`}
                      >
                        <span className="font-medium text-gray-900">{schedule.days}</span>
                        <span className="text-gray-600">{schedule.hours}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact-form" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 mb-6"
                >
                  <MessageCircle className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-medium text-sky-900">Send a Message</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                >
                  How Can We Help?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-gray-600 max-w-2xl mx-auto"
                >
                  Have a question or want to learn more about our services? Fill out the form below and we&apos;ll get back to you shortly.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 