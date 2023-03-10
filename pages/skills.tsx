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
      </div>
      </div>
      <div className='flex flex-col'>
            <SkillsCard
            scale={"90%"}
            level={"Proficient"}
            color={back_end}
            img={"static/images/skills/python-icon.svg"}
            description={"Python"}/>
            <SkillsCard
            scale={"80%"}
            level={"Advanced"}
            color={back_end}
            img={"static/images/skills/java-icon.svg"}
            description={"Java"}/>
            <SkillsCard
            scale={"90%"}
            level={"Proficient"}
            color={back_end}
            img={"static/images/skills/c-icon.svg"}
            description={"C#"}/>
            <SkillsCard
            scale={"60%"}
            level={"Intermediate"}
            color={back_end}
            img={"static/images/skills/swift-icon.svg"}
            description={"Swift"}/>
            <SkillsCard
            scale={"80%"}
            level={"Advanced"}
            color={back_end}
            img={"static/images/skills/firebase-icon.svg"}
            description={"Firebase"}/>
            <SkillsCard
            scale={"60%"}
            level={"Intermediate"}
            color={web}
            img={"static/images/skills/typescript-icon.svg"}
            description={"TypeScript"}/>
            <SkillsCard
            scale={"70%"}
            level={"Intermediate"}
            color={web}
            img={"static/images/skills/javascript-icon.svg"}
            description={"JavaScript"}/>
            <SkillsCard
            scale={"80%"}
            level={"Advanced"}
            color={web}
            img={"static/images/skills/nextjs-icon.svg"}
            description={"NexJS"}/>
            <SkillsCard
            scale={"80%"}
            level={"Advanced"}
            color={web}
            img={"static/images/skills/react-icon.svg"}
            description={"React"}/>
            <SkillsCard
            scale={"70%"}
            level={"Intermediate"}
            color={web}
            img={"static/images/skills/tailwind-icon.svg"}
            description={"TailWind"}/>
            <SkillsCard
            scale={"30%"}
            level={"Beginer"}
            color={back_end}
            img={"static/images/skills/c-plus-icon.svg"}
            description={"C++"}/>
      </div>
        
    </Container>
  )
}