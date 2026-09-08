'use client';

import {useEffect, useState} from 'react'

const GenderPredict = () => {
    const [result, setResult] = useState('');
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const fetchData = async () => {
        try{
        setLoading(true);
        
        if (search.length > 0 && /^[A-Za-z]+$/.test(search)) {
            const response = await fetch(`https://api.genderize.io?name=${search}`)
        if(!response.ok){
            throw new Error("failed fetcing data")
        }
        const data = await response.json();
        setResult(data);
        console.log(data);
        }
        else{
            setError("Enter a valid name")
        }
        }
        
        catch(error){
            console.error("Error fetching data",error)
        }
        finally{
            setLoading(false)
        }
    }

    const hanldeSearch = () => {
        fetchData();
    }
   
    

  return (
    <div className='container'> 
    <div className='wrapper'>
        <input type="text" value={search} 
        placeholder='Type name here...' onChange={(e) => setSearch(e.target.value)}/>
        <button onClick={hanldeSearch}>Search</button>

        <div>
            <h2>{result?.name}</h2>
            <h1>{result?.gender}</h1>
            <h3>{result?.probability}</h3>
        </div>
       
    {error && <h2>{error}</h2>

    }
    </div>
    </div>
  )
}

export default GenderPredict