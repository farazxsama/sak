'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  // { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Civil & Architectural Services', href: '/services/civil-architectural' },
      { label: 'Mechanical Engineering Services', href: '/services/mechanical-engineering' },
    ],
  },
  { label: 'Projects', href: '/projects' },
  { label: 'Academy', href: '/academy' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setMobileServicesOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isDark = scrolled || mobileOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        scrolled ? 'lg:top-4' : 'lg:top-0'
      }`}
    >
      <div
        className={`mx-auto flex h-20 items-center justify-between px-6 transition-all duration-500 ease-out lg:px-10 ${
          scrolled
            ? 'max-w-7xl border-b border-[#E9ECEE] bg-white lg:h-[68px] lg:max-w-5xl lg:rounded-full lg:border-none lg:bg-white lg:px-8 lg:shadow-[0_8px_30px_rgba(17,22,26,0.12)]'
            : 'max-w-7xl border-b border-transparent bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <img
            src="/img/sak-logo.png"
            alt="SAK"
            className="h-auto w-[160px] object-cover"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 text-[14.5px] font-medium transition-colors duration-300 ${
                    isDark ? 'text-[#2F3A40] hover:text-[#11161A]' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                  <FiChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute left-0 top-full w-72 pt-3"
                    >
                      <div className="overflow-hidden rounded-md border border-[#E9ECEE] bg-white shadow-lg shadow-black/5">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-5 py-3.5 text-[14px] text-[#4B5860] transition-colors duration-150 hover:bg-[#F5F6F7] hover:text-[#11161A]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[14.5px] font-medium transition-colors duration-300 ${
                  isDark ? 'text-[#2F3A40] hover:text-[#11161A]' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className={`-mr-2 p-2 transition-colors duration-300 lg:hidden ${
            isDark ? 'text-[#11161A]' : 'text-white'
          }`}
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-[#E9ECEE] bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="flex flex-col">
                    <button
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className="flex items-center justify-between border-b border-[#F5F6F7] py-3 text-[15px] font-medium text-[#1C2328]"
                    >
                      {link.label}
                      <FiChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col overflow-hidden pl-4"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="py-2.5 text-[14px] text-[#6B7780]"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="border-b border-[#F5F6F7] py-3 text-[15px] font-medium text-[#1C2328] last:border-none"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}