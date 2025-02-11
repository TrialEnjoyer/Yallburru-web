import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Search,
  HelpCircle,
  ArrowRight,
  Heart,
  Clock,
  Users,
  Shield,
  MessageCircle,
  Sparkles,
  HandHeart,
  Leaf,
  Award,
  Phone,
  Mail,
  MapPin,
  DollarSign,
  Calendar,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

type FAQ = {
  question: string;
  answer: string | React.ReactNode;
  category: string;
};

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs: FAQ[] = [
    // Services FAQs
    {
      category: "services",
      question: "What services does Yallburru Community Services provide?",
      answer: (
        <div className="space-y-4">
          <p>We provide a comprehensive range of services including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Elder Care Services</li>
            {/*<li>Disability Support Services (NDIS registered)</li>*/}
            <li>Youth & Family Services</li>
            <li>Community Consultation</li>
            <li>Culture & Connection Programs</li>
            <li>Advocacy & Education Services</li>
          </ul>
          <p>
            <Link href="/services" className="text-sky-600 hover:text-sky-700 inline-flex items-center gap-2">
              View our full range of services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      ),
    },
    {
      category: "services",
      question: "Do you provide services outside of the Gold Coast?",
      answer: "Yes, while we're based in Upper Coomera on the Gold Coast, we provide services across South East Queensland and have nationwide coverage for certain services. Contact us to discuss service availability in your area.",
    },
    {
      category: "services",
      question: "What are your operating hours?",
      answer: "Our office is open Monday to Friday, 8:30 AM to 4:30 PM. However, we provide 24/7 support for eligible clients requiring round-the-clock care services.",
    },

    // NDIS FAQs
    /*{
      category: "ndis",
      question: "Are you a registered NDIS provider?",
      answer: "Yes, we are a registered NDIS provider. We meet all the quality and safety requirements set by the NDIS Quality and Safeguards Commission.",
    },*/
    /*{
      category: "ndis",
      question: "How can I access your NDIS services?",
      answer: (
        <div className="space-y-4">
          <p>To access our NDIS services:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Contact us to discuss your needs</li>
            <li>Provide your NDIS number and plan details</li>
            <li>Meet with our team for an initial assessment</li>
            <li>We&apos;ll create a service agreement tailored to your needs</li>
          </ol>
          <p>
            <Link href="/contact" className="text-sky-600 hover:text-sky-700 inline-flex items-center gap-2">
              Contact us to get started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      ),
    },
    {
      category: "ndis",
      question: "What NDIS supports do you provide?",
      answer: "We provide a wide range of NDIS supports including personal care, community participation, capacity building, and specialized support services. All our services are culturally sensitive and tailored to individual needs.",
    },*/

    // Cultural Services FAQs
    {
      category: "cultural",
      question: "How do you ensure cultural sensitivity in your services?",
      answer: "As an Indigenous-owned organization, cultural sensitivity is at the core of everything we do. Our staff are trained in cultural awareness, and we incorporate traditional practices and values into our service delivery. We maintain strong connections with the community and ensure all our services respect and honor cultural traditions.",
    },
    {
      category: "cultural",
      question: "Do you offer cultural connection programs?",
      answer: "Yes, we offer various cultural connection programs including traditional practices, community events, and knowledge sharing initiatives. These programs are designed to strengthen cultural bonds and preserve traditional knowledge.",
    },

    // General FAQs
    {
      category: "general",
      question: "How do I get started with your services?",
      answer: (
        <div className="space-y-4">
          <p>Getting started is easy:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Contact us via phone, email, or our contact form</li>
            <li>We&apos;ll schedule an initial consultation</li>
            <li>Discuss your needs and available services</li>
            <li>Create a personalized care plan</li>
            <li>Begin receiving services</li>
          </ol>
        </div>
      ),
    },
    {
      category: "general",
      question: "What qualifications do your staff have?",
      answer: "Our staff are highly qualified professionals with relevant certifications in their areas of expertise. All staff undergo regular training, including cultural awareness training, and maintain current qualifications as required by industry standards.",
    },
    {
      category: "general",
      question: "How can I provide feedback about your services?",
      answer: "We welcome feedback through multiple channels: directly through your support worker, by calling our office, via email, or through our website's contact form. Your feedback helps us continuously improve our services.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle FAQ item open/closed state
  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  // Ensure first item is open when search query changes
  useEffect(() => {
    if (filteredFaqs.length > 0 && searchQuery.length > 0) {
      setOpenItems([0]);
    }
  }, [searchQuery, filteredFaqs.length]);

  return (
    <>
      <Head>
        <title>FAQ - Yallburru Community Services</title>
        <meta
          name="description"
          content="Find answers to frequently asked questions about Yallburru Community Services' Elder Care & Disability Support services."
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
              <HelpCircle className="w-4 h-4 text-sky-300" />
              <span className="text-sm font-medium text-sky-100">Help Center</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              How Can We Help You?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-sky-100/90 mb-12"
            >
              Find answers to common questions about our services and support
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                           text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30
                           transition-all duration-300"
                />
                <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      </section>

      {/* FAQ Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { id: "all", label: "All Questions", icon: HelpCircle },
                { id: "services", label: "Our Services", icon: Heart },
                /*{ id: "ndis", label: "NDIS Support", icon: Shield },*/
                { id: "cultural", label: "Cultural Services", icon: Leaf },
                { id: "general", label: "General Info", icon: MessageCircle },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                    ${activeCategory === category.id
                      ? "bg-sky-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-sky-50"
                    }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-xl font-semibold text-gray-900">
                        {faq.question}
                      </h3>
                      <ChevronDown 
                        className={`w-6 h-6 flex-shrink-0 text-gray-500 transition-transform duration-200
                          ${openItems.includes(index) ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {openItems.includes(index) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 prose max-w-none text-gray-600">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or browse all questions above.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 mb-6"
            >
              <MessageCircle className="w-4 h-4 text-sky-600" />
              <span className="text-sm font-medium text-sky-900">Still Have Questions?</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
            >
              We&apos;re Here to Help
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl text-gray-600 mb-12"
            >
              Can&apos;t find what you&apos;re looking for? Get in touch with our team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-sky-600 text-white rounded-full
                         hover:bg-sky-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="tel:1300071157"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-900 rounded-full
                         border border-gray-200 hover:bg-sky-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Phone className="w-5 h-5" />
                1300 071 157
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
} 