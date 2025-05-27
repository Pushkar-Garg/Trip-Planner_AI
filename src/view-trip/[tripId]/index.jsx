import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotals from '../components/Hotals';
import PlacesToVisit from '../components/PlacesToVisit';
import './index1.css'
function Viewtrip() {

  const {tripId} = useParams();
  const [trip,setTrip]= useState([]);

  useEffect(()=>{
    tripId&&GetTripData();
  },[tripId])
  const GetTripData=async() =>{
    const docRef = doc(db,'AITrips',tripId);
    const docSnap=await getDoc(docRef)

    if(docSnap.exists()){
      setTrip(docSnap.data());
    }else{
      console.log("No such Document");
      toast("No trip Found");
    }
  }
  return (
    <div id='trippage' className='p-10 md:px-20 lg:px-44 xl:px-56'>
      <InfoSection  trip={trip}/>
      <Hotals trip={trip}/>
      <PlacesToVisit trip={trip}/>
    </div>
  )
}

export default Viewtrip
