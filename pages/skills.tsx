import React from 'react'
import Container from '../components/Container'
import SkillsCard from '../components/SkillsCard'

export default function Skills() {
  return (
    <Container 
    title="Skills – Alex Riabov"
    description="Languages and other">
        <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
            Skills :</h1>
          
        </div>
        <div className='flex flex-col'>
            <SkillsCard
            scale={"90%"}
            color={"red"}
            img={"/logo.jpg"}
            description={"I learned this language by 5 years"}/>
          </div>
    </Container>
  )
}