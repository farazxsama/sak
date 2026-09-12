import React from 'react'
import PageBanner from "../../../components/Reusable/PageBanner"
// import CivilArchitecturalServicesList from '../../../components/CivilArchitectural/CivilArchitecturalServicesList';
import CivilArchitecturalSubServices from '../../../components/CivilArchitectural/CivilArchitecturalSubServices';
import CTA from '../../../components/Home/CTA';

const page = () => {
    return (
        <>
            <PageBanner
                eyebrow="Civil & Architectural Services"
                title="Structures engineered with precision. Spaces designed with intent."
            />
            <CivilArchitecturalSubServices/>
            <CTA/>
        </>
    )
}

export default page;
