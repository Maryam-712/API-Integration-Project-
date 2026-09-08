'use client';

import {useEffect, useState} from 'react'

const Lorem = () => {
    const [result, setResult] = useState('');
    const [para, setPara] = useState();
    const [loading, setLoading] = useState(false);


    const fetchData = async () => {
        try{
        setLoading(true);
        const response = await fetch(`https://api.api-ninjas.com/v1/loremipsum?paragraphs=${para}`,
           {
            headers: {
                "X-Api-Key": process.env.NEXT_PUBLIC_NINJA_KEY,
            },
        }
        )
        if(!response.ok){
            throw new Error("failed fetcing data")
        }
        const data = await response.json();
        setResult(data);
        console.log(data);
        }
        catch(error){
            console.error("Error fetching data",error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
      fetchData();
    }, [])
    

  return (
    <div className='flex justify-center flex-col gap-7 m-4'> 
        <div className='flex items-center justify-center gap-4'>
        <input type="number" value={para} 
        defaultValue='2' 
        min='0'
        onChange={(e) => setPara(e.target.value)}
        className='border-2 border-pink-500 focus:outline-pink-500 rounded-md max-w-[5%] px-2 py-1'
        />
        <button type='button' onClick={fetchData}
        className="pointer-cursor  px-4 py-2 bg-pink-500 text-white font-semibold text-md font-sora rounded-lg">
            Generate</button>

        <button className="pointer-cursor  px-4 py-2 bg-pink-500 text-white font-semibold text-md font-sora rounded-lg">
            Copy</button>
        </div>
        <div>
            <p className='font-inter whitespace-pre-line'>{result?.text}</p>
        </div>
    </div>
  )
}

export default Lorem