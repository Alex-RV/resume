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
export interface Author{
    _id:string;
    name: string,
    slug:{
        current:string;
    };
}
export interface Projects{
    title:string;
    mainImage:{
        asset:{
            url:string;
        };
    };
    slug:{
        current:string;
    };
    description:string;
}
