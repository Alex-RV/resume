import { GetStaticProps } from "next";

import { Author} from "../../typings" 
import { sanityClient, urlFor} from "../../sanity.config"
import AuthorPage from "../../layouts/author";
import { queryProject, queryAuthorPage, queryAuthor} from "../../lib/queries"

interface Props{
    author: Author,
} 

function Author({author}:Props) {
  return (
    <main>
        <AuthorPage
        author={author}/>
    </main>
    
  );
}
export default Author

export const getStaticPaths = async() => {

    const authors = await sanityClient.fetch(queryAuthor);
    console.log("Authors!!!!",authors)
    const paths = authors.map((author: Author) => ({
        params:{
            slug: author.slug.current
        }
    }));

    return{
        paths,
        fallback:"blocking",
    };
};

export const getStaticProps: GetStaticProps = async({params}) => {
    const author = await sanityClient.fetch(queryAuthorPage, {
        slug: params?.slug,
    });

    if(!author){
        return{notFound: true};
    }
    
    return{
        props: {
            author,
        },
        revalidate: 60,
    }

}