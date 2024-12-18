import Image from "next/image";
import Link from "next/link";
import NewsletterSubscribe from "../home/NewsletterSubscribe";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Link href="/">
                <Image 
                  src="/Logo.webp" 
                  alt="Yallburru Community Services Logo" 
                  className="rounded-full" 
                  width={36} 
                  height={36} 
                />
              </Link>
            </div>
            <p className="text-gray-400 mb-4">
              © {new Date().getFullYear()} Yallburru Community Services. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-400">
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <NewsletterSubscribe />
          </div>
        </div>
      </div>
    </footer>
  );
} 