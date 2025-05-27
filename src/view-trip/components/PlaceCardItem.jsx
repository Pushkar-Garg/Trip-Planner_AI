import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {
  
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
        <div className='shadow rounded-2xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
            <div>
                <h2 className='font-bold text-lg'>{place.placeName}</h2>
                <p className='text-sm text-gray-400'>{place.placeDetails}</p>
                <h2>🕖 Time to spend: {place.duration}</h2>
                <h2 className='text-sm'>⭐ {place?.rating} Stars</h2>
                <h2 className='text-sm'> <span className='font-bold'>Best time to visit: </span> {place?.bestTimeToVisit} </h2>
                
            </div>
        </div>
    </Link>
  )
}

export default PlaceCardItem
