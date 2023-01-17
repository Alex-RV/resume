import React from 'react'
import Image from 'next/image'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import Container from '../components/Container'
import InfoCard from '../components/InfoCard'

export default function About() {
  return (
    <Container>
      <div className="flex flex-col items-start max-w-2xl mx-auto mb-16">
        <div className='flex flex-row mb-10'>
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About Me
        </h1>
        <div className="w-[80px] sm:w-[250px]  ml-40 relative justify-self-end mb-8 sm:mb-0 mr-auto">
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
        
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
          I’m a programmer, who has started my way from learning code by myself and communicating with other developers. 
        I’m a political refugee, who moved to the Bay Area, United States at the beginning of 2022. 
        I know how life is changeable and how hard it is to keep your position and opinion in this world. 
        Now I’m a student in San Leandro High School. Ambassador of Google Code Next and full-stack developer.
            
          </p>
        </div>
        <div className="flex flex-col w-full">
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
        </div>
        <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
          Top Quotes
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Quotes from people about me
        </p>
      </div>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <Splide
          options={ {
            type   : 'loop',
            perPage: 3,
            drag   : 'free',
            rewind: true,
            gap   : '1rem',
            autoplay: true,
            breakpoints: {
              640: {
                perPage: 1,
                width : "70%",
              },
              550: {
                perPage: 1,
                width : "50%",
              }
            }
            
          } }
          aria-label="My Favorite Images"
          className='w-full px-12 py-5'>
          <SplideSlide>
            <InfoCard 
            title={"It was a great story about me"}
            name={"Kristina"}/>
          </SplideSlide>
          <SplideSlide>
          <InfoCard 
            title={"He is"}
            name={"Someone"}/>
          </SplideSlide>
          <SplideSlide>
          <InfoCard 
            title={"He is amazing"}
            name={"Me"}/>
          </SplideSlide>
          <SplideSlide>
          <InfoCard 
            title={"Page"}
            name={"Persone"}/>
          </SplideSlide>
          <SplideSlide>
          <InfoCard 
            title={"Text"}
            name={"People"}/>
          </SplideSlide>
        </Splide>
        </div>
        
    </Container>
  )
}
