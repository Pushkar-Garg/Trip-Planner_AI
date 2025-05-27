import React from 'react'
import { Link } from 'react-router-dom'

function Hotals({trip}) {
  
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotal Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-5'>
        {trip?.tripData?.hotelOptions?.map((hotel,index)=>(
            <Link key={index} to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+","+hotel?.hotelAddress} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer'>
            {/* <img
              src={finalPhoto[index] || "/hotel.avif"}
              className='rounded-2xl h-[150px] w-[300px]'
            /> */}
                <div className='shadow rounded-2xl p-3 my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                    <h2 className='text-sm'>💰 {hotel?.price}</h2>
                    <h2 className='text-sm'>⭐ {hotel?.rating} Stars</h2>
                </div>
            </div>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default Hotals
