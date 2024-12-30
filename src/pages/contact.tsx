import Head from "next/head";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import ContactForm from "~/components/home/ContactForm";
import { env } from "~/env";
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

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-sky-900 mb-8">Contact Us</h1>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Contact Information */}
              <div className="bg-white p-8 rounded-lg shadow-sm space-y-6">
                <h2 className="text-2xl font-semibold text-sky-900 mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <Phone className="text-sky-600 flex-shrink-0" size={24} />
                    <span>(07) 5632 5727</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="text-sky-600 flex-shrink-0" size={24} />
                    <Link href="mailto:contact@yallburru.org.au" className="hover:text-sky-600">
                      contact@yallburru.org.au
                    </Link>
                  </p>
                  <p className="flex items-center gap-3">
                    <MapPin className="text-sky-600 flex-shrink-0" size={24} />
                    <span>55 Highland way, Upper Coomera, QLD, 4209</span>
                  </p>
                </div>

                {/* Operating Hours */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-sky-900 mb-4">Operating Hours</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Monday - Friday:</span> 9:00 AM - 5:00 PM</p>
                    <p><span className="font-medium">Saturday - Sunday:</span> Closed</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-sky-900 mb-6">Our Location</h2>
                <div className="aspect-square w-full rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?q=${-27.89303560802856},${153.27929367921863}&zoom=15&key=${env.GOOGLE_MAPS_API_KEY}`}
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-sky-900 mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 