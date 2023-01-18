import Link from 'next/link';
import useSWR from 'swr';
import cn from 'classnames';


export default function ProjectLink({slug, file}) {
  return (
    <div className='w-full'>
        <Link
      href={`/projects/${slug}`}
    >
    <div className=" flex flex-col justify-betwee h-full shadow-2xl rounded-lg p-4">
        <div>
        <img src={file} alt={file}/>
        </div>
    </div>
    </Link>
    </div>
    
     
  );
}