import Image from 'next/image';
import { Suspense } from 'react';
import Container from '../components/Container';


export default function author({author}) {
  console.log(author)
  return (
    <Container
      title={`${author.name} – Alex Riabov`}
      // description={post.description == null ? "Description" : post.description}
      type="article">
      {/* <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title == null ? "Title" : post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2  md:items-center">
          <div className="flex items-center rotate-90"> */}
            {/* <Image
              alt="Alex Riabov"
              height={24}
              width={24}
              sizes="20vw"
              src={post.author == null ? "/logo.jpg" : urlFor(post.author.image).url()}
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {post.author == null ? "Alex" : post.author.name}
            </p>
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {post.publishedAt == null ? "Jan 1, 2023" :new Date(post.publishedAt).toLocaleString('en-us', { year:"numeric", month:"short",day: 'numeric'})}
            </p> */}
          {/* </div>
        </div>
        </article> */}
        </Container>
  )
}
