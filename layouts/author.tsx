import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Suspense } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Link from 'next/link';

import Container from '../components/Container';
import ProjectCard from '../components/ProjectCard';
import {urlFor} from "../lib/sanity-server"


export default function author({author}) {
  const { resolvedTheme, setTheme } = useTheme();
  console.log(author.author.posts)
  return (
    <Container
      title={`${author.author.name} – Alex Riabov`}
      description="Author Info"
      type="article">
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {author.author.name == null ? "Title" : author.author.name}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2  md:items-center">
          <div className="flex items-center rotate-90">
            <Image
              alt="Alex Riabov"
              height={150}
              width={150}
              sizes="20vw"
              src={author.author.authorImage == null ? "/logo.jpg" : resolvedTheme == "dark" ? author.author.authorDarkImage : author.author.authorImage}
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {author.author.name == null ? "Alex" : author.author.name}
            </p>
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {author.author.publishedAt == null ? "Jan 1, 2023" :new Date(author.author.publishedAt).toLocaleString('en-us', { year:"numeric", month:"short",day: 'numeric'})}
            </p>
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {author.author.posts.title}
            </p>
          </div>
        </div>
        <div  data-aos="fade-up" className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <Splide
          options={ {
            type   : 'loop',
            perPage: 3,
            drag   : 'free',
            rewind: true,
            gap   : '1rem',
            autoplay: true,
            breakpoints: {
              640: {
                perPage: 1,
                width : "70%",
              },
              550: {
                perPage: 1,
                width : "50%",
              }
            }
            
          } }
          className='w-full px-12 py-5'>
          {author.author.posts.map(post => (
           <>
           {console.log("MAIN IMAGE!!!",post.mainImage)}
           <SplideSlide>
            <div style={{ backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',backgroundImage:`url(${post.mainImage == null ? "/logo.jpg" : urlFor(post.mainImage.asset).url()!})`}} className={`w-full h-full border-[0.15rem] border-[#2ea6ff] rounded-xl p-1 transform hover:scale-[1.01] transition-all`}>
            <Link
              href={`/projects/${post.slug.current}`}
            >
              <div className="flex flex-col justify-between h-full shadow-2xl  dark:bg-[#18222d] rounded-lg p-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <h4 className="text-lg md:text-lg font-medium mb-5 sm:mb-9 w-full bg-white  bg-opacity-60 text-gray-500 dark:text-gray-100 tracking-tight">
                        {post.title}
                    </h4>
                    
                </div>
                <div>
                </div>
                <div className="flex items-center bg-white  bg-opacity-60 text-gray-800 dark:text-gray-200 capsize">
                    <h2 className="text-lg md:text-lg font-medium w-full text-gray-900 dark:text-gray-500 tracking-tight">
                        {post.description}
                    </h2>
                </div>
              </div>
            </Link>
            </div>
          </SplideSlide>
           </> 
          ))}
        </Splide>
        </div>
        </article>
        </Container>
  )
}
