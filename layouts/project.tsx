import Image from 'next/image';
import { Suspense } from 'react';
import PortableText from "react-portable-text";

import Container from '../components/Container';
import { urlFor } from '../lib/sanity-server';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Project({post}) {
  console.log(post)
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Container
      title={`${post.title} – Alex Riabov`}
      description={post.description == null ? "Description" : post.description}
      type="article">
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title == null ? "Title" : post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2  md:items-center">
          <Link href={`../author/${post.author.slug.current}`}>
          <div className="flex items-center rotate-90">
            <Image
              alt="Alex Riabov"
              height={32}
              width={32}
              sizes="20vw"
              src={post.author == null ? "/logo.jpg" : resolvedTheme == "dark" ? post.author.imageDarkTheme == null ? urlFor(post.author.image).url() : urlFor(post.author.imageDarkTheme).url() : urlFor(post.author.image).url()}
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {post.author == null ? "Alex" : post.author.name}
            </p>
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {post.publishedAt == null ? "Jan 1, 2023" :new Date(post.publishedAt).toLocaleString('en-us', { year:"numeric", month:"short",day: 'numeric'})}
            </p>
          </div>
          </Link>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
          </p>
          <div className="mt-10 text-black dark:text-white">
          
            <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body == null ? "No content yet" : post.body}
            serializers={{
                h1: (props) => <h1  
                style={resolvedTheme == "dark" ? 
                {color:"white", marginTop: '2rem', fontWeight: 'bold', fontSize: "2rem",}:
                {color:"black", marginTop: '2rem', fontWeight: 'bold', fontSize: "2rem", }} {...props} />,
                h2: (props) => <h2  
                style={resolvedTheme == "dark" ? 
                {color:"white", marginTop: '2rem', fontWeight: 'bold', fontSize: "1.5rem",}:
                {color:"black", marginTop: '2rem', fontWeight: 'bold', fontSize: "1.5rem", }} {...props} />,
                h3: (props) => <text  
                style={resolvedTheme == "dark" ? 
                {color:"white", marginTop: '2rem', fontWeight: 'bold'}:
                {color:"black", marginTop: '2rem', fontWeight: 'bold'}} {...props} />,
                h4: (props) => <h4  
                style={resolvedTheme == "dark" ? 
                {color:"white", marginTop: '2rem', fontWeight: 'bold', fontSize: "1rem",}:
                {color:"black", marginTop: '2rem', fontWeight: 'bold', fontSize: "1rem", }} {...props} />,
                ColorText: (props) => <h4  
                style={resolvedTheme == "dark" ? 
                {color:"red", marginTop: '2rem', fontWeight: 'bold', fontSize: "2rem",}:
                {color:"red", marginTop: '2rem', fontWeight: 'bold', fontSize: "2rem", }} {...props} />,
                // h2: (props) => <h2 className='text-2xl font-bold my-5 text-black dark:text-white' {...props} />,
                li: (props) => <li  
                style={resolvedTheme == "dark" ? 
                {color:"white",listStyleType: "disc", marginLeft:"1rem", marginTop: '2rem', }:
                {color:"black",listStyleType: "disc", marginLeft:"1rem", marginTop: '2rem', }} {...props} />,
                normal: (props) => <p  
                style={resolvedTheme == "dark" ? 
                {color:"white", marginTop: '0.5rem', fontSize: "1rem",}:
                {color:"black", marginTop: '0.5rem', fontSize: "1rem",}} {...props} />,
                blockquote: (props) =>
                <blockquote 
                className='my-4'
                style={resolvedTheme == "dark" ? 
                {color:"white", fontStyle: "italic", fontWeight: 500, borderLeftWidth: "4px", borderColor:"gray", padding:"1rem", backgroundColor:"#343434", fontSize: "1rem",}:
                {color:"black", fontStyle: "italic", fontWeight: 500, borderLeftWidth: "4px", borderColor:"gray", padding:"1rem", backgroundColor:"#DCDCDC", fontSize: "1rem",}} {...props} />,
                link: (props,href) => <a
                target="_blank"
                rel="noopener noreferrer"
                href={href} 
                style={resolvedTheme == "dark" ? 
                {color:"#2ea6ff",listStyleType: "disc",  marginTop: '2rem', }:
                {color:"#2ea6ff",listStyleType: "disc", marginTop: '2rem', }} {...props} />,
                // image: (props,asset) => <figure className='rounded-full' src={asset._ref} {...props} />
            }}/>
          </div>
        </div>
        
        <Suspense fallback={null}>
          <div className="w-full mt-4 prose dark:prose-dark max-w-none">
          </div>
          <div className="mt-8">
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <a
              href="/#contactForm"
              // target="_blank"
              // rel="noopener noreferrer"
            >
              {'Contact me'}
            </a>
            {` • `}
            <a
              href={post.githubLink == null ? "https://github.com/Alex-RV" : post.githubLink.current}
              target="_blank"
              rel="noopener noreferrer"
            >
              {'Suggest Change'}
            </a>
          </div>
        </Suspense>
      </article>
    </Container>
  );
}
