'use client';

import { useEffect, useState } from "react";

const Joke = () => {
  
  const [joke, setJoke] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async() => {
    try{
        setLoading(true);
    const response =  await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=political,racist,sexist,explicit&type=single");

      if(!response.ok){
        throw new Error("Failed to fetch data")
      }
    
    const data = await response.json();
    setJoke(data);
    
    }
    catch (error){
      console.error("Error fetching data: ", error);
    }
    finally{
      setLoading(false);
    };
  };

  useEffect(() => {
   fetchData();
  }, [])
  

  return (
    <div className=" min-h-[60vh] flex items-center justify-center">
      <div className="joke-box">
        <span className="text-6xl py-4">&#128514;</span>
        <p className=" joke-para " hidden={loading}>{joke?.joke}</p>
        {loading && <div className="text-2xl text-center font-semibold"> Loading... </div>}
        <button className="joke-btn" onClick={fetchData} >
          {loading ? 'Loading...' : ' Get Random Joke'}
          </button>
      
      </div>
    </div>

  )
}

export default Joke