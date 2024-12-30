import Head from "next/head";
import { Mail, Phone, MapPin, Clock, ExternalLink, ArrowRight } from "lucide-react";
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
      <div className="pt-24 bg-gradient-to-b from-sky-900 to-sky-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-sky-100 mb-8">
              We&apos;re here to help and answer any questions you might have
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="tel:0756325727"
                className="inline-flex items-center gap-2 bg-white text-sky-900 px-6 py-3 rounded-full hover:bg-sky-50 transition-colors"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
              <a 
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-sky-700 text-white px-6 py-3 rounded-full hover:bg-sky-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Send a Message
              </a>
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
              fill: 'rgb(249, 250, 251)', 
              width: '100%', 
              height: 40, 
              transform: 'rotateY(180deg)' 
            }}
          >
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </div>

      <main className="bg-gray-50 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-8 -mt-8">
              {/* Phone Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 transform hover:-translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Available Mon-Fri, 9am-5pm</p>
                <a 
                  href="tel:0756325727"
                  className="text-sky-600 hover:text-sky-700 font-medium inline-flex items-center gap-1"
                >
                  (07) 5632 5727
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 transform hover:-translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">We&apos;ll respond within 24 hours</p>
                <a 
                  href="mailto:contact@yallburru.org.au"
                  className="text-sky-600 hover:text-sky-700 font-medium inline-flex items-center gap-1"
                >
                  contact@yallburru.org.au
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Visit Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 transform hover:-translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-sky-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-gray-600 mb-4">The Well, 58 Highland Way, Upper Coomera</p>
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('The well, 58 Highland Way, Upper Coomera QLD 4209')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-600 hover:text-sky-700 font-medium inline-flex items-center gap-1"
                >
                  Get Directions
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Map and Hours Section */}
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {/* Map */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-sky-600" />
                  Our Location
                </h2>
                <div className="space-y-4">
                  <div className="aspect-video w-full rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps/embed/v1/place?q=The%20Well%2C%2058%20Highland%20Way%2C%20Upper%20Coomera%20QLD%204209&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&zoom=15`}
                    ></iframe>
                  </div>
                  <Link
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('The Well, 58 Highland Way, Upper Coomera QLD 4209')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open in Google Maps
                  </Link>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-sky-600" />
                  Operating Hours
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Monday - Friday</span>
                    <span className="text-gray-600">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-900">Saturday</span>
                    <span className="text-gray-600">Closed</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="font-medium text-gray-900">Sunday</span>
                    <span className="text-gray-600">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div id="contact-form" className="mt-12 bg-white rounded-xl shadow-sm p-8">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-600 mb-8">
                  Have a question or want to learn more about our services? Fill out the form below and we&apos;ll get back to you shortly.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
} 