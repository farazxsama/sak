'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowRight } from 'react-icons/fi';

const courses = [
  {
    name: 'AutoCAD',
    price: '₹8,000',
    logo: '/img/courses/autocad.jpg',
    description: 'Industry-standard 2D drafting and 3D design software for engineers and architects.',
  },
  {
    name: 'Revit Architecture',
    price: '₹15,000',
    logo: '/img/courses/revit-architecture.jpg',
    description: 'BIM-based architectural design, documentation and collaboration workflows.',
  },
  {
    name: 'Revit Structure',
    price: '₹15,000',
    logo: '/img/courses/revit-architecture.jpg',
    description: 'Structural BIM modeling and coordination for reinforced concrete and steel projects.',
  },
  {
    name: 'Revit MEP',
    price: '₹20,000',
    logo: '/img/courses/revit-architecture.jpg',
    description: 'Mechanical, electrical and plumbing system modeling and coordination in Revit.',
  },
  {
    name: 'Tekla',
    price: '₹20,000',
    logo: '/img/courses/tekla.jpg',
    description: 'Advanced structural detailing and steel fabrication modeling software.',
  },
  {
    name: 'SketchUp',
    price: '₹8,000',
    logo: '/img/courses/sketchup.jpg',
    description: '3D modeling tool widely used for architectural concept and visualization work.',
  },
  {
    name: 'Lumion',
    price: '₹8,000',
    logo: '/img/courses/lumion.jpg',
    description: 'Real-time 3D rendering and visualization software for architectural presentations.',
  },
  {
    name: 'D5 Render',
    price: '₹8,000',
    logo: '/img/courses/d5.jpg',
    description: 'Real-time ray-tracing renderer for high-quality architectural visualizations.',
  },
  {
    name: '3DS Max',
    price: '₹15,000',
    logo: '/img/courses/3dsmax.jpg',
    description: '3D modeling, animation and rendering software for architecture and visualization.',
  },
  {
    name: 'STAAD Foundation',
    price: '₹10,000',
    logo: '/img/courses/staad-foundation.jpg',
    description: 'Foundation design and analysis software for structural engineering projects.',
  },
  {
    name: 'STAAD Pro',
    price: '₹10,000',
    logo: '/img/courses/staad-foundation.jpg',
    description: 'Comprehensive structural analysis and design for buildings and infrastructure.',
  },
  {
    name: 'ETABS',
    price: '₹20,000',
    logo: '/img/courses/etabs.jpg',
    description: 'Integrated analysis and design software for building structural systems.',
  },
  {
    name: 'Navisworks',
    price: '₹10,000',
    logo: '/img/courses/navisworks.jpg',
    description: 'Project review and clash detection software for BIM coordination workflows.',
  },
  {
    name: 'ANSYS',
    price: '₹12,000',
    logo: '/img/courses/ansys.jpg',
    description: 'Engineering simulation and finite element analysis for mechanical applications.',
  },
  {
    name: 'CATIA',
    price: '₹12,000',
    logo: '/img/courses/catia.jpg',
    description: 'Multi-platform 3D product design and surface modeling for complex engineering.',
  },
  {
    name: 'SolidWorks',
    price: '₹15,000',
    logo: '/img/courses/solidworks.jpg',
    description: 'Parametric 3D CAD design and simulation for mechanical engineering products.',
  },
  {
    name: 'Primavera',
    price: '₹15,000',
    logo: '/img/courses/primavera.jpg',
    description: 'Project planning, scheduling and management software for engineering projects.',
  },
];

const timingOptions = [
  '5:00 PM – 6:00 PM',
  '6:00 PM – 7:00 PM',
  '7:00 PM – 8:00 PM',
  '8:00 PM – 9:00 PM',
  '9:00 PM – 10:00 PM',
  '10:00 PM – 11:00 PM',
];

const initialForm = {
  name: '',
  number: '',
  email: '',
  address: '',
  timing: '',
  startDate: '',
  message: '',
};

