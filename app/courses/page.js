import React from 'react'
import PageBanner from '../../components/Reusable/PageBanner';
import CoursesGrid from '../../components/Courses/CoursesGrid';
import CertificateVerification from '../../components/Courses/CertificateVerification';


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
