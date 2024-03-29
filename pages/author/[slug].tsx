import { GetStaticProps, GetStaticPaths } from "next";

import { AuthorType} from "../../typings" 
import { sanityClient, urlFor, getClient} from "../../sanity.config"
import AuthorPage from "../../layouts/author";
import { queryProject, queryAuthorPage, queryAuthor} from "../../lib/queries"

interface Props{
    author: AuthorType,
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

export const getStaticPaths: GetStaticPaths = async() => {
    const query = `*[_type == "author"]{
        _id,
          slug{current},
      }`;
    const authors = await sanityClient.fetch(query);
    const paths = authors.map((author: AuthorType) => ({
        params:{
            slug: author.slug.current
        }
    }));
    return{
        paths,
        fallback:"blocking",
    };
};

export const getStaticProps: GetStaticProps = async({ params, preview = false }) => {
    const author = await getClient(preview).fetch(queryAuthorPage, {
        slug: params?.slug
      });
    
      if (!author) {
        return { notFound: true };
      }
    
    return{
        props: {
            author:{
                ...author
            }
        },
    }

}