import cn from 'classnames';

export default function InfoCard({ title, name }) {

  return (
    <div className={cn( 
        'transform hover:scale-[1.01] transition-all',
        'rounded-xl h-full bg-black p-1'
      )}>
        <div className="flex w-full flex-col shadow-2xl bg-white dark:bg-[#18222d] h-full rounded-lg p-4">
        <div className="flex h-full flex-col md:flex-col justify-between">
            <h4 className="text-lg md:text-lg font-medium mb-6 sm:mb-10 w-full sm:w-fit text-gray-500 dark:text-gray-100 tracking-tight">
                {title}
            </h4>
        </div>
        <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
            <h2 className="text-lg md:text-lg font-medium w-full text-gray-900 dark:text-gray-500 tracking-tight">
                {name}
            </h2>
        </div>
      </div>
    </div>
      
  );
}