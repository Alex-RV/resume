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
          Projects :
        </h1>
        
        <Experience>
        <ExperienceCard/>
          <ExperienceCard/>
        </Experience>
          
        
      </div>
      
    </Container>
  )
}
