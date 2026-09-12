import React from 'react'
import PageBanner from '../../components/Reusable/PageBanner';
import WhyWorkWithUs from '../../components/Careers/WhyWorkWithUs';
import LifeAtSak from '../../components/Careers/LifeAtSak';
import ApplicationForm from '../../components/Careers/ApplicationForm';

const page = () => {
    return (
        <>
            <PageBanner
                eyebrow="Careers"
                title="Build your career with a team that engineers with purpose."
            />
            <WhyWorkWithUs />
            <LifeAtSak/>
            <ApplicationForm/>

        </>
    )
}

export default page;
