import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, FileText, Send, Users, Sparkles, Building2, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MembershipForm() {
  const [showOnlineForm, setShowOnlineForm] = useState(false);

  return (
    <>
      <Head>
        <title>Membership Application - Yallburru</title>
        <meta name="description" content="Apply for membership with Yallburru Community Services" />
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
              <span className="text-white">Membership Application</span>
            </div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
            >
              <Users className="w-4 h-4 text-sky-300" />
              <span className="text-sm font-medium text-sky-100">Join Our Community</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Membership Application
              <span className="block mt-2 bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
                Become Part of Our Story
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-sky-100/90 mb-12"
            >
              Choose your preferred method to submit your membership application
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
                <span className="text-sm font-medium text-sky-900">Application Options</span>
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
                Select the application method that works best for you
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
                  Download the membership application form to fill out manually. You can return the completed form via email or in person.
                </p>
                <a
                  href="/forms/membership-application.pdf"
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
                  Fill out and submit your membership application online. This is the fastest way to apply.
                </p>
                <button
                  onClick={() => setShowOnlineForm(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Start Online Form
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>

            {/* Online Form Dropdown */}
            <AnimatePresence>
              {showOnlineForm && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8"
                >
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-sky-100 rounded-lg">
                          <FileText className="w-5 h-5 text-sky-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          Application for Membership
                        </h3>
                      </div>
                      <button
                        onClick={() => setShowOnlineForm(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                    
                    <form className="p-6 space-y-6">
                      <div className="text-sm text-gray-600 border-b border-gray-200 pb-4">
                        Corporations (Aboriginal and Torres Strait Islander) Act 2006
                      </div>

                      {/* Corporation Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name of corporation
                        </label>
                        <input
                          type="text"
                          value="Yallburru Community Services"
                          disabled
                          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                        />
                      </div>

                      {/* Applicant Name */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First or given name
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Surname
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <textarea
                          required
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                      </div>

                      {/* Declaration */}
                      <div className="pt-6 border-t border-gray-200">
                        <div className="flex items-center gap-3 mb-4">
                          <input
                            type="checkbox"
                            required
                            id="declaration"
                            className="w-4 h-4 text-sky-600 rounded focus:ring-sky-500"
                          />
                          <label htmlFor="declaration" className="text-sm text-gray-700">
                            I declare I am eligible for membership
                          </label>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Signature
                            </label>
                            <div className="h-24 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-sm text-gray-500">Digital signature coming soon</span>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Date
                            </label>
                            <input
                              type="date"
                              required
                              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-end pt-6 border-t border-gray-200">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                        >
                          Submit Application
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
                <li>Please ensure all required fields are completed</li>
                <li>Attach any necessary supporting documentation</li>
                <li>Applications are typically processed within 5-10 business days</li>
                <li>You will be notified via email once your application has been processed</li>
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
              Questions About Membership?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-sky-100/90 mb-12"
            >
              Our team is here to help you with the application process
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