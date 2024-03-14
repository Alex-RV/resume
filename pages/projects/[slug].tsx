import { GetStaticProps, GetStaticPaths } from "next";

import {PostType} from "../../typings" 
import { sanityClient, urlFor} from "../../sanity.config"
import Project from "../../layouts/project";
import { queryProject, } from "../../lib/queries"

interface Props{
    post: PostType,
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

export const getStaticPaths : GetStaticPaths = async() => {
    const query = `*[_type == "post"]{
        _id,
        slug{
          current
        }
      }`;

    const posts = await sanityClient.fetch(query);

    const paths = posts.map((post: PostType) => ({
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
    const post = await sanityClient.fetch(queryProject, {
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