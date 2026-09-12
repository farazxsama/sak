import React from 'react'
import PageBanner from '../../components/Reusable/PageBanner';
import ContactSection from '../../components/Contact/ContactSection';

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
