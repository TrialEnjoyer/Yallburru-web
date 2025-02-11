import Head from "next/head";
import { motion } from "framer-motion";
import {
  Briefcase,
  Clock,
  MapPin,
  Car,
  Shield,
  Users,
  Mail,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CareersPage() {
  return (
    <>
      <Head>
        <title>Careers - Yallburru Community Services</title>
        <meta
          name="description"
          content="Join our team at Yallburru Community Services. We're hiring Home Care Workers & Disability Support Workers."
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
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
            >
              <Briefcase className="w-4 h-4 text-sky-300" />
              <span className="text-sm font-medium text-sky-100">We&apos;re Hiring</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Join Our Team
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-sky-100/90 mb-12"
            >
              Make a difference in your community by joining Yallburru Community Services
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link
                href="#positions"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-900 rounded-full
                         hover:bg-sky-50 transition-colors duration-300"
              >
                View Open Positions
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 mb-6"
              >
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span className="text-sm font-medium text-sky-900">Open Positions</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              >
                Home Care Workers & Disability Support Workers
              </motion.h2>
            </div>

            {/* Job Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Requirements */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Requirements</h3>
                  <ul className="space-y-4">
                    {[
                      { icon: Users, text: "Domestic cleaning experience preferred" },
                      { icon: Clock, text: "Immediate Start (initially casual)" },
                      //{ icon: MapPin, text: "Supporting Elders & NDIS participants (in/out of home)" },
                      { icon: Car, text: "Drivers license & reliable vehicle required" },
                      { icon: Shield, text: "Current criminal history check required" },
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="p-2 bg-sky-100 rounded-lg">
                          <item.icon className="w-5 h-5 text-sky-600" />
                        </div>
                        <span className="text-gray-600 mt-1">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Location & Additional Info</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Service Area</h4>
                      <p className="text-gray-600">
                        Servicing clients across the Gold Coast & surrounds
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Additional Requirements</h4>
                      <p className="text-gray-600">
                        Disability worker screening & working with children checks may be required for some positions
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Diversity Statement</h4>
                      <p className="text-gray-600">
                        Aboriginal and Torres Strait Islander persons are encouraged to apply.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Application CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-center bg-gradient-to-br from-sky-50 to-white rounded-2xl p-8 border border-sky-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Apply?</h3>
              <p className="text-gray-600 mb-8">
                Send your resume ASAP to join our team of dedicated professionals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="mailto:admin@yallburru.org.au?subject=Home Care Worker Application"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-600 text-white rounded-full
                           hover:bg-sky-700 transition-colors duration-300"
                >
                  <Mail className="w-5 h-5" />
                  Email Your Resume
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              >
                Why Join Yallburru?
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Supportive Team",
                  description: "Join a team that values collaboration and mutual support"
                },
                {
                  icon: CheckCircle,
                  title: "Make a Difference",
                  description: "Directly impact and improve the lives of people in your community"
                },
                {
                  icon: Briefcase,
                  title: "Career Growth",
                  description: "Opportunities for professional development and career advancement"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className="bg-white rounded-xl p-6 text-center"
                >
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-sky-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 