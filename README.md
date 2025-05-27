import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

function Hotals({trip}) {
  const [finalPhoto,setFinalPhoto]= useState("");

  const fetchPlaces = async (query) => {
    // console.log(query);
    const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
    const encodedQuery = encodeURIComponent(query);
    const url = `https://maps.gomaps.pro/maps/api/place/textsearch/json?query=${encodedQuery}&key=${apiKey}`;
    try {
      const response = await axios.get(url);
      const newRes = response.data.results;
      const query2= newRes[0].photos[0].photo_reference;
      fetchPlaces2(query2);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };
  const fetchPlaces2 = async(query2) =>{
     
    const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
    const url2= `https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${query2}&maxwidth=400&key=${apiKey}`;
    try {
      // console.log(query2)
      const response2 = await axios.get(url2, { responseType: 'blob' });
      const imageUrl = URL.createObjectURL(response2.data);
      // console.log(imageUrl)
      setFinalPhoto(imageUrl);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  }
  useEffect(() => {
    let intervalId;
    let timeoutId;
    if (trip) {
      intervalId = setInterval(() => {
        trip.tripData.hotels.forEach(hotel => {
          if (hotel?.hotelName) {
            fetchPlaces(hotel.hotelName);
            // console.log(hotel.hotelName);
            // console.log(trip);
          }
        });
      }, 1000); 
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
      }, 3000); 
    }
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [trip]);
  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotal Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
        {trip?.tripData?.hotels?.map((hotel,index)=>(
            <Link key={index} to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+","+hotel?.hotelAddress} target='_blank'>
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={finalPhoto} className='rounded-2xl' />
                <div className='my-2 flex flex-col gap-2'>
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
