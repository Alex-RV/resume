import Link from 'next/link';
import useSWR from 'swr';
import cn from 'classnames';

export default function ProjectCard({ title, slug, name }) {

  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        'transform hover:scale-[1.01] transition-all',
        'rounded-xl w-full md:w-1/3 bg-black p-1'
      )}
    >
      <div className="flex flex-col justify-between h-full bg-white dark:bg-gray-800 rounded-lg p-4">
        <div className="flex flex-col md:flex-col justify-between">
            <h4 className="text-lg md:text-lg font-medium mb-6 sm:mb-10 w-full text-gray-900 dark:text-gray-100 tracking-tight">
                {title}
            </h4>
            
        </div>
        <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
            <h2 className="text-lg md:text-lg font-medium w-full text-gray-900 dark:text-gray-500 tracking-tight">
                {name}
            </h2>
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg> */}
        </div>
      </div>
    </Link>
  );
}