function ApplyModal({ course, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required.';
    if (!form.number.trim()) next.number = 'Phone number is required.';
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
    // TODO: wire to backend / email API
    console.log('Application submitted:', { course: course.name, ...form });
    onClose();
  };

  const inputClass = (field) =>
    `w-full border bg-transparent px-4 py-2.5 text-[14px] text-[#11161A] outline-none transition-colors duration-200 placeholder:text-[#11161A66] rounded-sm ${
      errors[field]
        ? 'border-red-400'
        : 'border-[#11161A33] focus:border-[#11161A]'
    }`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(17,22,26,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-sm p-7 sm:p-8"
        style={{ backgroundColor: '#ffffe4' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-[#11161A10]"
        >
          <FiX size={18} style={{ color: '#11161A' }} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <p className="text-[12px] font-medium tracking-wide" style={{ color: '#11161A80' }}>
            Apply Now
          </p>
          <h3 className="mt-1 text-xl font-semibold" style={{ color: '#11161A' }}>
            {course.name}
          </h3>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {/* Name + Number */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: '#11161A' }}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleChange('name')}
                className={inputClass('name')}
                placeholder="Your full name"
              />
              {errors.name && <p className="mt-1 text-[12px] text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: '#11161A' }}>
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={form.number}
                onChange={handleChange('number')}
                className={inputClass('number')}
                placeholder="+91 00000 00000"
              />
              {errors.number && <p className="mt-1 text-[12px] text-red-500">{errors.number}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: '#11161A' }}>
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              className={inputClass('email')}
              placeholder="you@example.com"
            />
          </div>

          {/* Address */}
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: '#11161A' }}>
              Address
            </label>
            <input
              type="text"
              value={form.address}
              onChange={handleChange('address')}
              className={inputClass('address')}
              placeholder="Your city / area"
            />
          </div>

          {/* Course — auto-filled, disabled */}
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: '#11161A' }}>
              Selected Course
            </label>
            <input
              type="text"
              value={course.name}
              disabled
              className="w-full rounded-sm border px-4 py-2.5 text-[14px] outline-none cursor-not-allowed"
              style={{
                borderColor: '#11161A1a',
                backgroundColor: '#11161A08',
                color: '#11161A80',
              }}
            />
          </div>

          {/* Timing + Start Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: '#11161A' }}>
                Preferred Timing
              </label>
              <select
                value={form.timing}
                onChange={handleChange('timing')}
                className={`${inputClass('timing')} appearance-none`}
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2311161A99'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                }}
              >
                <option value="">Select timing</option>
                {timingOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: '#11161A' }}>
                Preferred Start Date
              </label>
              <input
                type="date"
                value={form.startDate}
                onChange={handleChange('startDate')}
                className={inputClass('startDate')}
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="mb-1.5 block text-[12.5px] font-medium" style={{ color: '#11161A' }}>
              Message
            </label>
            <textarea
              rows={3}
              value={form.message}
              onChange={handleChange('message')}
              className={`${inputClass('message')} resize-none`}
              placeholder="Any questions or additional information..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-1 inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-[14px] font-medium text-[#ffffe4] transition-opacity duration-200 hover:opacity-85"
            style={{ backgroundColor: '#11161A' }}
          >
            Submit Application
            <FiArrowRight size={15} />
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default function CoursesGrid() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <section className="w-full py-16 sm:py-20" style={{ backgroundColor: '#fafaf9' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-xl lg:mb-16"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8" style={{ backgroundColor: '#11161A' }} />
            <span className="text-[13px] font-medium" style={{ color: '#11161A99' }}>
              SAK Courses
            </span>
          </div>
          <h2
            className="text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl"
            style={{ color: '#11161A' }}
          >
            Courses designed for real engineering careers.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed" style={{ color: '#11161Ab3' }}>
            Industry-relevant software training from professionals actively
            working in civil, architectural and mechanical engineering.
          </p>
        </motion.div>

        {/* Grid — 2 mobile / 3 tablet / 4 desktop */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: (index % 4) * 0.08,
              }}
              className="group flex flex-col border p-5 transition-colors duration-300"
              style={{ borderColor: '#11161A1a' }}
            >
              {/* Logo */}
              <div
                className="mb-4 flex h-30 w-full items-center justify-center rounded-sm border"
                style={{ borderColor: '#11161A1a', backgroundColor: '#fafaf9' }}
              >
                <img
                  src={course.logo}
                  alt={course.name}
                  className="h-26 w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.innerHTML =
                      `<span style="font-size:11px;font-weight:600;color:#11161A80;text-align:center;padding:4px;">${course.name.slice(0, 4)}</span>`;
                  }}
                />
              </div>

              {/* Name + description */}
              <h3
                className="text-[15px] font-semibold leading-tight"
                style={{ color: '#11161A' }}
              >
                {course.name}
              </h3>
              <p
                className="mt-2 flex-1 text-[13px] leading-relaxed"
                style={{ color: '#11161A80' }}
              >
                {course.description}
              </p>

              {/* Price */}
              <p
                className="mt-4 text-[17px] font-semibold"
                style={{ color: '#11161A' }}
              >
                {course.price}
              </p>

              {/* Apply button */}
              <button
                onClick={() => setSelectedCourse(course)}
                className="group/btn mt-3 cursor-pointer inline-flex items-center justify-center gap-2 rounded-full border py-2 text-[13px] font-medium transition-colors duration-200 hover:bg-[#11161A] text-[#11161A] hover:text-[#fafaf9]"
                style={{ borderColor: '#11161A' }}
              >
                Apply Now
                <FiArrowRight
                  size={13}
                  className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <ApplyModal
            course={selectedCourse}
            onClose={() => setSelectedCourse(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}