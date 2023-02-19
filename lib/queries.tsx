export const queryProject = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    publishedAt,
    title,
    author->{
      name,
      image,
      imageDarkTheme,
      slug,
    },
    description,
    mainImage,
    slug,
    body,
    githubLink,
      
  }`;

export const postSlugsQuery = `
  *[_type == "post" && defined(slug.current)][].slug.current
  `;

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
  }`;
var _id = '';
  export const queryAuthorPage = `{
    "author": *[_type == "author" && slug.current == $slug] | order(_updatedAt desc) [0] {
    _id,
    name,
    "authorImage": image.asset->url,
    "authorDarkImage": imageDarkTheme.asset->url,
    bio,
    "slug": slug.current, 
    "posts": *[_type == 'post' && references(^._id)]{
      _id,
      title,
      description,
      mainImage,
      slug,
    },
    }
  }`
  // "mainImage": mainImage.asset->{url},