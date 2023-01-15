import React from 'react'
import Image from 'next/image'

import Container from '../components/Container'
import ProjectCard from '../components/ProjectCard'
import CarouselBar from '../components/Carousel/CarouselBar'

export default function About() {
  return (
    <Container>
      <div className="flex flex-col justify-between items-start max-w-2xl mx-auto mb-16">
      <div className="flex flex-row justify-between items-start max-w-2xl mx-auto mb-16">
        <div className='flex flex-col mr-6'>
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About me
        </h1>
        <h3> My favorite quote:</h3>
        
        </div>
        
        <div className="w-[80px] sm:w-[250px] relative mb-8 sm:mb-0 mr-auto">
          <Image
            alt="Logo"
            height={250}
            width={250}
            src="/logo.jpg"
            sizes="30vw"
            priority
            className="rounded-full filter"
          />
        </div>
        </div>
        <h1 className='md:text-2xl '>Who is the Alex Riabov?</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
        I’m a programmer, who has started my way from learning code by myself and communicating with other developers. 
        I’m a political refugee, who moved to the Bay Area, United States at the beginning of 2022. 
        I know how life is changeable and how hard it is to keep your position and opinion in this world. 
        Now I’m a student in San Leandro High School. Ambassador of Google Code Next and full-stack developer.
        </p>
        <div className="flex gap-6 flex-col md:flex-row">
        {/* <img src="/logo.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/> */}
          <CarouselBar/>
              {/* <ProjectCard
                title="He is great"
                slug=""
                name="Me"
              />
              <ProjectCard
                title="He is amazing"
                slug="accounting-app"
                name="Kristina"
              />
              <ProjectCard
                title="He is awesome"
                slug="memeware"
                name="Melani"
              /> */}
          </div>
      </div>
    </Container>
  )
}
