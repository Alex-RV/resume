import React from 'react'

import ExperienceCard from '../components/ExperienceCard'
import Experience from '../components/Experience'
import Container from '../components/Container'
import Link from 'next/link'

export default function experience() {
  return (
    <Container
    title="Experience – Alex Riabov"
    description="Experience">
        <div className="flex flex-col max-w-2xl w-full mx-auto">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-16 text-black dark:text-white">
          Experience :
        </h1>
        <Experience>
        <ExperienceCard
          title={"Lancer Hacks"}
          letter={"terminal"}
          name={"Hackathon"}
          date={"Feb 11 2023"}
          description={`Hackathon on the theme "Upside Down" with Major League Hacking. Me and my team create Elgoog`}/>
        <ExperienceCard
          title={"Unity Part II"}
          letter={"code"}
          name={"CodeNext Club"}
          date={"Jan 2023 - Apr 2023"}
          description={"Game Development on Unity(C#)"}/>
          <ExperienceCard
          title={"3D Modeling"}
          letter={"code"}
          name={"CodeNext Club"}
          date={"Jan 2023 - Mar 2023"}
          description={"Club about 3D modeling"}/>
          <ExperienceCard
          title={"Git-Init"}
          letter={"terminal"}
          name={"Online Hackathon"}
          date={"Jan 2023"}
          description={"Created game and website to help people understand importance of mental health and how mental problems feels for people"}/>
          <ExperienceCard
          title={"EPOCH"}
          letter={"terminal"}
          name={"Hackathon"}
          date={"Dec 31 2022"}
          description={"Hackathon in the end of year when we created memeware. Provided by HackClub"}/>
          <ExperienceCard
          title={"Unity Part I"}
          letter={"code"}
          name={"CodeNext Club"}
          date={"Sep 2022 - Dec 2022"}
          description={"Game Development on Unity(C#)"}/>
          <ExperienceCard
          title={"IOS Development"}
          letter={"code"}
          name={"CodeNext Club"}
          date={"Sep 2022 - Dec 2022"}
          description={"Development on Swift for the IOS in Xcode"}/>
          <ExperienceCard
          title={"Hackathon"}
          letter={"terminal"}
          name={"Google 5th Annual Hackathon"}
          date={"26 Aug 2022 - 30 Aug 2022"}
          description={"Participated in Google Hackathon after Team Edge, won 2nd place"}/>
          <ExperienceCard
          title={"Google CodeNext"}
          letter={"code"}
          name={"TeamEdge"}
          date={"Jun 25 2022"}
          description={"Google CodeNext Summer Program (5 weeks, 5 days a week, 8 hours per day)"}/>
          <ExperienceCard
          title={"School"}
          letter={"school"}
          name={"School San Leandro"}
          date={"Feb 2022 - Jun 2023"}
          description={"Public School in San Leandro"}/>
          <ExperienceCard
          title={"Intership"}
          letter={"code"}
          name={"Russian Railways Software"}
          date={"Aug 11 2021 - Sep 1 2021"}
          description={"Work experience with .NET Core on C#"}/>
          <ExperienceCard
          title={"School"}
          letter={"school"}
          name={"Samara School"}
          date={"Sep 2012 - Feb 2022"}
          description={"Samara Technical Lyceum (School with Math and Physics major)"}/>
          
        </Experience>
      </div>
      
    </Container>
  )
}
