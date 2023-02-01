import Image from 'next/image';
import { Suspense } from 'react';
import PortableText from "react-portable-text";

import Container from '../components/Container';
import { urlFor } from '../sanity.config';
import { useTheme } from 'next-themes';

export default function Project({post}) {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Container
      title={`${post.title} – Alex Riabov`}
      description={post.description}
      type="article"
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2  md:items-center">
          <div className="flex items-center rotate-90">
            <Image
              alt="Alex Riabov"
              height={24}
              width={24}
              sizes="20vw"
              src={urlFor(post.author.image).url()}
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {post.author.name}
            </p>
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            {new Date(post.publishedAt).toLocaleString('en-us', { year:"numeric", month:"short",day: 'numeric'})}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
          </p>
          <div className="mt-10 text-black dark:text-white">
          
            <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
                h1: (props) => <h1  
                style={resolvedTheme == "dark" ? 
                {color:"white", marginTop: '2rem', fontWeight: 'bold', fontSize: "2rem",}:
                {color:"black", marginTop: '2rem', fontWeight: 'bold', fontSize: "2rem", }} {...props} />,
                h2: (props) => <h2  
                style={resolvedTheme == "dark" ? 
                {color:"white", marginTop: '2rem', fontWeight: 'bold', fontSize: "1.5rem",}:
                {color:"black", marginTop: '2rem', fontWeight: 'bold', fontSize: "1.5rem", }} {...props} />,
                // h2: (props) => <h2 className='text-2xl font-bold my-5 text-black dark:text-white' {...props} />,
                li: (children: any)  =>(
                    <li className="ml-4 list-disc text-black dark:text-white">{children}</li>
                ),
                link: ({children, href}: any)  =>(
                    <a href={href} className="text-blue-600 hover:underline">
                        {children}
                    </a>
                ),
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
              href="/"
              // target="_blank"
              // rel="noopener noreferrer"
            >
              {'Contact me'}
            </a>
            {` • `}
            <a
              href={post.githubLink == null ? "" : post.githubLink.current}
              target="_blank"
              // rel="noopener noreferrer"
            >
              {'Suggest Change'}
            </a>
          </div>
        </Suspense>
      </article>
    </Container>
  );
}