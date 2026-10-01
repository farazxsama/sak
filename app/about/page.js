import React from 'react'
import PageBanner from '../../components/Reusable/PageBanner';
import WhoWeAre from '../../components/About/WhoWeAre';
import OurTeam from '../../components/About/OurTeam';
import CTA from '../../components/Home/CTA'
import OurStory from '../../components/About/OurStory';
import ProblemWeSolve from '../../components/About/ProblemWeSolve';
import WhatMakesUsDifferent from '../../components/About/WhatMakesUsDifferent';
import CoreValues from '../../components/About/CoreValues';
import LeadershipTeam from '../../components/About/LeadershipTeam';

export const metadata = {
    title: "About Us | SAK Engineering & Architect",
    description:
        "Learn about SAK Engineering & Architect, a multidisciplinary engineering and architectural design company delivering integrated solutions across engineering, architecture, BIM, MEP, infrastructure, and visualization.",
};

const page = () => {
    return (
        <>
            <PageBanner
                eyebrow="About Us"
                title="Engineering with purpose. Designing with precision."
            />
            <WhoWeAre/>
            <LeadershipTeam/>
            <OurStory/>
            <ProblemWeSolve/>
            <CoreValues/>
            <WhatMakesUsDifferent/>
            {/* <OurTeam/> */}
            <CTA/>
        </>
    )
}

export default page;
