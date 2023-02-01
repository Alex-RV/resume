import React from 'react'

import Container from '../components/Container'
import SkillsCard from '../components/SkillsCard'

export default function Skills() {
  const back_end = "#2ea6ff";
  const web = "#01796F";
  return (
    <Container 
    title="Skills – Alex Riabov"
    description="Languages and skills">
      <div className="flex flex-col justify-start items-start max-w-2xl w-full mx-auto mb-16">
      <div className='flex flex-col max-w-2xl w-full mx-auto'>
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
            Professional Skills :</h1>
            <p className="text-xl tracking-tight mb-4 text-black dark:text-white">
          The percentages below are representative of my proficiency in each skill
        </p>
      </div>
      </div>
      <div className='flex flex-col'>
            <SkillsCard
            scale={"90%"}
            color={back_end}
            img={"skills/python-icon.svg"}
            description={"Python"}/>
            <SkillsCard
            scale={"80%"}
            color={back_end}
            img={"skills/java-icon.svg"}
            description={"Java"}/>
            <SkillsCard
            scale={"90%"}
            color={back_end}
            img={"skills/c-icon.svg"}
            description={"C#"}/>
            <SkillsCard
            scale={"60%"}
            color={back_end}
            img={"skills/swift-icon.svg"}
            description={"Swift"}/>
            <SkillsCard
            scale={"80%"}
            color={back_end}
            img={"skills/firebase-icon.svg"}
            description={"Firebase"}/>
            <SkillsCard
            scale={"60%"}
            color={web}
            img={"skills/typescript-icon.svg"}
            description={"TypeScript"}/>
            <SkillsCard
            scale={"70%"}
            color={web}
            img={"skills/javascript-icon.svg"}
            description={"JavaScript"}/>
            <SkillsCard
            scale={"80%"}
            color={web}
            img={"skills/nextjs-icon.svg"}
            description={"NexJS"}/>
            <SkillsCard
            scale={"80%"}
            color={web}
            img={"skills/react-icon.svg"}
            description={"React"}/>
            <SkillsCard
            scale={"70%"}
            color={web}
            img={"skills/tailwind-icon.svg"}
            description={"TailWind"}/>
            <SkillsCard
            scale={"30%"}
            color={back_end}
            img={"skills/c-plus-icon.svg"}
            description={"C++"}/>
      </div>
        
    </Container>
  )
}