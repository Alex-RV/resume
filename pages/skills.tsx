import React from 'react'

import Container from '../components/Container'
import SkillsCard from '../components/SkillsCard'

export default function Skills() {
  return (
    <Container 
    title="Skills – Alex Riabov"
    description="Languages and other">
      <div className="flex flex-col justify-start items-start max-w-2xl w-full mx-auto mb-16">
      <div className='flex flex-col max-w-2xl w-full mx-auto'>
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
            Professional Skills :</h1>
        </div>
      </div>
      <div className='flex flex-col'>
            <SkillsCard
            scale={"90%"}
            color={"#3AA8C1"}
            img={"https://www.vectorlogo.zone/logos/python/python-icon.svg"}
            description={"Python"}/>
            <SkillsCard
            scale={"80%"}
            color={"#3AA8C1"}
            img={"https://www.vectorlogo.zone/logos/java/java-icon.svg"}
            description={"Java"}/>
            <SkillsCard
            scale={"60%"}
            color={"#3AA8C1"}
            img={"https://cdn.cdnlogo.com/logos/c/27/c.svg"}
            description={"C#"}/>
            <SkillsCard
            scale={"60%"}
            color={"#01796F"}
            img={"https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg"}
            description={"TypeScript"}/>
            <SkillsCard
            scale={"60%"}
            color={"#01796F"}
            img={"https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg"}
            description={"JavaScript"}/>
            <SkillsCard
            scale={"60%"}
            color={"#01796F"}
            img={"https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"}
            description={"NexJS"}/>
            <SkillsCard
            scale={"60%"}
            color={"#01796F"}
            img={"https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"}
            description={"React"}/>
            <SkillsCard
            scale={"60%"}
            color={"#01796F"}
            img={"https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"}
            description={"TailWind"}/>
      </div>
        
    </Container>
  )
}