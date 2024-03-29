import React from 'react'
import Image from 'next/image'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import Container from '../components/Container'
import InfoCard from '../components/InfoCard'

export default function About() {
  return (
    <Container
    title="About Me – Alex Riabov"
    description="About Me Page">
      <div className="flex flex-col items-start max-w-2xl mx-auto mb-16">
        <div className='flex flex-row sm:mb-1 mb-5'>
          <div className='flex flex-col h-full '>
            <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
            About Me
            </h1>
            <h3 data-aos="fade-up" className=' mt-auto sm:mt-10 text-2xl text-[#2ea6ff] font-extrabold'>
            Pursue your goals.
            </h3>
          </div>
        
        <div className="w-[80px] sm:w-[250px] ml-5 sm:ml-40 relative justify-self-end mb-8 sm:mb-0 mr-auto">
          <Image
            alt="Logo"
            height={250}
            width={250}
            src="/logo.png"
            sizes="30vw"
            priority
            className="rounded-full filter"
          />
        </div>
        </div>
        
        <div data-aos="fade-up" className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
          I have developed my skills through learning and collaborating with other developers. 
          As a political refugee, I have experienced first-hand the challenges and uncertainties 
          that come with navigating a new country and culture. Recently, I have settled in the 
          San Francisco Bay Area of the United States and am currently a computer science student. 
          In addition to my studies, I an Ambassador for Google Code Next and a 
          full-stack developer. I understand the importance of perseverance and determination 
          in the face of adversity, and I am dedicated to using my skills and experiences to make a 
          positive impact in the world.
            
          </p>
        </div>
        <div className="flex flex-col w-full">
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
        </div>
        {/* <h2 data-aos="fade-up" className="font-bold text-3xl tracking-tight mb-4 mt-16 text-[#2ea6ff]">
          Top Quotes
        </h2> */}
        {/* <p className="text-gray-600 dark:text-gray-400 mb-4">
          Quotes from people about me
        </p> */}
      </div>
      {/* <div  data-aos="fade-up" className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
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
          className='w-full px-12 py-5'>
          <SplideSlide>
            <InfoCard 
            title={"Quote about Me"}
            name={"Someone"}/>
          </SplideSlide>
          <SplideSlide>
          <InfoCard 
            title={"Quote about Me"}
            name={"Someone"}/>
          </SplideSlide>
          <SplideSlide>
          <InfoCard 
            title={"Quote about Me"}
            name={"Someone"}/>
          </SplideSlide>
          <SplideSlide>
          <InfoCard 
            title={"Quote about Me"}
            name={"Someone"}/>
          </SplideSlide>
          <SplideSlide>
          <InfoCard 
            title={"Quote about Me"}
            name={"Someone"}/>
          </SplideSlide>
        </Splide>
        </div> */}
        
    </Container>
  )
}
