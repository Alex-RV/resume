import React, {Suspense, useState} from 'react'
import Container from '../components/Container'
import Link from 'next/link'

import ProjectLink from '../components/ProjectLink'
import { sanityClient, urlFor} from "../sanity.config"
import {Post} from "../typings"


interface Props {
  posts: [Post];
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
        <div className='grid-cols-2 grid gap-5 sm:grid-cols-3 mx-auto container w-full max-w-2xl justify-center items-start'>
          {posts.map(post => (
            <ProjectLink
            key={post._id}
            slug={`projects/${post.slug.current}`}
            file={post.mainImage == null ? "" :post.mainImage.asset}
            title={post.title}
            description={post.description}/>
          ))}
        </div>
      </div>
      
    </Container>
  );
}
export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
      title,
      slug,
      author -> {
        name,
        image,
      },
      description,
      mainImage,
      slug
  }`;
  const posts = await sanityClient.fetch(query);

  return{
    props:{
      posts,
    },
  };
};