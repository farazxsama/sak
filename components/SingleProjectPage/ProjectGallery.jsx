// components/SingleProjectPage/ProjectGallery.jsx
'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiX, FiZoomIn } from 'react-icons/fi';

// Splits the gallery into groups of 3 so the "one large + two stacked"
// pattern can repeat dynamically, regardless of image count.
function chunkImages(images, size = 3) {
  const chunks = [];
  for (let i = 0; i < images.length; i += size) {
    chunks.push(images.slice(i, i + size));
  }
  return chunks;
}

function GalleryImage({ src, alt, className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden bg-[#11161A]/5 ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-[#11161A]/0 transition-colors duration-300 group-hover:bg-[#11161A]/20">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <FiZoomIn size={16} className="text-[#11161A]" />
        </div>
      </div>
    </div>
  );
}

export default function ProjectGallery({ project }) {
  const images = project.galleryImages || [];
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const isOpen = lightboxIndex !== null;

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const showNext = () =>
    setLightboxIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, images.length]);

  if (images.length === 0) return null;

  const groups = chunkImages(images, 3);

  return (
    <section className="w-full bg-[#FAFAF9] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-xl lg:mb-16"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-[#3E7CB1]" />
            <span className="text-[13px] font-medium text-[#6B7780]">Project Gallery</span>
          </div>
          <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight text-[#11161A] sm:text-4xl">
            A closer look at the project.
          </h2>
        </motion.div>

        {/* Gallery groups */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {groups.map((group, groupIndex) => {
            const globalStartIndex = groupIndex * 3;
            const reversed = groupIndex % 2 === 1;

            return (
              <motion.div
                key={groupIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Group of 3 — one large + two stacked */}
                {group.length === 3 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-2 sm:gap-5 sm:h-[480px]">
                    <GalleryImage
                      src={group[0]}
                      alt={`${project.title} — image ${globalStartIndex + 1}`}
                      onClick={() => setLightboxIndex(globalStartIndex)}
                      className={`aspect-[4/3] sm:row-span-2 sm:aspect-auto sm:h-full ${
                        reversed ? 'sm:col-start-2' : 'sm:col-start-1'
                      }`}
                    />
                    <GalleryImage
                      src={group[1]}
                      alt={`${project.title} — image ${globalStartIndex + 2}`}
                      onClick={() => setLightboxIndex(globalStartIndex + 1)}
                      className={`aspect-[4/3] sm:row-start-1 sm:aspect-auto sm:h-full ${
                        reversed ? 'sm:col-start-1' : 'sm:col-start-2'
                      }`}
                    />
                    <GalleryImage
                      src={group[2]}
                      alt={`${project.title} — image ${globalStartIndex + 3}`}
                      onClick={() => setLightboxIndex(globalStartIndex + 2)}
                      className={`aspect-[4/3] sm:row-start-2 sm:aspect-auto sm:h-full ${
                        reversed ? 'sm:col-start-1' : 'sm:col-start-2'
                      }`}
                    />
                  </div>
                )}

                {/* Group of 2 — even split */}
                {group.length === 2 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    {group.map((src, i) => (
                      <GalleryImage
                        key={src}
                        src={src}
                        alt={`${project.title} — image ${globalStartIndex + i + 1}`}
                        onClick={() => setLightboxIndex(globalStartIndex + i)}
                        className="aspect-[4/3] sm:h-[420px]"
                      />
                    ))}
                  </div>
                )}

                {/* Group of 1 — full-width banner */}
                {group.length === 1 && (
                  <GalleryImage
                    src={group[0]}
                    alt={`${project.title} — image ${globalStartIndex + 1}`}
                    onClick={() => setLightboxIndex(globalStartIndex)}
                    className="aspect-[16/9] w-full sm:h-[480px]"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#11161A]/95 px-4 py-10 sm:px-10"
          >
            <button
              onClick={closeLightbox}
              aria-label="Close gallery"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
            >
              <FiX size={20} />
            </button>

            <span className="absolute left-5 top-6 text-[13px] font-medium text-white/50">
              {lightboxIndex + 1} / {images.length}
            </span>

            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 sm:left-8"
              >
                <FiChevronLeft size={20} />
              </button>
            )}

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              src={images[lightboxIndex]}
              alt={`${project.title} — enlarged image`}
              className="max-h-[85vh] max-w-full object-contain"
            />

            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20 sm:right-8"
              >
                <FiChevronRight size={20} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}