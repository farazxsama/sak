import React from 'react'
import PageBanner from "../../components/Reusable/PageBanner"
import ProjectsListing from '../../components/Projects/ProjectsListing';
import CTA from '../../components/Home/CTA';

export const metadata = {
    title: "Projects | SAK Engineering & Architect",
    description:
        "Explore SAK Engineering & Architect projects across architectural design, civil and infrastructure, structural engineering, BIM, MEP, and mechanical engineering.",
};

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
