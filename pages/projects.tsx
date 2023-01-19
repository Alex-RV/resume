import React from 'react'
import Container from '../components/Container'
import Link from 'next/link'

import ProjectLink from '../components/ProjectLink'

export default function projects() {
  return (
    <Container
    title="Projects – Alex Riabov"
    description="All my projects">
        <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Projects
        </h1>
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Here is my done projects so far
          </p>
        </div>
        <div className="flex flex-col w-full">
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
        <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
          Projects:
        </h2>
        {/* <p className="text-gray-600 dark:text-gray-400 mb-4">
            <button className='shard-button'>Hello</button>
        </p> */}
        </div>
        
        <div className='flex flex-row gap-5 container justify-between w-auto mx-auto'>
          <div className='flex flex-col'>
          <ProjectLink
            slug={"first"}
            file={"logo.jpg"}/>
            <ProjectLink
            slug={"second"}
            file={"logo.jpg"}/>
            <ProjectLink
            slug={"third"}
            file={"logo.jpg"}/>
          </div>
          <div className='flex mt-14 flex-col'>
          <ProjectLink
            slug={"first"}
            file={"logo.jpg"}/>
            <ProjectLink
            slug={"second"}
            file={"logo.jpg"}/>
            <ProjectLink
            slug={"third"}
            file={"logo.jpg"}/>
            <ProjectLink
            slug={"first"}
            file={"logo.jpg"}/>
          </div>
          <div className='flex flex-col'>
          <ProjectLink
            slug={"first"}
            file={"logo.jpg"}/>
            <ProjectLink
            slug={"second"}
            file={"logo.jpg"}/>
            <ProjectLink
            slug={"third"}
            file={"logo.jpg"}/>
            <ProjectLink
            slug={"first"}
            file={"logo.jpg"}/>
          </div>
        </div>
        
      </div>
    </Container>
  )
}