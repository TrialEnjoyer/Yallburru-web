import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Handshake, ExternalLink, ArrowRight } from "lucide-react";
import Head from "next/head";

const partners = [
  { 
    name: "The Well", 
    logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TLNA21rie6dNc7b4VYnFJ3o9QDAvHIygWtwqZ",
    description: "The Well stands as a vibrant, multi-function community centre at the heart of Upper Coomera. As a bustling community hub, it brings together diverse services and activities, creating a welcoming space where community connections thrive.",
    website: "https://cplvenues.org.au/the-well-community-centre/"
  },
  { 
    name: "NIB Thrive Indig", 
    logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TQ3oDdFaw08FxRN1sIPw6jHZktmcWhY9aTV7D",
    description: "A dedicated NDIS partner empowering participants to take control of their support journey. Their experienced team provides comprehensive plan management, budget tracking, and personalized support to help individuals thrive and achieve their goals.",
    website: "https://www.nib.com.au/thrive/"
  },
  { 
    name: "My Aged Care", 
    logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TgGPr44Z89RPrLNOmkHwp1oV2fU5J4ybEqZaz",
    description: "The primary gateway to Australian Government-funded aged care services. They provide essential support in understanding, accessing, and navigating the aged care system, offering personalized assessments and connecting individuals with the right care services for their needs.",
    website: "https://www.myagedcare.gov.au/"
  },
  { 
    name: "Crosslife Property", 
    logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6Tvt8W40nGcu6ELDsJVwYW1pZ4r3BMFAm5PoiN",
    description: "A valued partner providing essential spaces for our community services in the northern Gold Coast region. Their multipurpose facilities enable us to deliver vital support programs and host community gatherings that strengthen our connections.",
    website: "https://cplvenues.org.au/"
  },
  { 
    name: "MK-Therapy", 
    logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TElyTj0CgzWkNGdLZ7t2ayfT0X4hixwMmAuRU",
    description: "A holistic therapy service empowering individuals to live life on their terms. Offering comprehensive occupational therapy, soft tissue therapy, and lifestyle support services, they focus on building capacity and creating positive change through personalized assessment, treatment, and support.",
    website: "https://www.mktherapy.com.au/"
  },
  { 
    name: "TrilogyCare",//main 
    logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TqPIK0jkzok7lj1Mtvgsz2NcV5YauEm9pwDOh",//"https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TC2n9Kv4gb3Qmd9UXsr2FqKvpVjoPt6uCcAJN",
    description: "A transparent and client-focused home care provider empowering individuals to self-manage their Home Care Packages. With flat-rate pricing and no hidden fees, they ensure clients have full control over their care workers and support services while receiving the best value care at home.",
    website: "https://trilogycare.com.au/"
  },
  /*{ 
    name: "NDIS", 
    logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6T8RfHW38rYdWB4IRU6mJhTZpqLrxcQCjvVlt5",
    description: "Working alongside the National Disability Insurance Scheme (NDIS) to support better lives for Australians with significant and permanent disabilities. We help participants navigate and maximize their NDIS journey through dedicated support coordination and service facilitation.",
    website: "https://www.ndis.gov.au/"
  },*/
  { 
    name: "Back On Your Feet Podiatry", 
    logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TGxjgZe0Ib9jiwHka0hFXD8qzo5spC2x7lEvW",
    description: "A client-focused podiatry clinic based in Ormeau, Gold Coast, offering comprehensive foot care services with Medicare and NDIS support. Their mobile service extends across Brisbane, Ipswich, and Gold Coast regions, ensuring accessible, professional care in the comfort of your home.",
    website: "https://backonyourfeet.com.au/"
  },
  { 
    name: "National Indigenous Australians Agency", 
    logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TeoX152N9gpDjnzF17GYwCRWXPUvy2KEL543m",
    description: "The National Indigenous Australians Agency (NIAA) leads Commonwealth policy and program delivery for First Nations peoples. Working in genuine partnership, they enable self-determination and ensure Indigenous voices are heard in decisions that affect their communities, while coordinating vital initiatives including Closing the Gap.",
    website: "https://www.niaa.gov.au/"
  },
  { 
    name: "Balance Mobility", 
    logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TqTwasgzok7lj1Mtvgsz2NcV5YauEm9pwDOh6",
    description: "Since 2006, Balance Mobility has empowered individuals with mobility needs to lead fulfilling, independent lives. With stores in Tweed Heads and Biggera Waters, they offer comprehensive mobility solutions including wheelchairs, scooters, and daily living aids, backed by exceptional personalized service.",
    website: "https://balancemobility.com.au/"
  },/*
  { 
    name: "TrilogyCare Indig", 
    logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TqPIK0jkzok7lj1Mtvgsz2NcV5YauEm9pwDOh",
    description: "Specialized care services for Indigenous communities.",
    website: "#"
  }*/
];

export default function Partnerships() {
  return (
    <>
      <Head>
        <title>Our Partnerships | Yallburru</title>
        <meta name="description" content="Discover our trusted partnerships and collaborations at Yallburru." />
      </Head>

      <main className="bg-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-sky-900 via-sky-800 to-purple-900 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]">
              <div className="absolute inset-0 bg-sky-900 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_20%,black_100%)]"></div>
            </div>
          </div>

          <div className="relative container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6"
              >
                <Handshake className="w-4 h-4 text-sky-300" />
                <span className="text-sm font-medium text-sky-100">Our Partners</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                Our Trusted
                <span className="block mt-2 bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
                  Partners
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl text-sky-100/90"
              >
                Working together to deliver exceptional care and support services to our community
              </motion.p>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        </section>

        {/* Partners Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="h-48 bg-gray-50/50 rounded-xl flex items-center justify-center p-8 mb-6 group-hover:bg-sky-50/50 transition-colors duration-300">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={320}
                      height={160}
                      className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-300 filter group-hover:brightness-110"
                      style={{ maxWidth: '100%', maxHeight: '100%' }}
                      priority={index < 6}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600">
                    {partner.description}
                  </p>
                  {partner.website !== "#" && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium mt-4"
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              ))}
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
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-white mb-6"
              >
                Interested in Partnering with Us?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-sky-100/90 mb-12"
              >
                We&apos;re always looking to collaborate with organizations that share our vision for better community support services.
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
                  Get in Touch
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-1/4 -left-64 w-96 h-96 bg-sky-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-1/3 -right-64 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
        </section>
      </main>
    </>
  );
} 