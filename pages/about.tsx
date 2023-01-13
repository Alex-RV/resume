import React from 'react'
import Image from 'next/image'

import Container from '../components/Container'

export default function About() {
  return (
    <Container>
      <div className="flex flex-row justify-between items-start max-w-2xl mx-auto mb-16">
        <div className='flex flex-col mr-6'>
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Here you can see information about me
        </p>
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
    </Container>
  )
}
