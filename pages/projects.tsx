import React from 'react'
import Container from '../components/Container'

function projects() {
  return (
    <Container
    title="Projects – Alex Riabov"
    description="All my projects">
        <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Projects
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">

        </p>
        </div>
    </Container>
  )
}

export default projects