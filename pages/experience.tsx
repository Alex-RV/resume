import React from 'react'

import ExperienceCard from '../components/ExperienceCard'
import Experience from '../components/Experience'
import Container from '../components/Container'

export default function experience() {
  return (
    <Container
    title="Projects – Alex Riabov"
    description="Experience">
        <div className="flex flex-col max-w-2xl w-full mx-auto">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-16 text-black dark:text-white">
          Experience :
        </h1>
        <Experience>
        <ExperienceCard
          title={"Hackathon"}
          letter={"terminal"}
          name={"Online Git-Init"}
          date={"Jan 2022"}
          description={"Online Git Init"}/>
        <ExperienceCard
          title={"CodeNext Club Part II"}
          letter={"code"}
          name={"Unity"}
          date={"Jan 2022 - Jan 2022"}
          description={"Game Development on Unity(C#)"}/>
          <ExperienceCard
          title={"CodeNext Club"}
          letter={"code"}
          name={"3D Modeling"}
          date={"Jan 2023 - Mar 2023"}
          description={"Club about 3D modeling"}/>
          <ExperienceCard
          title={"Hackathon"}
          letter={"terminal"}
          name={"EPOCH"}
          date={"Dec 31 2022"}
          description={"Hackathon in the end of year. Provided by HackClub"}/>
          <ExperienceCard
          title={"CodeNext Club Part I"}
          letter={"code"}
          name={"Unity"}
          date={"Sep 2022 - Dec 2022"}
          description={"Game Development on Unity(C#)"}/>
          <ExperienceCard
          title={"CodeNext Club"}
          letter={"code"}
          name={"IOS Development"}
          date={"Sep 2022 - Dec 2022"}
          description={"Development on Swift for the IOS in Xcode"}/>
          <ExperienceCard
          title={"Hackathon"}
          letter={"terminal"}
          name={"Google 5th Annual Hackathon"}
          date={"26 Aug 2022 - 30 Aug 2022"}
          description={"Participated in Google Hackathon after summer program"}/>
          <ExperienceCard
          title={"CodeNext Program"}
          letter={"code"}
          name={"TeamEdge"}
          date={"Jun 25 2022"}
          description={"Joined Google CodeNext Summer Program"}/>
          <ExperienceCard
          title={"School"}
          letter={"school"}
          name={"School San Leandro"}
          date={"Feb 2022 - Jun 2023"}
          description={"My second school"}/>
          <ExperienceCard
          title={"Shcool"}
          letter={"school"}
          name={"Samara School"}
          date={"Sep 2012 - Feb 2022"}
          description={"I've been in this shool during whole my life"}/>
          
        </Experience>
      </div>
      
    </Container>
  )
}
