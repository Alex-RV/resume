import { GetStaticProps } from "next";
import Image from 'next/image';
// import { parseISO, format } from 'date-fns';
import { PropsWithChildren, Suspense } from 'react';

import {Post} from "../../typings" 
import Container from "../../components/Container"
import { sanityClient, urlFor} from "../../sanity.config"

// import Project 

interface Props{
    post: Post,
} 

function Post({post}:Props) {
    console.log(post);
  return (
    <main>
    <Container
      title={`${post.title} – Lee Robinson`}
      description={post.description}
    //   image={urlFor(post.mainImage).url()}
    //   date={new Date(post._createdAt).toISOString()}
      type="article"
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt="Alex Riabov"
              height={24}
              width={24}
              sizes="20vw"
              src="/avatar.jpg"
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {'Alex Riabov / '}
              {post._createdAt}
              {/* {format(parseISO(post._createdAt), 'MMMM dd, yyyy')} */}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            {/* {post.readingTime} */}
            {` • `}
          </p>
        </div>
        <Suspense fallback={null}>
          <div className="w-full mt-4 prose dark:prose-dark max-w-none">
          </div>
          <div className="mt-8">
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <a
              href={`https://mobile.twitter.com/search?q=${encodeURIComponent(
                `https://leerob.io/blog/${post.slug}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {'Discuss on Twitter'}
            </a>
            {` • `}
            <a
              href="https://github.com/leerob/leerob.io/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              {'Suggest Change'}
            </a>
          </div>
        </Suspense>
      </article>
    </Container>
    </main>
    
  );
}
export default Post;

export const getStaticPaths = async() => {
    const query = `*[_type == "post"]{
        _id,
        slug{
          current
        }
      }`;

    const posts = await sanityClient.fetch(query);

    const paths = posts.map((post: Post) => ({
        params:{
            slug: post.slug.current,
        }
    }));

    return{
        paths,
        fallback:"blocking",
    };
};

export const getStaticProps: GetStaticProps = async({params}) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createAt,
        title,
        author->{
          name,
          image
        },
        description,
        mainImage,
        slug,
        body
          
      }`
    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    });

    if(!post){
        return{
            notFound: true
        }
    }
    return{
        props: {
            post,
        },
        revalidate: 60,
    }

}