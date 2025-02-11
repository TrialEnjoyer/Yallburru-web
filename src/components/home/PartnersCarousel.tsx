import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Handshake, ArrowRight } from "lucide-react";

const partners = [
  { name: "The Well", logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TLNA21rie6dNc7b4VYnFJ3o9QDAvHIygWtwqZ"},
  { name: "NIB Thrive Indig", logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TQ3oDdFaw08FxRN1sIPw6jHZktmcWhY9aTV7D" },
  { name: "My Aged Care", logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TgGPr44Z89RPrLNOmkHwp1oV2fU5J4ybEqZaz" },
  { name: "Crosslife Property", logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6Tvt8W40nGcu6ELDsJVwYW1pZ4r3BMFAm5PoiN" },
  { name: "MK-Therapy", logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TElyTj0CgzWkNGdLZ7t2ayfT0X4hixwMmAuRU" },
  { name: "TrilogyCare", logo:"https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TqPIK0jkzok7lj1Mtvgsz2NcV5YauEm9pwDOh" },//logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TC2n9Kv4gb3Qmd9UXsr2FqKvpVjoPt6uCcAJN" },
  //{ name: "NDIS", logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6T8RfHW38rYdWB4IRU6mJhTZpqLrxcQCjvVlt5" },
  { name: "Back On Your Feed Podiatry", logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TGxjgZe0Ib9jiwHka0hFXD8qzo5spC2x7lEvW" },
  { name: "NIAA", logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TeoX152N9gpDjnzF17GYwCRWXPUvy2KEL543m" },
  { name: "Balance Mobility", logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TqTwasgzok7lj1Mtvgsz2NcV5YauEm9pwDOh6"},
  //{ name: "TrilogyCare Indig", logo: "https://sqq4x8niu5.ufs.sh/f/DP7snRSl1H6TqPIK0jkzok7lj1Mtvgsz2NcV5YauEm9pwDOh"},
];

export default function PartnersCarousel() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 mb-6"
          >
            <Handshake className="w-4 h-4 text-sky-600" />
            <span className="text-sm font-medium text-sky-900">Our Partners</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Trusted Partnerships
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-gray-600"
          >
            Working together to deliver exceptional care and support services
          </motion.p>
        </motion.div>

        {/* Logo Carousel */}
        <div className="relative w-full py-12">
          {/* Carousel Container */}
          <div className="flex overflow-hidden w-full">
            {/* Gradient Overlays */}
            <div className="absolute left-0 -top-8 -bottom-8 w-64 bg-[linear-gradient(to_right,#ffffff_0%,rgba(255,255,255,0.9)_20%,rgba(255,255,255,0.7)_40%,rgba(255,255,255,0.4)_60%,rgba(255,255,255,0.1)_80%,transparent_100%)] z-10 backdrop-blur-[2px]" />
            <div className="absolute right-0 -top-8 -bottom-8 w-64 bg-[linear-gradient(to_left,#ffffff_0%,rgba(255,255,255,0.9)_20%,rgba(255,255,255,0.7)_40%,rgba(255,255,255,0.4)_60%,rgba(255,255,255,0.1)_80%,transparent_100%)] z-10 backdrop-blur-[2px]" />
            
            {/* Top and Bottom Fades */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-[linear-gradient(to_bottom,#ffffff_0%,rgba(255,255,255,0.9)_20%,rgba(255,255,255,0.7)_40%,rgba(255,255,255,0.4)_60%,rgba(255,255,255,0.1)_80%,transparent_100%)] z-10 backdrop-blur-[1px]" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[linear-gradient(to_top,#ffffff_0%,rgba(255,255,255,0.9)_20%,rgba(255,255,255,0.7)_40%,rgba(255,255,255,0.4)_60%,rgba(255,255,255,0.1)_80%,transparent_100%)] z-10 backdrop-blur-[1px]" />
            
            {/* Background Effects */}
            <div className="absolute inset-y-0 inset-x-0 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-pink-50/50 opacity-20" />
            <div className="absolute inset-y-0 inset-x-0 bg-[radial-gradient(circle_at_50%_50%,rgba(115,136,217,0.1),transparent_50%)]" />

            {/* First Set of Logos */}
            <motion.div
              initial={{ x: "0%" }}
              animate={{ x: "-100%" }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
              className="flex gap-16 items-center shrink-0"
            >
              {partners.map((partner, index) => (
                <motion.div
                  key={`logo-1-${index}`}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="w-96 h-48 flex items-center justify-center p-8 transition-all duration-300"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={320}
                    height={160}
                    className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-all duration-300 filter hover:brightness-110"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                    priority={index < 4}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Duplicated Set of Logos for Seamless Loop */}
            <motion.div
              initial={{ x: "0%" }}
              animate={{ x: "-100%" }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }}
              className="flex gap-16 items-center shrink-0"
            >
              {partners.map((partner, index) => (
                <motion.div
                  key={`logo-2-${index}`}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="w-96 h-48 rounded-xl backdrop-blur-sm flex items-center justify-center p-8 transition-all duration-300"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={320}
                    height={160}
                    className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-all duration-300 filter hover:brightness-110"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                    priority={index < 4}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        
        {/* View All Partners Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/partnerships"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium text-lg group"
          >
            View Our Partners
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 