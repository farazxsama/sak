import React from 'react'
import PageBanner from "../../../components/Reusable/PageBanner"
// import CivilArchitecturalServicesList from '../../../components/CivilArchitectural/CivilArchitecturalServicesList';
import CivilArchitecturalSubServices from '../../../components/CivilArchitectural/CivilArchitecturalSubServices';
import CTA from '../../../components/Home/CTA';

export const metadata = {
    title: "Civil & Architectural Engineering | SAK",
    description:
        "SAK Engineering & Architect provides civil and architectural design solutions covering planning, building design, structural coordination, documentation, and multidisciplinary project delivery.",
};

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
