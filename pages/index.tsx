import React, {useState} from "react"
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { Suspense } from 'react';


import Container from '../components/Container'
import ProjectCard from '../components/ProjectCard';
import ContactForm from "../components/ContactForm"


// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Suspense fallback={null}>
      <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
          <div className="flex flex-col-reverse sm:flex-row items-start mb-8">
            <div className="flex flex-col pr-8">
              <h1 className="font-bold text-5xl md:text-7xl tracking-tight mb-1 text-black dark:text-white">
                Alex Riabov
              </h1>
              <h2 className="text-gray-700 dark:text-gray-200 mb-4 text-2xl">
                Full-stack developer. <br/>Student-Engineer at {' '}
                <span className="font-semibold">Google Code Next</span>
              </h2>
              <p className="text-gray-600 text-xl dark:text-gray-400 mb-16">
                Coder, full-stack developer focused on back-end development. 
              </p>
            </div>
            <div className="w-[80px] sm:w-[250px] relative mb-8 sm:mb-0 mr-auto">
              <Image
                alt="Alex Riabov"
                height={250}
                width={250}
                src="/avatar.jpg"
                sizes="30vw"
                priority
                className="rounded-full filter grayscale"
              />
            </div>
          </div>
            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-black dark:text-white">
              Most poular projects
            </h3>
            <div className="flex gap-6 flex-col md:flex-row">
              <ProjectCard
                title="Everything I Know About Style Guides, Design Systems, and Component Libraries"
                slug="style-guides-component-libraries-design-systems"
                name="AI game on Raspberry PI"
              />
              <ProjectCard
                title="Rust Is The Future of JavaScript Infrastructure"
                slug="rust"
                name="AI game on Raspberry PI"
              />
              <ProjectCard
                title="Past, Present, and Future of React State Management"
                slug="react-state-management"
                name="AI game on Raspberry PI"
              />
            </div>
            <Link
            href="/projects"
            className="flex items-center mt-8 mb-14 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6"
          >
            <>
              {'See all projects'}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 ml-1"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
                />
              </svg>
            </>
          </Link>
          <ContactForm/>
          </div>
      </Container>
    </Suspense>
    
      
  )
}
