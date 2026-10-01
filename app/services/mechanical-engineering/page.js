import React from 'react'
import PageBanner from '../../../components/Reusable/PageBanner';
import MechanicalEngineeringSubServices from '../../../components/MechanicalEngineering/MechanicalEngineeringSubServices';
import CTA from '../../../components/Home/CTA';

export const metadata = {
    title: "Mechanical Engineering | SAK Engineering & Architect",
    description:
        "Explore mechanical engineering and design services from SAK Engineering & Architecture, including mechanical design, engineering development, coordination, and industrial project solutions.",
};

const page = () => {
    return (
        <>
            <PageBanner
                eyebrow="Mechanical Engineering Services"
                title="Precision-engineered components. Reliable mechanical systems."
            />
            <MechanicalEngineeringSubServices />
            <CTA/>
        </>
    )
}

export default page;
