import React from 'react'
import Container from '../components/Container'
import Link from 'next/link'

import ProjectLink from '../components/ProjectLink'

export default function projects() {
  return (
    <Container
    title="Projects – Alex Riabov"
    description="All my projects">
        <div className="flex flex-col justify-start items-start max-w-2xl w-full mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-16 text-black dark:text-white">
          Projects :
        </h1>
        <p>
          The percentages below are representative of my proficiency in each skill.
        </p>
        <div className='grid-cols-2 grid gap-5 sm:grid-cols-3 mx-auto container w-full max-w-2xl justify-center items-start'>
          <ProjectLink
            slug={"first"}
            file={"/logo.jpg"}
            title={"Project"}
            description={"Description of project"}/>
            <ProjectLink
            slug={"second"}
            file={"/logo.jpg"}
            title={"Project"}
            description={"Description of project"}/>
            <ProjectLink
            slug={"third"}
            file={"/logo.jpg"}
            title={"Project"}
            description={"Description of project"}/>
          <ProjectLink
            slug={"first"}
            file={"/logo.jpg"}
            title={"Project"}
            description={"Description of project"}/>
            <ProjectLink
            slug={"second"}
            file={"/logo.jpg"}
            title={"Project"}
            description={"Description of project"}/>
        </div>
      </div>
      
    </Container>
  )
}