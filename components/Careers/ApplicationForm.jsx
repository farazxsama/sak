'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUpload, FiCheck } from 'react-icons/fi';

const positions = [
  'Architect',
  'Civil Engineer',
  'Structural Engineer',
  'Mechanical Engineer',
  'BIM Engineer',
  'Interior Designer',
  '3D Visualizer',
  'CAD Designer',
  'Project Engineer',
  'Other',
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  position: '',
  message: '',
  resume: null,
};

export default function ApplicationForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [fileName, setFileName] = useState('');

  const validate = () => {
    const next = {};

    if (!form.name.trim()) next.name = 'Please enter your full name.';

    if (!form.email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.';
    }

    if (!form.phone.trim()) next.phone = 'Please enter your phone number.';

    if (!form.position) next.position = 'Please select a position.';

    if (!form.message.trim()) next.message = 'Please add a short message.';

    if (!form.resume) next.resume = 'Please upload your resume or CV.';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setForm((prev) => ({ ...prev, resume: file }));
    setFileName(file ? file.name : '');
    if (errors.resume) setErrors((prev) => ({ ...prev, resume: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO: wire this up to a real backend/API endpoint once one exists.
    // Example: send `form` (including form.resume) via FormData to your
    // application-intake API route.
    console.log('Application ready to submit:', form);
  };

  const inputClass = (field) =>
    `w-full border bg-transparent px-4 py-3 text-[15px] text-[#11161A] outline-none transition-colors duration-200 placeholder:text-[#11161A66] ${
      errors[field] ? 'border-red-500' : 'border-[#11161A33] focus:border-[#11161A]'
    }`;

  return (
    <section className="w-full py-16 sm:py-20" style={{ backgroundColor: '#FAFAF9' }}>
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 lg:mb-14"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: '#11161A' }} />
            <span className="text-[13px] font-medium" style={{ color: '#11161A99' }}>
              Apply Now
            </span>
          </div>
          <h2
            className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: '#11161A' }}
          >
            Send Us Your Application
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed" style={{ color: '#11161Ab3' }}>
            We are always interested in meeting talented architects,
            engineers, designers and professionals who are passionate about
            creating better solutions. If you would like to be part of our
            team, send us your details and resume.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="flex flex-col gap-6"
        >
          {/* Name + Email */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
          </div>

          {/* Phone + Position */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                Position / Designation
              </label>
              <select
                value={form.position}
                onChange={handleChange('position')}
                className={`${inputClass('position')} appearance-none`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2311161A99'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                }}
              >
                <option value="">Select a position</option>
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
              {errors.position && <p className="mt-2 text-[13px] text-red-500">{errors.position}</p>}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block text-[13.5px] font-medium" style={{ color: '#11161A' }}>
              Message
            </label>
            <textarea
              rows={5}
              value={form.message}
              onChange={handleChange('message')}
              className={`${inputClass('message')} resize-none`}
              placeholder="Tell us a little about yourself, your experience and the role you are interested in..."
            />
            {errors.message && <p className="mt-2 text-[13px] text-red-500">{errors.message}</p>}
          </div>

          {/* Resume upload */}
          <div>
            <label className="mb-2 block text-[13.5px] font-medium" style={{ color: '#11161A' }}>
              Resume / CV
            </label>
            <label
              htmlFor="resume-upload"
              className={`flex cursor-pointer items-center justify-between border px-4 py-3 transition-colors duration-200 ${
                errors.resume ? 'border-red-500' : 'border-[#11161A33] hover:border-[#11161A]'
              }`}
            >
              <span className="flex items-center gap-3 text-[15px]" style={{ color: fileName ? '#11161A' : '#11161A66' }}>
                <FiUpload size={16} />
                {fileName || 'Choose File'}
              </span>
              {fileName && <FiCheck size={16} style={{ color: '#3E7CB1' }} />}
            </label>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="mt-2 text-[13px]" style={{ color: '#11161A80' }}>
              Accepted formats: PDF, DOC, DOCX
            </p>
            {errors.resume && <p className="mt-2 text-[13px] text-red-500">{errors.resume}</p>}
          </div>

          {/* Submit */}
          <div className="mt-2 flex justify-center sm:justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-[14px] font-medium text-[#FAFAF9] transition-opacity duration-200 hover:opacity-85"
              style={{ backgroundColor: '#11161A' }}
            >
              Submit Application
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}