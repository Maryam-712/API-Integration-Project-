import ApiCard from '@/componenets/ApiCard'
import React from 'react'


const Home = () => {
  return (
    <div className='flex flex-col items-center '>
      <h1 className='mt-10'>
        Welcome To API Hub
      </h1>
      <p className='mt-5 '>
        Explore different APIs and their real-time data.
        Each Project is integrated with a unique API to bring you useful information
      </p>

      <ApiCard/>
    </div>
    

    
  )
}

export default Home