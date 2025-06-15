import React from 'react'
import { Link } from 'react-router-dom'

function UserTripCardItem({trip}) {
  return (
    <Link to={"/view-trip/"+trip?.id}>
    <div className='shadow-md rounded-2xl hover:scale-105 transition-all cursor-pointer '>
    <img src="banner21.png" className='object-cover rounded-2xl p-3  ' />
      <div className='pl-4 pb-1'>
        <h2 className="font-bold text-lg" >{trip.userSelection.location}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget}</h2>
      </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem
