import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9 h-full'>
    <h1
    className='font-extrabold text-[60px] text-center mt-16'
    >
    <span className='text-[#f95513]'>Discover Your Next Adventure with AI:</span> Personalized Ltineraries at Your Fingertips</h1>
    <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel ourator, creating custom itineries tailored to your interests and budget </p>
    <Link to={'/create-trip'}>
    <Button variant="ghost"> Get started, It's free</Button>
    </Link>
    </div>
  )
}

export default Hero
