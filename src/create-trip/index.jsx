import React, { useState , useEffect} from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from 'axios';
import {AI_PROMPT, SelectBudgetOptions, SelectTravelesList} from "@/constants/options.jsx"
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";


function CreateTrip() {
  const key= import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

  const [query, setQuery] = useState('');  // for value displaying in text field
  // const [query1, setQuery1] = useState(''); // for value filling in FORM
  const [suggestions, setSuggestions] = useState([]);

  const [formData,setFormData]= useState([]);

  const [openDialog,setOpenDialog]= useState(false);

  const [loading,setLoading]= useState(false);

  const navigate = useNavigate();

  const fetchSuggestions = async (input) => {
    try {
      const response = await axios.get(`https://maps.gomaps.pro/maps/api/place/autocomplete/json`, {
        params: {
          input: input,
          key: `${key}`
        }
      });
      // console.log(response.data);     // just for check
      // console.log(response.data.predictions.map(item => item.description));     // just for check
      setSuggestions(response.data.predictions.map(item => item.description));
      // console.log(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    if (input.length > 2) {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  };
  
  const handleInputChange1=(name,value)=>{
    setFormData({
      ...formData,
      [name]:value 
    })
    
  } 
   
  const handleSuggestionClick = (suggestions) => {
    setQuery(suggestions); // Fill input field
    // setQuery1(suggestions); // Fill input field
    handleInputChange1('location',suggestions)
    // console.log(formData);
    setSuggestions([]); // Clear suggestions after selection
    // console.log(query1);                              // just for check
  };



  const login = useGoogleLogin({
    onSuccess:(codeResp)=> GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })


  const ai = new GoogleGenAI({ apiKey: "AIzaSyBoOkZS0bUlKMS7rWz2GpaVT1EXBQSNjIs" });
  const genTrip = async(prompt)=> {
    // console.log(prompt);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${prompt}`,
    });
    const res = response.text;
    const match = res.match(/```json([\s\S]*?)```/);
        if (match && match[1]) {
          try {
            const jsonString = match[1].trim();
            SaveAiTrip(jsonString);
          } catch (err) {
            console.error("Invalid JSON:", err);
            return null;
          }
        } else {
          console.error("No JSON block found.");
          return null;
        }
    // console.log("Response of GEMINI--------------------->>>>",response.text);
  }


  const onGenerateTrip=async()=>{

    const user= localStorage.getItem('user');

    if(!user){
      setOpenDialog(true);
      return ;
    }


    if(formData?.noOfDays>5||!formData?.noOfDays||!formData?.location||!formData?.budget||!formData?.people){
      toast("please fill all details")
      return;
    }
    setLoading(true);
    const FINAL_PROMPT= AI_PROMPT.replace('{location}',formData?.location).replace('{totalDays}',formData?.noOfDays).replace('{poeple}',formData?.people).replace('{budget}',formData?.budget).replace('{totalDays}',formData?.noOfDays);
    
    await genTrip(FINAL_PROMPT);
    
    // console.log(result?.response);
    setLoading(false);
    // SaveAiTrip(result?.response?.text());

  }

  const SaveAiTrip=async(TripData)=>{
    setLoading(true);
    const user= JSON.parse(localStorage.getItem('user'));
    const docId= Date.now().toString();

    await setDoc(doc(db,"AITrips", docId), {
      userSelection: formData,
      tripData:JSON.parse(TripData),
      userEmail:user?.email,
      id:docId
    });
    setLoading(false);
    navigate('/view-trip/'+docId)
  }


  const GetUserProfile=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=>{
      // console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    })
  }
  
  return (
    <div style={{
    background: 'linear-gradient(180deg, #3270c2 0%, #10a7bb22 60%)',
    paddingTop: '50px',
    paddingBottom: '10px',
    minHeight: '90dvh'
  }}>
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 '>
    <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
    <p className='mt-3 text-xl'>Just provide some basic information, and our trip planner will generate a customized itineries based on your preferences</p>
    
    <div>
      <div className="w-full max-w-5xl  mx-auto mt-10 ">
        <h2 className='font-bold text-2xl'> What is destination of choice?</h2>
        
          <input
            type="text"
            value={query}
            // onChange={e => { handleInputChange(e); handleInputChange1('location',query1) }}
            onChange={ handleInputChange}
            placeholder="Search location..."
            className="w-full rounded-xl p-2 border border-black"
          />
          {suggestions.length > 0 && (
            <ul className="border mt-2 rounded-md shadow bg-white">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}

          <div className='mt-10'>
          <h2 className='font-bold text-2xl'> How many days are you planning your trip?</h2>
          <Input placeholder={"Ex.3"} type="number" 
          onChange={(e)=>handleInputChange1('noOfDays',e.target.value)}
          />
          </div>

          <div className='mt-10'>
            <h2>What is Your Budget?</h2>
              <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectBudgetOptions.map((item,index)=>(
                  <div key={index}
                       onClick={()=>handleInputChange1('budget',item.tittle)}
                       className={`p-4 cursor-pointer rounded-md hover:shadow-lg 
                      ${formData?.budget==item.tittle&&'shadow-lg border-black'} 
                      `}>
                    {/* <h2 className='text-4xl'>{item.icon}</h2> */}
                    <h2 className='font-bold text-lg'>{item.tittle}</h2>
                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                  </div>
                ))}
              </div>
          </div>
          <div className='mt-10'>
            <h2>Who do you plan on traveling with on your next adventure?</h2>
              <div className='grid grid-cols-3 gap-5 mt-5'>
                {SelectTravelesList.map((item,index)=>(
                  <div key={index} 
                       onClick={()=>handleInputChange1('people',item.people)}
                       className={`p-4 cursor-pointer rounded-md hover:shadow-lg 
                      ${formData?.people==item.people&&'shadow-lg border-black'} 
                      `}>
                    {/* <h2 className='text-4xl'>{item.icon}</h2> */}
                    <h2 className='font-bold text-lg'>{item.tittle}</h2>
                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                  </div>
                ))}
              </div>
          </div>
          <div className='my-10 justify flex'>
            <Button variant="ghost" disabled={loading} onClick={onGenerateTrip}>
            {loading? "Loading..": "Generate Trip"} 
            </Button>
          </div>
          <Dialog open={openDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                  <img src="/logo.svg" alt="" />
                  <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
                  <p>Sign in to the App with Google Authentication Securely</p>

                  <Button  onClick={login} variant="ghost" className="w-full mt-5 flex gap-4 items-center">Sign In With Google</Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>


        </div>
        
      </div>
    </div>
    </div>
  )
}

export default CreateTrip
