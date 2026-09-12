import React from 'react'
import PageBanner from "../../components/Reusable/PageBanner"
import ProjectsListing from '../../components/Projects/ProjectsListing';
import CTA from '../../components/Home/CTA';

const page = () => {
    return (
        <>
            <PageBanner
                eyebrow="Our Projects"
                title="Explore our portfolio of architectural, engineering and design projects."
            />
            <ProjectsListing/>
            <CTA/>
        </>
    )
}

export default page;
