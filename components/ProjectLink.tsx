import Link from 'next/link';
import cn from 'classnames';
import Image from 'next/image';
import { urlFor } from '../sanity.config';


export default function ProjectLink({slug, file, title, description}) {
  return (
    <div data-aos="flip-left" data-aos-duration="1000" >
    <div className='transform hover:scale-[1.01] transition-all
    rounded-xl w-full bg-black p-[0.2rem] ease-in-out overflow-hidden'>
    <Link
    href={slug}
    className={cn(''
    )}
  >
    <div className="flex flex-col justify-between shadow-2xl bg-white dark:bg-[#18222d] rounded-lg p-3">
      <div className="flex flex-col md:flex-col justify-between">

      <div className="relative flex ">
        <a className="absolute inset-0 z-10 bg-black text-center flex flex-col items-center justify-center opacity-0 hover:opacity-90 bg-opacity-90 duration-300">
          <h1  className="mx-auto text-[3vw] sm:text-[1.5vw] flex text-white px-1 overflow-hidden" >{description}</h1>
        </a>
        <div className="flex flex-wrap content-center">
          <img src={file == "" ? "/logo.jpg" : urlFor(file).url()!} alt={file} className="mx-auto filter w-auto h-auto"/>
        </div>
      </div>
      
      </div>
      <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
          <h2 className="leading-7 text-[3vw] sm:text-[1.5vw] pt-1 font-medium w-full text-gray-900 dark:text-gray-300 tracking-tight">
              {title}
          </h2>
      </div>
    </div>
  </Link>
  </div>
  </div>
     
  );
}