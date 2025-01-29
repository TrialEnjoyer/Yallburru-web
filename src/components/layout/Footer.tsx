import Image from "next/image";
import Link from "next/link";
import NewsletterSubscribe from "../home/NewsletterSubscribe";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Link href="/">
                <Image 
                  src="/Logo.svg" 
                  alt="Yallburru Community Services Logo" 
                  className="rounded-full" 
                  width={48} 
                  height={48} 
                />
              </Link>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Providing Elder Care & Disability Support with Compassion and Cultural Understanding
            </p>
            <div className="space-y-3">
              <a href="tel:0756325727" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                <Phone className="w-4 h-4" />
                (07) 5632 5727
              </a>
              <a href="mailto:contact@yallburru.org.au" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                <Mail className="w-4 h-4" />
                contact@yallburru.org.au
              </a>
              <div className="flex items-start gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>The Well, 58 Highland Way,<br />Upper Coomera QLD 4209</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/ourpeople" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Our People
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <NewsletterSubscribe />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Yallburru Community Services. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 