export const queryProject = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    publishedAt,
    title,
    author->{
      name,
      image,
      slug,
    },
    description,
    mainImage,
    slug,
    body,
    githubLink,
      
  }`;

export const queryProjectsTab = ` *[_type == "post"] {
    title,
    description,
    mainImage,
    slug,
  }`;

  export const queryProjectImageUrl = `*[_type == "post"] {
    title,
    description,
    mainImage{
      asset->{url}
    }
  }`;

  export const queryAuthor = `*[_type == "author"]{
    name,
    slug,
    "authorImage": image.asset->url,
  }`
  export const queryAuthorPage = `*[_type == "author"]{
    name,
    bio,
    "authorImage": image.asset->url,
    "posts": *[_type == "post" && author._ref in *[_type=="author" && name == name ]._id ]{
      title,
      "slug": slug.current,
    }
  }`
 