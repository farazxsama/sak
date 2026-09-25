// app/projects/[slug]/page.js
import { notFound } from 'next/navigation';
import { projects } from '../../../lib/project-data';
import ProjectHero from '../../../components/SingleProjectPage/ProjectHero';
import ProjectOverview from '../../../components/SingleProjectPage/ProjectOverview';
import ProjectIntroduction from '../../../components/SingleProjectPage/ProjectIntroduction';
import ProjectScope from '../../../components/SingleProjectPage/ProjectScope';
import ProjectHighlights from '../../../components/SingleProjectPage/ProjectHighlights';
import ProjectGallery from '../../../components/SingleProjectPage/ProjectGallery';
import ProjectVideos from '../../../components/SingleProjectPage/ProjectVideos';
import ProjectLocation from '../../../components/SingleProjectPage/ProjectLocation';
import CTA from '../../../components/Home/CTA';

export default async function ProjectPage({ params }) {
   
    const {slug} = await params;
  const project = projects.find((p) => p.slug === slug);
  
  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      {/* <ProjectIntroduction project={project}/> */}
      {/* <ProjectScope project={project}/> */}
      {/* <ProjectHighlights project={project}/> */}
      <ProjectGallery project={project}/>
      <ProjectVideos project={project}/>
      {/* <ProjectLocation project={project}/> */}
      <CTA/>
      {/* Next sections will go here */}
    </>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}