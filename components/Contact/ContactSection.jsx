'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const contactDetails = [
  {
    icon: FiPhone,
    label: 'Phone',
    value: '+91 78421 03005',
    href: 'tel:+917842103005',
  },
  {
    icon: FiMail,
    label: 'Email',
    value: 'info@sakea.com',
    href: 'mailto:info@sakea.com',
  },
  {
    icon: FiMapPin,
    label: 'Address',
    value: 'Hyderabad, Telangana, India',
    href: 'https://maps.google.com/?q=Hyderabad+Telangana',
  },
];

const initialForm = { name: '', email: '', phone: '', message: '' };

export default function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.phone.trim()) next.phone = 'Please enter your phone number.';
    if (!form.message.trim()) next.message = 'Please add a short message.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: wire this up to a real backend/API endpoint once one exists.
    console.log('Contact form ready to submit:', form);
  };

  const inputClass = (field) =>
    `w-full border bg-transparent px-4 py-3 text-[15px] text-[#11161A] outline-none transition-colors duration-200 placeholder:text-[#11161A66] ${
      errors[field] ? 'border-red-500' : 'border-[#11161A33] focus:border-[#11161A]'
    }`;

  return (
    <section className="w-full py-16 sm:py-20" style={{ backgroundColor: '#ffffe4' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8" style={{ backgroundColor: '#11161A' }} />
              <span className="text-[13px] font-medium" style={{ color: '#11161A99' }}>
                Contact
              </span>
            </div>
            <h2
              className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl"
              style={{ color: '#11161A' }}
            >
              Get in Touch
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: '#11161Ab3' }}>
              Reach out to discuss a project, ask about our services, or
              simply say hello — we'd love to hear from you.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;
                return (
                  <a
                    key={detail.label}
                    href={detail.href}
                    target={detail.label === 'Address' ? '_blank' : undefined}
                    rel={detail.label === 'Address' ? 'noopener noreferrer' : undefined}
                    className="group flex items-start gap-4"
                  >
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 group-hover:bg-[#11161A]"
                      style={{ borderColor: '#11161A33', color: '#11161A' }}
                    >
                      <Icon
                        size={17}
                        className="transition-colors duration-300 group-hover:text-[#ffffe4]"
                      />
                    </div>
                    <div>
                      <p className="text-[13px] font-medium" style={{ color: '#11161A80' }}>
                        {detail.label}
                      </p>
                      <p className="mt-1 text-[15px]" style={{ color: '#11161A' }}>
                        {detail.value}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            <div>
              <label className="mb-2 block text-[13.5px] font-medium" style={{ color: '#11161A' }}>
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                className={inputClass('name')}
                placeholder="Your full name"
              />
              {errors.name && <p className="mt-2 text-[13px] text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="mb-2 block text-[13.5px] font-medium" style={{ color: '#11161A' }}>
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                className={inputClass('email')}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-2 text-[13px] text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-2 block text-[13.5px] font-medium" style={{ color: '#11161A' }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                className={inputClass('phone')}
                placeholder="+91 00000 00000"
              />
              {errors.phone && <p className="mt-2 text-[13px] text-red-500">{errors.phone}</p>}
            </div>

            <div>
              <label className="mb-2 block text-[13.5px] font-medium" style={{ color: '#11161A' }}>
                Message
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={handleChange('message')}
                className={`${inputClass('message')} resize-none`}
                placeholder="Tell us a bit about your project..."
              />
              {errors.message && <p className="mt-2 text-[13px] text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full px-8 py-3 text-[14px] font-medium text-[#ffffe4] transition-opacity duration-200 hover:opacity-85"
              style={{ backgroundColor: '#11161A' }}
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}