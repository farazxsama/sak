import SeaAbout from "../../components/Sea/SeaAbout";
import SeaHero from "../../components/Sea/SeaHero";
import SeaSpecialization from "../../components/Sea/SeaSpecialization";

export const metadata = {
    title: "Structural Engineering & Architect",
    description:
        "Explore structural engineering and architect design solutions by SAK Engineering & Architecture, combining engineering precision, design thinking, BIM, and multidisciplinary coordination.",
};

const page = () => {
    return (
        <>
           <SeaHero/>
           <SeaAbout/>
           <SeaSpecialization/>
        </>
    )
}

export default page;
