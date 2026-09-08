'use client';

import {useEffect, useState} from 'react'

const  GifSearch = () => {
    const [result, setResult] = useState('');
    const [para, setPara] = useState();
    const [loading, setLoading] = useState(false);


    const fetchData = async () => {
        try{
        setLoading(true);
        const response = await fetch(`https://api.api-ninjas.com/v1/loremipsum?paragraphs=${para}`)
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
    <div> 
        <input type="select" value={para} 
        placeholder='2' onChange={(e) => setPara(e.target.value)}/>
        <button>Generate</button>
       
    </div>
  )
}

export default GifSearch