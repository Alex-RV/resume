import React from 'react'

export default function ExperienceCard({title, name, date, description,letter}) {
  return (
    <div data-aos="zoom-out-down" className="timeline-block">
                <div className="timeline-dot"><h6 className="material-icons">{letter}</h6></div>
                <div className="card timeline-content">
                    <div className="card-content bg-slate-100 dark:bg-slate-600 ">
                        <h6 className="timeline-title text-black dark:text-white ">{title}</h6>
                        <div className="timeline-info text-black dark:text-white mb-2">
                            <h6>
                                <small>{name}</small>
                            </h6>
                            <h6 className='font-bold'>
                                <small>{date}</small>
                            </h6>
                        </div>
                        <p className='text-black dark:text-white m-auto w-auto'>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
  )
}
