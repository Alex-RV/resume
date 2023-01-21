import React, {useEffect} from 'react'
import Image from 'next/image';



export default function SkillsCard({scale, color, description, img}) {
    useEffect(() => {
        document.getElementById("progress").style.width = scale
        document.getElementById("progress").style.backgroundColor = color
      }, []);
  return (
    <div className='flex flex-row rounded-2xl mx-auto bg-gray-400 dark:bg-slate-600 max-w-2xl w-full'>
        <div className='flex p-4 items-center'>
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
            <div id="progress" className='flex p-2 bg-red-700 m-1 mt-2 mx-2 w-3/5 rounded-lg'>
            </div>
            <div className='flex p-3'>
                {description}
                {/* <h1>Description and years and something</h1> */}
            </div>
        </div>
    </div>
  )
}
