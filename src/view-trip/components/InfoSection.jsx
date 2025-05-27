import React from 'react'
import { Link } from 'react-router-dom'
function InfoSection({trip}) {

  return (
    <div>
    <Link to={'https://www.google.com/maps/search/?api=1&query='+trip?.userSelection?.location} target='_blank'>
      <img className='rounded-2xl h-98 w-396 hover:scale-105 transition-all hover:shadow-md cursor-pointer' src={"/banner21.png"} alt="Place" />
    </Link>
      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-5xl'>{trip?.userSelection?.location}</h2>
            <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>📅 {trip?.userSelection?.noOfDays} Day</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💵 {trip?.userSelection?.budget} Budget</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No. of Traveler: {trip?.userSelection?.people} Day</h2>
            </div>
        </div> 
      </div>
    </div>
  )
}

export default InfoSection
