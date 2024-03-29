import React, {Suspense, useState} from 'react'
import Container from '../components/Container'
import Link from 'next/link'

import ProjectLink from '../components/ProjectLink'
import { sanityClient, urlFor} from "../sanity.config"
import {PostType, Projects} from "../typings"
import { queryProject, queryProjectsTab } from '../lib/queries'
import LoadingScreen from '../components/LoadingScreen'
import { InferGetStaticPropsType } from 'next'

export default function projects({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
      <Container
    title="Projects – Alex Riabov"
    description="All my projects">
        <div className="flex flex-col justify-start items-start max-w-2xl w-full mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-16 text-black dark:text-white">
          Projects :
        </h1>
        <Suspense fallback={<p>Loading feed...</p>}>
        <ProjectLink
            posts={posts}
            />
        </Suspense>
      </div>
    </Container>
    
  );
}
export async function getStaticProps({ preview = false }) {
  const posts: PostType[] = await sanityClient.fetch(queryProjectsTab);
  return { props: { posts } };
}