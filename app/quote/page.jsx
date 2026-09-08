'use client';

import {useEffect, useState} from 'react'

const page = () => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try{
            setLoading(true);
            const response = await fetch("https://dummyjson.com/quotes/random");
            if(!response.ok){
                throw new Error("Failed fetching data")
            }
            const data = await response.json();
            setQuote(data);
        }
        catch(error){
             console.error("Error fetching data", error)
        }
        finally{
            setLoading(false);
        }
       
    }

    useEffect(() => {
     fetchData();
    }, [])
    

  return (
    <div  className='h-[80vh] m-auto flex justify-center items-center'>
        <div className='w-full m-auto max-w-[40%] text-center flex flex-col items-center justify-center bg-red-300
        p-16 rounded-2xl gap-3' >
            <p className='font-sora text-xl text-gray-700' hidden={loading}>{quote?.quote}</p>
            {loading && <div className="text-2xl text-center font-semibold"> Loading... </div>}
        <h3 className='font-sora text-md font-semibold text-gray-600' hidden={loading}>{quote?.author}</h3>
        <button 
        className='bg-white font-sora text-md text-red-500 p-2 rounded-md mt-6 cursor-pointer px-4'
        onClick={fetchData}
        >
           {loading ? 'Loading' : "Get Quote"} 
        </button>
        </div>
    </div>
  )
}

export default page