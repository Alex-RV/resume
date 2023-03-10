import Link from 'next/link';
import useSWR from 'swr';
import cn from 'classnames';

export default function ProjectCard({ title, slug, name }) {

  return (
    <div className='w-full border-[0.15rem] border-[#2ea6ff] rounded-xl p-1 transform hover:scale-[1.01] transition-all'>
    <Link
      href={`/projects/${slug}`}
      className={cn(
        // 'transform hover:scale-[1.01] transition-all',
        // 'rounded-xl w-full md:w-1/3 p-1'
      )}
    >
      <div className="flex flex-col justify-between h-full shadow-2xl bg-white dark:bg-[#18222d] rounded-lg p-4">
        <div className="flex flex-col md:flex-row justify-between">
            <h4 className="text-lg md:text-lg font-medium mb-5 sm:mb-9 w-full text-gray-500 dark:text-gray-100 tracking-tight">
                {title}
            </h4>
            
        </div>
        <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
            <h2 className="text-lg md:text-lg font-medium w-full text-gray-900 dark:text-gray-500 tracking-tight">
                {name}
            </h2>
        </div>
      </div>
    </Link>
    </div>
  );
}