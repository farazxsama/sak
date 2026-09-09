"use client";
import { RiWhatsappLine } from "react-icons/ri";

/* ── Replace with your actual WhatsApp number ── */
const WHATSAPP_NUMBER = "917842103005"; // format: country code + number, no +
const MESSAGE = "Hello! I'd like to visit the site.";

export default function WhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 group"
    >
      {/* Tooltip */}
      <span
        className="hidden sm:block px-3 py-1.5 rounded-xl text-xs font-bold text-white whitespace-nowrap pointer-events-none"
        style={{
          background: "#25d366",
          boxShadow: "0 4px 14px rgba(37,211,102,0.40)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        Chat with us
      </span>

      {/* Button */}
      <div
        className="relative w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #25d366, #128c4a)",
          boxShadow:
            "0 4px 24px rgba(37,211,102,0.50), 0 2px 8px rgba(0,0,0,0.12)",
        }}
      >
        {/* Ping ring */}
        <span className="absolute inset-0 rounded-full animate-ping"
          style={{ background: "rgba(37,211,102,0.30)" }}
        />
        <RiWhatsappLine className="relative z-10 text-white text-3xl" />
      </div>
    </a>
  );
}