import Link from 'next/link';
import useSWR from 'swr';
import cn from 'classnames';


export default function ProjectLink({slug}) {
  return (
    <Link
      href={`/projects/${slug}`}
      className={cn(
        'transform hover:scale-[1.01] transition-all',
        'rounded-xl w-full md:w-1/3 p-1'
      )}
    >
    <div className="flex flex-col justify-betwee h-full shadow-2xl rounded-lg p-4">
        <div>
        <img src={slug} alt={slug}/>
        </div>
    </div>
    </Link>
     
  );
}