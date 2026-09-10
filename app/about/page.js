import React from 'react'
import PageBanner from '../../components/Reusable/PageBanner';
import WhoWeAre from '../../components/About/WhoWeAre';
import OurApproach from '../../components/About/OurApproach';
import OurTeam from '../../components/About/OurTeam';
import CTA from '../../components/Home/CTA'

const page = () => {
    return (
        <>
            <PageBanner
                eyebrow="About Us"
                title="Engineering with purpose. Designing with precision."
            />
            <WhoWeAre/>
            <OurApproach/>
            <OurTeam/>
            <CTA/>
        </>
    )
}

export default page;
