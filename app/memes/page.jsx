'use client';

import  { useEffect, useState } from 'react'

const Meme = () => {
    const [meme, setMeme] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try{
            setLoading(true);

            const response =await fetch("https://meme-api.com/gimme")
            if(!response.ok){
                throw new Error("failed fetching data")

            }
            const data = await response.json();
            setMeme(data);
        }
        catch(error){
            console.error("Error fetching data",error)
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
      fetchData();
    }, [])
    
  return (
    <div className='container'>
        <div className='wrapper flex flex-col items-center' >
            <div hidden={loading} className='flex flex-col items-center gap-4'>
            <img src={meme?.url} alt="" 
            width={100}
            height={100}
            className='w-full object-contain rounded-xl '/>
            <h3 className='font-semibold font-sora text-gray-700 '>{meme?.title}</h3>
            </div>
            {loading && <div className="text-2xl text-center font-semibold"> Loading... </div>}
            <button onClick={fetchData}
            className="pointer-cursor mt-6 px-4 py-2 bg-black text-white font-semibold text-lg font-sora rounded-lg"
            >Get Random Meme</button>
        </div>
    </div>
  )
}

export default Meme