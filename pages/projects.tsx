import React, {Suspense, useState} from 'react'
import Container from '../components/Container'
import Link from 'next/link'

import ProjectLink from '../components/ProjectLink'
import { sanityClient, urlFor} from "../sanity.config"
import {Post, Projects} from "../typings"
import { queryProject, queryProjectsTab } from '../lib/queries'


interface Props {
  posts: [Projects];
}

export default function projects({posts}: Props) {
  // console.log("POST from posts log: "+ posts.map(post => (
  //   post.slug
  // )))
  return (
    <Container
    title="Projects – Alex Riabov"
    description="All my projects">
        <div className="flex flex-col justify-start items-start max-w-2xl w-full mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-16 text-black dark:text-white">
          Projects :
        </h1>
            <ProjectLink
            posts={posts}
            />
      </div>
      
    </Container>
  );
}
export const getServerSideProps = async () => {
  
  const posts = await sanityClient.fetch(queryProjectsTab);

  return{
    props:{
      posts,
    },
  };
};