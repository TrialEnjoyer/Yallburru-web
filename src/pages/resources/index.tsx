import Head from "next/head";
import { motion } from "framer-motion";
import { FileText, Download, ArrowRight, Building2, Files, Book, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ResourcesPage() {
  return (
    <>
      <Head>
        <title>Resources - Yallburru</title>
        <meta name="description" content="Access important forms and resources for Yallburru Community Services" />
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
              <Files className="w-4 h-4 text-sky-300" />
              <span className="text-sm font-medium text-sky-100">Resources & Forms</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Resources
              <span className="block mt-2 bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
                Supporting Our Community
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-sky-100/90 mb-12"
            >
              Access important forms and resources to help you engage with our services and community programs
            </motion.p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      </section>

      {/* Resources Content */}
      <section className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Rule Book Section */}
            <div className="mb-20">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 mb-6"
                >
                  <Book className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">Resource Library</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                >
                  Documents
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-gray-600 max-w-2xl mx-auto mb-12"
                >
                  Our comprehensive guide containing all guidelines, policies, and procedures for members of Yallburru Community Services
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 max-w-3xl mx-auto hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row items-center gap-6 text-left">
                    <div className="p-4 bg-purple-50 rounded-2xl">
                      <Book className="w-12 h-12 text-purple-600" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        Consolidated Rule Book
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Access the complete set of rules, regulations, and guidelines that govern our organization and memberships. Essential reading for all members to understand their rights, responsibilities, and our operational procedures.
                      </p>
                      <Link
                        href="/resources/consolidated-rule-book"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        View Rule Book
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Forms Section */}
            <div className="mb-16">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 mb-6"
                >
                  <Book className="w-4 h-4 text-sky-600" />
                  <span className="text-sm font-medium text-sky-900">Application Materials</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
                >
                  Essential Forms
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-gray-600 max-w-2xl mx-auto"
                >
                  Access and submit important forms for membership and organizational processes
                </motion.p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Membership Application */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="group bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-sky-50 rounded-lg group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Membership Application
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Apply to become a member of Yallburru Community Services. Join our community and be part of our journey.
                      </p>
                      <Link
                        href="/resources/forms/membership"
                        className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium group-hover:gap-3 transition-all"
                      >
                        Access Form
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>

                {/* Proxy Appointment */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="group bg-white rounded-xl shadow-sm border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-sky-50 rounded-lg group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Appointment of Proxy
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Appoint a proxy for voting and decision-making purposes at member meetings and events.
                      </p>
                      <Link
                        href="/resources/forms/proxy"
                        className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium group-hover:gap-3 transition-all"
                      >
                        Access Form
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
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
              <span className="text-sm font-medium text-sky-100">Need Help?</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              We&apos;re Here to Assist
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-sky-100/90 mb-12"
            >
              If you need help with any of our forms or resources, our team is here to support you.
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