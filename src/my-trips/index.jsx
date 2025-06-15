import { db } from '@/service/firebaseConfig';
import { collection, query ,where, getDocs } from 'firebase/firestore';
import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
    const navigate=useNavigate();
    const [userTrips,setUserTrips]=useState([])
    const [hasFetched, setHasFetched] = useState(false);
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
        setUserTrips(prevVal=>[...prevVal,doc.data()])
        setHasFetched(true);
});
    }
    useEffect(()=>{
        GetUserTrips();
        
    },[hasFetched])
  return (
    <div style={{
        paddingBottom: '10px',
        minHeight: '117dvh',
        paddingTop: "32px",
        background: 'linear-gradient(180deg, #3270c2 0%, #10a7bb22 60%)'
      }}>
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 '>
      <h2 className='font-bold text-3xl'>My trips</h2>
      <div className='grid sm:grid-cols-4 md:grid-cols-5  mt-10 gap-5'>
      {
        userTrips.map((trip,index)=>(
          <UserTripCardItem trip={trip} key={index}  />
        ))
      }
      </div>
    </div>
    </div>
  )
}

export default MyTrips
