import React from 'react'
import PageBanner from '../../../components/Reusable/PageBanner';
import MechanicalEngineeringSubServices from '../../../components/MechanicalEngineering/MechanicalEngineeringSubServices';
import CTA from '../../../components/Home/CTA';

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
