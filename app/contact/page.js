import React from 'react'
import PageBanner from '../../components/Reusable/PageBanner';
import ContactSection from '../../components/Contact/ContactSection';

export const metadata = {
    title: "Contact Us | SAK Engineering & Architect",
    description:
        "Get in touch with SAK Engineering & Architect for architectural design, civil and structural engineering, mechanical engineering, BIM, MEP, infrastructure, and visualization services.",
};

const page = () => {
    return (
        <>
            <PageBanner
                eyebrow="Contact Us"
                title="Let's talk about your next project."
            />
            <ContactSection/>
        </>
    )
}

export default page;
