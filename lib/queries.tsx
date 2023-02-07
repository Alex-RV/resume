export const queryProject = `*[_type == "post"]{
    _id,
      title,
      slug,
      author -> {
        name,
        image,
      },
      description,
      mainImage,
      slug
  }`;

export const queryProjectsTab = `*[_type == "post"]{
      title,
      slug,
      description,
      mainImage,
      slug
  }`;