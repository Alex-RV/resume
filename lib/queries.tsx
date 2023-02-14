export const queryProject = `*[_type == "post" && slug.current == $slug][0]{
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
 