'use client';

import { useEffect, useState } from "react";

const Joke = () => {
  
  const [joke, setJoke] = useState(null);

  const fetchData = () => {
    return fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=political,racist,sexist,explicit&type=single")
    .then(response => {
      if(!response.ok){
        throw new Error("Failed to fetch data")
      }
      return response.json();
    }) 
    .then(data => {
      setJoke(data);
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
  };

  useEffect(() => {
   fetchData();
  }, [])
  

  return (
    <div className=" min-h-[60vh] flex items-center justify-center">
      <div className="joke-box">
        <span className="text-6xl py-4">&#128514;</span>
        <p className=" joke-para ">{joke?.joke}</p>
        <button className="joke-btn" onClick={fetchData}>Get Random Joke</button>
      </div>
    </div>

  )
}

export default Joke