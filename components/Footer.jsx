'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiInstagram, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const serviceLinks = [
    { label: 'Civil & Architectural', href: '/services/civil-architectural' },
    { label: 'Mechanical Engineering', href: '/services/mechanical-engineering' },
];

const companyLinks = [
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Pricing', href: '/pricing' },

    { label: 'Academy', href: '/academy' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },

];

const socialLinks = [
    { label: 'Instagram', href: 'https://www.instagram.com/sak.ea.official?stkn=cTFrN3RrcDBra2ps', icon: FiInstagram },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/safwan-khan-41782b27b', icon: FiLinkedin },
];

export default function Footer() {
    return (
        <footer className="relative z-10 w-full bg-[#080B0E] border-t border-white/10 text-white">
            <div className="mx-auto max-w-7xl px-6 pb-10 pt-16 sm:pt-20 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8"
                >
                    {/* Brand + contact */}
                    <div className="flex flex-col">
                        <Link href="/">
                            <img
                                src="/img/sak-logo.png"
                                alt="SAK"
                                className="h-auto w-[160px] object-cover"
                            />
                        </Link>

                        <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed text-white/50">
                            Civil, architectural and mechanical engineering services delivered
                            with precision — from concept to completion.
                        </p>

                        <div className="mt-8 flex flex-col gap-3">
                            <a
                                href="mailto:info@sakengineering.com"
                                className="flex items-center gap-3 text-[14px] text-white/60 transition-colors duration-200 hover:text-white"
                            >
                                <FiMail size={15} className="shrink-0 text-[#3E7CB1]" />
                                info@sakengineering.com
                            </a>
                            <a
                                href="tel:+917842103005"
                                className="flex items-center gap-3 text-[14px] text-white/60 transition-colors duration-200 hover:text-white"
                            >
                                <FiPhone size={15} className="shrink-0 text-[#3E7CB1]" />
                                +91 78421 03005
                            </a>
                            <div className="flex items-start gap-3 text-[14px] text-white/60">
                                <FiMapPin size={15} className="mt-0.5 shrink-0 text-[#3E7CB1]" />
                                <span>Hyderabad, Telangana, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="flex flex-col">
                        <span className="text-[13px] font-medium text-white/40">Services</span>
                        <ul className="mt-5 flex flex-col gap-3">
                            {serviceLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[14.5px] text-white/70 transition-colors duration-200 hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col">
                        <span className="text-[13px] font-medium text-white/40">Company</span>
                        <ul className="mt-5 flex flex-col gap-3">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-[14.5px] text-white/70 transition-colors duration-200 hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div className="flex flex-col">
                        <span className="text-[13px] font-medium text-white/40">Connect</span>
                        <ul className="mt-5 flex flex-col gap-3">
                            {socialLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-[14.5px] text-white/70 transition-colors duration-200 hover:text-white"
                                    >
                                        <link.icon size={14} />
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* Divider */}
                <div className="mt-16 border-t border-white/10 pt-6">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <span className="text-[13px] text-white/40">
                            © {new Date().getFullYear()} SAK Engineering &amp; Architect. All rights reserved.
                        </span>

                        <div className="flex items-center gap-5">
                            <Link
                                href="/privacy-policy"
                                className="text-[13px] text-white/40 transition-colors duration-200 hover:text-white"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-[13px] text-white/40 transition-colors duration-200 hover:text-white"
                            >
                                Terms
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}