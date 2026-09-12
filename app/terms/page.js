import React from 'react';
import PageBanner from '@/components/Reusable/PageBanner';

export const metadata = {
  title: 'Terms of Service | SAK Engineering & Architecture',
  description: 'Terms of Service for SAK Engineering & Architecture.',
};

export default function TermsPage() {
  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Terms of Service"
      />
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 text-slate-800">
        <div className="prose prose-slate max-w-none space-y-6">
          <p className="text-sm text-slate-500 font-mono">Last Updated: March 2025</p>
          <h2 className="text-2xl font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p className="leading-relaxed">
            By accessing or using the services and website of SAK Engineering &amp; Architecture, you agree to comply with and be bound by these Terms of Service.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">2. Professional Engineering Services</h2>
          <p className="leading-relaxed">
            All civil, architectural, structural, and mechanical engineering solutions are executed under formal project contracts and scopes of work agreed upon between SAK and the contracting client.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">3. Intellectual Property</h2>
          <p className="leading-relaxed">
            All blueprints, designs, BIM models, and architectural drawings produced by SAK are proprietary works subject to the licensing and intellectual property terms established in individual project service agreements.
          </p>

          <h2 className="text-2xl font-bold text-slate-900">4. Contact Information</h2>
          <p className="leading-relaxed">
            For contractual inquiries or clarifications, please contact us at <a href="mailto:info@sakengineering.com" className="text-blue-600 font-medium hover:underline">info@sakengineering.com</a>.
          </p>
        </div>
      </div>
    </>
  );
}
