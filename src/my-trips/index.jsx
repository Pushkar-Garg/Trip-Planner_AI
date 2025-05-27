import { db } from '@/service/firebaseConfig';
import { collection, query ,where, getDocs } from 'firebase/firestore';
import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';

function MyTrips() {
    const navigate=useNavigate();
    const [userTrips,setUserTrips]=useState([])
    const GetUserTrips=async()=>{
        const user=JSON.parse(localStorage.getItem('user'))
        
        if(!user){
            navigate('/');
            return;
        }
        setUserTrips([])
        const q=query(collection(db,"AITrips"),where('userEmail','==',user?.email))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserTrips(prevVal=>[...prevVal,doc.data()])
});
    }
    useEffect(()=>{
        GetUserTrips();
        
    },[])
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      hello
    </div>
  )
}

export default MyTrips
