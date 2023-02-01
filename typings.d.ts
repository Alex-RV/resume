export interface Post{
    _id:string;
    publishedAt:string;
    title:string;
    author: {
        name:string;
        image:string;
    }
    description:string;
    mainImage:{
        asset:{
            url:string;
        };
    };
    slug:{
        current:string;
    };
    githubLink:{
        current:string;
    };
    body:[object];
}