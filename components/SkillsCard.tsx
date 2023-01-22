import React, {useEffect} from 'react'
import Image from 'next/image';


export default function SkillsCard({scale, color, description, img}) {
  return (
    <div className='flex flex-row rounded-2xl mb-10 mx-auto bg-gray-200 dark:bg-slate-600 max-w-2xl w-full'>
        <div className='flex p-4 items-center bg-cover bg-center bg-no-repeat'>
        <Image
                alt="IMG"
                height={50}
                width={50}
                src={img}
                priority
                className="rounded-full filter"
              />
        </div>
        <div className='flex flex-col w-full'>
        <div className='flex bg-gray-300 dark:bg-slate-500 rounded-2xl mt-2 mx-2' >
            <div style={{width:scale, backgroundColor:color}} className='flex p-2 rounded-2xl'/>
        </div> 
        
            <div className='flex p-3 text-black dark:text-white'>
                {description}
            </div>
        </div>
    </div>
  );
}
