import React from 'react'

import ExperienceCard from '../components/ExperienceCard'
import Experience from '../components/Experience'
import Container from '../components/Container'

export default function experience() {
  return (
    <Container
    title="Projects – Alex Riabov"
    description="Experience">
        <div className="flex flex-col max-w-2xl w-full mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-16 text-black dark:text-white">
          Experience :
        </h1>
        <Experience>
          <ExperienceCard
          title={"CodeNext Club"}
          letter={"C"}
          name={"3D Modeling"}
          date={"Jan 30 2023"}
          description={"Club about 3D modeling"}/>
          <ExperienceCard
          title={"Hackathon"}
          letter={"H"}
          name={"EPOCH"}
          date={"Dec 31 2022"}
          description={"Hackathon in the end of year. Provided by HackClub"}/>
          <ExperienceCard
          title={"School"}
          letter={"S"}
          name={"School San Leandro"}
          date={"Feb 2022 - Jun 2023"}
          description={"My second school"}/>
          <ExperienceCard
          title={"Shcool"}
          letter={"S"}
          name={"Samara School"}
          date={"Sep 2012 - Feb 2022"}
          description={"I've been in this shool during whole my life"}/>
          
        </Experience>
      </div>
      
    </Container>
  )
}
