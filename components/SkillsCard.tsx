import React, {useEffect} from 'react'
import Image from 'next/image';


export default function SkillsCard({scale, color, description, img}) {
  return (
    <div className='flex flex-row rounded-2xl mb-10 mx-auto bg-gray-200 dark:bg-slate-600 max-w-2xl w-full'>
        <div style={{}} className='flex p-4 items-center'>
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
        <div style={{width:scale, backgroundColor:color}} className='flex p-2 m-1 mt-2 mx-2 rounded-lg'/> 
            <div className='flex p-3'>
                {description}
            </div>
        </div>
    </div>
  );
}

