import { GetStaticProps } from "next";
import Image from 'next/image';
// import { parseISO, format } from 'date-fns';
import { PropsWithChildren, Suspense } from 'react';
import PortableText from "react-portable-text";

import {Post} from "../../typings" 
import Container from "../../components/Container"
import { sanityClient, urlFor} from "../../sanity.config"
import Project from "../../layouts/project";

// import Project 

interface Props{
    post: Post,
} 

function Post({post}:Props) {
    console.log(post);
  return (
    <main>
        <Project
        post={post}/>
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
        publishedAt,
        title,
        author->{
          name,
          image
        },
        description,
        mainImage,
        slug,
        body,
        githubLink,
          
      }`
    const post = await sanityClient.fetch(query, {
        slug: params?.slug,
    });

    if(!post){
        return{notFound: true};
    }
    
    return{
        props: {
            post,
        },
        revalidate: 60,
    }

}