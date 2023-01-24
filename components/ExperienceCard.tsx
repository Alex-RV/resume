import React from 'react'

export default function ExperienceCard({title, name, date, description,letter}) {
  return (
    <div className="timeline-block">
                <div className="timeline-dot"><h6>{letter}</h6></div>
                <div className="card timeline-content">
                    <div className="card-content bg-slate-100 dark:bg-slate-600 ">
                        <h6 className="timeline-title dark:text-white ">{title}</h6>
                        <div className="timeline-info dark:text-white ">
                            <h6>
                                <small>{name}</small>
                            </h6>
                            <h6>
                                <small>{date}</small>
                            </h6>
                        </div>
                        <p className='dark:text-white m-auto w-auto'>
                            {description}
                        </p>
                    </div>
                </div>
            </div>
  )
}