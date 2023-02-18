import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Suspense } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Link from 'next/link';
import BlockContent from '@sanity/block-content-to-react';

import Container from '../components/Container';
import ProjectCard from '../components/ProjectCard';
import {urlFor} from "../sanity.config"
import { serializers } from '../lib/serializers'

export default function author({author}) {
  const { resolvedTheme, setTheme } = useTheme();
  const formattedDate = new Date(author.author.publishedAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  console.log(author.author);
  const authorImage = author.author?.authorImage || "/logo.jpg";
  const authorImageDarkTheme = author.author?.authorDarkImage || authorImage;
  return (
    <Container
      title={`${author.author.name} – Alex Riabov`}
      description="Author Info"
      type="article">
      <div className="flex flex-col items-center justify-center max-w-2xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={resolvedTheme == "dark"? authorImageDarkTheme : authorImage}
          alt={`${author.author.name}'s photo`}
          width={150}
          height={150}
          className="rounded-full"
        />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 text-center">
          {author.author.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
        {author.author.publishedAt == null ? "Jan 1, 2023" : formattedDate}
        </p>
      </div>
      <div className="mt-10 prose prose-indigo prose-lg text-gray-500 dark:text-gray-400">
        <BlockContent blocks={author.author.bio} serializers={serializers} />
      </div>
      <div className='w-full px-12 sm:px-0 py-5 justify-center mx-auto'>
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
                arrows: false,
              }
            }
            
          } }
          className='w-full justify-center mx-auto'
          >
          {author.author.posts.map(post => (
           <>
           <SplideSlide>
            <div style={{ backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            // backgroundImage:`url(${post.mainImage == null ? "/logo.jpg" : urlFor(post.mainImage.asset).url()!})`
          }} 
            className={`w-full h-full min-w-max border-[0.15rem] border-[#2ea6ff] rounded-xl p-1 `}>
              <Link href={`/projects/${post.slug.current}`} >
              <div className="relative flex rounded-xl transform hover:scale-[1.01] transition-all">
              <a className="absolute inset-0 z-10 rounded-xl bg-black text-center flex flex-col items-center justify-center opacity-0 hover:opacity-90 bg-opacity-90 duration-300">
                <h1  className="mx-auto text-[3vw] sm:text-[1.5vw] flex text-white p-1 overflow-hidden" >{post.description == null ? "Description" : post.description}</h1>
              </a>
              <div className="flex flex-wrap content-center">
                <img alt={post.slug} src={post.mainImage == null ? "/logo.jpg" : urlFor(post.mainImage.asset).url()!} className="mx-auto filter w-auto h-auto rounded-xl "/>
              </div>
            </div>
              </Link>
            </div>
          </SplideSlide>
           </> 
          ))}
        </Splide>
        </div>
    </div>
        </Container>
  )
}
