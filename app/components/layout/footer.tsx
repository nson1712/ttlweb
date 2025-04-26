"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import { motion } from "framer-motion";
import { 
  BookOpen, 
  Clock, 
  Home, 
  Flame, 
  Compass, 
  Mail, 
  FileText, 
  Lightbulb,
  Facebook,
  Twitter,
  Instagram,
  Heart,
  ArrowUp,
  Globe,
  Shield,
  BookMarked
} from "lucide-react";
import { cn } from "../../lib/utils";

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [year] = useState(new Date().getFullYear());
  
  // Handle scroll effect for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 300;
      if (isScrolled !== showScrollTop) {
        setShowScrollTop(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showScrollTop]);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="relative">
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-3 rounded-full bg-emerald-500 text-white shadow-lg transition-all duration-300 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
      
      {/* Newsletter section */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated with Latest Novels</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss new chapter releases, novel announcements, and exclusive content.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Main footer content */}
      <div className="bg-gray-900 pt-16 pb-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* About section */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 p-2">
                  <span className="text-lg font-bold text-white">NS</span>
                </div>
                <span className="text-xl font-bold text-white">NovelSigh</span>
              </div>
              
              <p className="text-gray-400 mb-6">
                A premium platform for reading translated novels from various languages including Chinese, Korean, Japanese, and English.
              </p>
              
              <div className="flex space-x-4">
                <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} label="Facebook" />
                <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} label="Twitter" />
                <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} label="Instagram" />
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6 flex items-center">
                <Compass className="mr-2 h-5 w-5 text-emerald-400" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                <FooterLink href="/" icon={<Home size={16} />}>Home</FooterLink>
                <FooterLink href="/novels" icon={<BookOpen size={16} />}>Novels</FooterLink>
                <FooterLink href="/updates" icon={<Clock size={16} />}>Updates</FooterLink>
                <FooterLink href="/popular" icon={<Flame size={16} />}>Popular</FooterLink>
                <FooterLink href="/genres" icon={<BookMarked size={16} />}>Genre Catalog</FooterLink>
              </ul>
            </div>
            
            {/* Information */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-emerald-400" />
                Information
              </h3>
              <ul className="space-y-3">
                <FooterLink href="/contacts" icon={<Mail size={16} />}>Contacts</FooterLink>
                <FooterLink href="/rules" icon={<Shield size={16} />}>Rules</FooterLink>
                <FooterLink href="/suggest" icon={<Lightbulb size={16} />}>Suggest a Novel</FooterLink>
                <FooterLink href="/faq" icon={<Globe size={16} />}>FAQ</FooterLink>
                <FooterLink href="/about" icon={<Heart size={16} />}>About Us</FooterLink>
              </ul>
            </div>
            
            {/* App Download */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6">Mobile App</h3>
              <p className="text-gray-400 mb-4">
                Read your favorite novels on the go with our mobile app.
              </p>
              <div className="flex flex-col space-y-3">
                <Link href="#" className="transition-transform hover:scale-105">
                  <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    alt="Download on App Store" 
                    width={140} 
                    height={42} 
                  />
                </Link>
                <Link href="#" className="transition-transform hover:scale-105">
                  <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    width={140} 
                    height={42} 
                  />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                &copy; {year} NovelSigh. All rights reserved.
              </p>
              <div className="flex space-x-4 text-sm text-gray-500">
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/dmca" className="hover:text-emerald-400 transition-colors">
                  DMCA
                </Link>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              <span className="flex items-center">
                Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by NovelSigh
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Components
function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href}
      className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-emerald-500 hover:text-white transition-all duration-200"
      aria-label={label}
    >
      {icon}
    </Link>
  );
}

function FooterLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-gray-400 hover:text-emerald-400 transition-colors flex items-center group"
      >
        <span className="mr-2 text-gray-500 group-hover:text-emerald-400 transition-colors">{icon}</span>
        {children}
      </Link>
    </li>
  );
}
