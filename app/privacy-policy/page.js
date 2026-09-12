import React from 'react';
import PageBanner from '@/components/Reusable/PageBanner';

export const metadata = {
  title: 'Privacy Policy | SAK Engineering & Architecture',
  description: 'Privacy Policy for SAK Engineering & Architecture.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Privacy Policy"
      />
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 text-slate-800">
        <div className="prose prose-slate max-w-none space-y-6">
          <p className="text-sm text-slate-500 font-mono">Last Updated: March 2025</p>
          <h2 className="text-2xl font-bold text-slate-900">1. Information We Collect</h2>
          <p className="leading-relaxed">
            At SAK Engineering &amp; Architecture, we respect your privacy. We collect information you provide directly to us when requesting consultations, submitting inquiries, or communicating with us regarding our civil, architectural, and mechanical engineering services.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">2. How We Use Information</h2>
          <p className="leading-relaxed">
            We use collected information solely to provide, coordinate, and improve our engineering consultancy, client support, and project delivery. We do not sell, rent, or trade your personal data to third parties.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">3. Data Security</h2>
          <p className="leading-relaxed">
            We employ industry-standard organizational and technical safeguards to protect your data from unauthorized access, disclosure, alteration, or destruction.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">4. Contact Us</h2>
          <p className="leading-relaxed">
            If you have questions regarding this Privacy Policy, reach out to us at <a href="mailto:info@sakengineering.com" className="text-blue-600 font-medium hover:underline">info@sakengineering.com</a>.
          </p>
        </div>
      </div>
    </>
  );
}
