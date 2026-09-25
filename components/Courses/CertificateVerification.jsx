// components/Courses/CertificateVerification.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiDownload, FiAlertCircle, FiFileText } from 'react-icons/fi';

export default function CertificateVerification() {
  const [certNumber, setCertNumber] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | found | notfound
  const [activeCert, setActiveCert] = useState(null);

  const handleInputChange = (e) => {
    setCertNumber(e.target.value);

    // Clear any previous result the moment the user starts typing again,
    // so "not found" (or a stale result) doesn't linger while they edit.
    if (status !== 'idle') {
      setStatus('idle');
      setActiveCert(null);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    const trimmed = certNumber.trim();
    if (!trimmed) return;

    setStatus('loading');

    const filePath = `/certificates/${trimmed}.pdf`;

    try {
      const res = await fetch(filePath, { method: 'HEAD' });

      if (res.ok) {
        setActiveCert({ number: trimmed, path: filePath });
        setStatus('found');
      } else {
        setActiveCert(null);
        setStatus('notfound');
      }
    } catch (err) {
      setActiveCert(null);
      setStatus('notfound');
    }
  };

  return (
    <section className="w-full bg-[#FAFAF9] py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#3E7CB1]" />
            <span className="text-[13px] font-medium text-[#6B7780]">Certificate Verification</span>
            <span className="h-px w-8 bg-[#3E7CB1]" />
          </div>
          <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight text-[#11161A] sm:text-4xl">
            Find and verify your certificate.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#6B7780]">
            Enter your certificate number below to view and download it.
          </p>
        </motion.div>

        {/* Search box */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          onSubmit={handleSearch}
          className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <FiSearch
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7780]"
            />
            <input
              type="text"
              value={certNumber}
              onChange={handleInputChange}
              placeholder="Enter certificate number"
              className="w-full rounded-full border border-[#11161A]/15 bg-white py-3.5 pl-11 pr-4 text-[14.5px] text-[#11161A] outline-none transition-colors duration-200 placeholder:text-[#6B7780]/70 focus:border-[#11161A]/40"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#11161A] px-7 py-3.5 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#11161A]/90 disabled:opacity-60"
          >
            {status === 'loading' ? 'Searching…' : 'Search'}
          </button>
        </motion.form>

        {/* Result */}
        <AnimatePresence mode="wait">
          {status === 'notfound' && (
            <motion.div
              key="notfound"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-10 flex max-w-xl flex-col items-center gap-3 border border-dashed border-[#11161A]/15 px-8 py-10 text-center"
            >
              <FiAlertCircle size={22} className="text-[#6B7780]" />
              <p className="text-[15px] font-medium text-[#11161A]">
                No certificate found for &ldquo;{certNumber.trim()}&rdquo;
              </p>
              <p className="max-w-xs text-[13.5px] leading-relaxed text-[#6B7780]">
                Double-check the certificate number and try again, or contact us if you believe this is an error.
              </p>
            </motion.div>
          )}

          {status === 'found' && activeCert && (
            <motion.div
              key="found"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10"
            >
              <div className="mb-4 flex flex-col items-start justify-between gap-3 border border-[#11161A]/10 bg-white px-6 py-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3E7CB1]/10">
                    <FiFileText size={17} className="text-[#3E7CB1]" />
                  </div>
                  <div>
                    <p className="text-[13px] text-[#6B7780]">Certificate Number</p>
                    <p className="text-[15px] font-semibold text-[#11161A]">{activeCert.number}</p>
                  </div>
                </div>

                <a
                  href={activeCert.path}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-[#11161A] px-6 py-2.5 text-[13.5px] font-medium text-[#11161A] transition-colors duration-200 hover:bg-[#11161A] hover:text-white"
                >
                  Download PDF
                  <FiDownload size={14} />
                </a>
              </div>

              <div className="overflow-hidden border border-[#11161A]/10 bg-white">
                <iframe
                  src={activeCert.path}
                  title={`Certificate ${activeCert.number}`}
                  className="h-[70vh] w-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}