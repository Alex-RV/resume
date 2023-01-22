import Link from 'next/link';
import useSWR from 'swr';
import cn from 'classnames';
import Image from 'next/image';


export default function ProjectLink({slug, file, title, description}) {
  return (
    <Link
    href={`/projects/${slug}`}
    className={cn(
      'transform hover:scale-[1.01] transition-all',
      'rounded-xl w-full bg-black p-1 m-5 mx-5'
    )}
  >
    <div className="flex flex-col justify-between h-full shadow-2xl bg-white dark:bg-[#18222d] rounded-lg p-4">
      <div className="flex flex-col md:flex-col justify-between">

      <div className="relative ">
        <a className="absolute inset-0 z-10 bg-black text-center flex flex-col items-center justify-center opacity-0 hover:opacity-100 bg-opacity-90 duration-300">
          <h1  className="mx-auto text-white" >{description}</h1>
        </a>
        <div className="flex flex-wrap content-center">
          <img src={file} alt={file} className="mx-auto filter w-auto h-auto"/>
        </div>
      </div>
      
      </div>
      <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
          <h2 className="text-lg md:text-lg font-medium w-full text-gray-900 dark:text-gray-300 tracking-tight">
              {title}
          </h2>
      </div>
    </div>
  </Link>
    
     
  );
}