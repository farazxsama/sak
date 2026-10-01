import React from 'react'
import PageBanner from '../../components/Reusable/PageBanner';
import CoursesGrid from '../../components/Courses/CoursesGrid';
import CertificateVerification from '../../components/Courses/CertificateVerification';

export const metadata = {
    title: "Courses | SAK Engineering and Architect ",
    description:
        "Explore engineering and architecture courses from SAK Engineering & Architecture designed to develop practical skills in engineering, architectural design, BIM, and related disciplines.",
};

const page = () => {
    return (
        <>
            <PageBanner
                eyebrow="Courses"
                title="Building skills. Shaping the next generation of engineers."
            />
            <CoursesGrid/>
            <CertificateVerification/>
        </>
    )
}

export default page;
