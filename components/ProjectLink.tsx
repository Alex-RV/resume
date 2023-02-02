import Link from 'next/link';
import cn from 'classnames';

import {urlFor} from "../sanity.config"


export default function ProjectLink({posts}) {
  return (
    
    <div className='grid-cols-2 grid gap-5 sm:grid-cols-3 mx-auto container w-full max-w-2xl justify-center items-start' >
      {posts.map(post => (
    
    <div data-aos="flip-left" data-aos-duration="1000" className='rounded-xl w-full bg-black p-[0.2rem]'>
    
    <Link
    
    key={post._id}
    href={`projects/${post.slug.current}`}
    className='transform hover:scale-[1.01] transition-all
     ease-in-out overflow-hidden'
    // className={cn(''
    // )}
  >
    <div className="flex flex-col justify-between shadow-2xl bg-white dark:bg-[#18222d] rounded-lg p-3">
      <div className="flex flex-col md:flex-col justify-between">

      <div className="relative flex ">
        <a className="absolute inset-0 z-10 bg-black text-center flex flex-col items-center justify-center opacity-0 hover:opacity-90 bg-opacity-90 duration-300">
          <h1  className="mx-auto text-[3vw] sm:text-[1.5vw] flex text-white px-1 overflow-hidden" >{post.description}</h1>
        </a>
        <div className="flex flex-wrap content-center">
          <img src={post.mainImage == null ? "/logo.jpg" : urlFor(post.mainImage.asset).url()!} className="mx-auto filter w-auto h-auto"/>
        </div>
      </div>
      
      </div>
      <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
          <h2 className="leading-7 text-[3vw] sm:text-[1.5vw] pt-1 font-medium w-full text-gray-900 dark:text-gray-300 tracking-tight">
              {post.title}
          </h2>
      </div>
    </div>
  </Link>
  
  </div>
  ))}
  </div>
     
  );
}