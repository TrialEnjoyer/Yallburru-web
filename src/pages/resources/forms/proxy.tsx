import Head from "next/head";
import { motion } from "framer-motion";
import { Download, ArrowRight, FileText, Send, Users, Sparkles, Building2, Vote } from "lucide-react";
import Link from "next/link";

export default function ProxyForm() {
  return (
    <>
      <Head>
        <title>Appointment of Proxy - Yallburru</title>
        <meta name="description" content="Appoint a proxy for voting and decision-making purposes at Yallburru Community Services" />
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
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <Link 
                href="/resources"
                className="text-sky-200 hover:text-white transition-colors"
              >
                Resources
              </Link>
              <span className="text-sky-200">/</span>
              <Link 
                href="/resources"
                className="text-sky-200 hover:text-white transition-colors"
              >
                Forms
              </Link>
              <span className="text-sky-200">/</span>
              <span className="text-white">Appointment of Proxy</span>
            </div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
            >
              <Users className="w-4 h-4 text-sky-300" />
              <span className="text-sm font-medium text-sky-100">Member Services</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Appointment of Proxy
              <span className="block mt-2 bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
                Delegate Your Voice
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-sky-100/90 mb-12"
            >
              Choose your preferred method to submit your proxy appointment form
            </motion.p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      </section>

      {/* Form Options */}
      <section className="relative py-20 bg-gray-50">
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
                <Building2 className="w-4 h-4 text-sky-600" />
                <span className="text-sm font-medium text-sky-900">Submission Options</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              >
                Choose Your Method
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-gray-600 max-w-2xl mx-auto"
              >
                Select the submission method that works best for you
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Download Option */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-3 bg-sky-50 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Download className="w-6 h-6 text-sky-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Download Form
                </h2>
                <p className="text-gray-600 mb-6">
                  Download the proxy appointment form to fill out manually. You can return the completed form via email or in person.
                </p>
                <a
                  href="/forms/proxy-appointment.pdf"
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Download PDF
                  <FileText className="w-5 h-5" />
                </a>
              </motion.div>

              {/* Online Form Option */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="group bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-3 bg-sky-50 rounded-lg w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Send className="w-6 h-6 text-sky-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Online Form
                </h2>
                <p className="text-gray-600 mb-6">
                  Fill out and submit your proxy appointment form online. This is the fastest way to submit your form.
                </p>
                <button
                  onClick={() => {
                    // TODO: Implement online form submission
                    console.log("Open online form");
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Start Online Form
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-16 p-8 bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Important Information
              </h3>
              <ul className="list-disc list-inside text-gray-600 space-y-3">
                <li>The proxy appointment form must be submitted at least 48 hours before any meeting</li>
                <li>Your proxy must be a current member of Yallburru Community Services</li>
                <li>You can revoke a proxy appointment at any time by submitting a new form</li>
                <li>The proxy appointment is valid for 12 months unless otherwise specified</li>
              </ul>
            </motion.div>
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
              <span className="text-sm font-medium text-sky-100">Need Assistance?</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Questions About Proxy Appointments?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-sky-100/90 mb-12"
            >
              Our team is here to help you with the proxy appointment process
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-900 rounded-full
                         hover:bg-sky-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact Our Team
                <ArrowRight className="w-5 h-5" />
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