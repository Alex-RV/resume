import React from 'react'
import Image from 'next/image'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import Container from '../components/Container'
import InfoCard from '../components/InfoCard'

export default function About() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
      <div className="flex sm:flex-row justify-center items-start max-w-2xl mx-auto mb-16 ">
        <div className='flex flex-col mr-6 text-black dark:text-white'>
        <h1 className="flex font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          About me
        </h1>
        <h3> My favorite quote:</h3>
        
        </div>
        
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
        <h1 className='md:text-2xl '>Who is the Alex Riabov?</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex">
        I’m a programmer, who has started my way from learning code by myself and communicating with other developers. 
        I’m a political refugee, who moved to the Bay Area, United States at the beginning of 2022. 
        I know how life is changeable and how hard it is to keep your position and opinion in this world. 
        Now I’m a student in San Leandro High School. Ambassador of Google Code Next and full-stack developer.
        </p>
        <div className="flex w-700 flex-col md:flex-row max-w-2xl mt-16">
        <Splide
          options={ {
            type   : 'loop',
            perPage: 3,
            drag   : 'free',
            rewind: true,
            gap   : '1rem',
            autoplay: true,
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
      </div>
    </Container>
  )
}
