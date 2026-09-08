'use client';

import {useState, useEffect} from 'react'

const NumberTrivia = () => {
    const [search, setSearch] = useState('');
    const [number, setNumber] = useState();
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try{
            setLoading(true);

            const response = await fetch('http://numbersapi.com/' + search)
            if(!response.ok){
                throw new Error("Failed fetching data")
            }
            const data = await response.json();
            setNumber(data);
            console.log(data)
        }
        catch(error){
            console.error("Error fetching data", error);
            
        }
        finally{
            setLoading(false);
        }
    }
  return (
    <div className='container'>
        <div className='wrapper'>
            <div>
                <input type="text"
                value={search} 
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Type a number...'/>
                <button type='button'
                onClick={fetchData}>
                    Get Fact
                </button>
            </div>

            <button type='button'
                onClick={fetchData}>Get Random Fact</button>

            <div>
                <h2></h2>
                <p></p>
            </div>
        </div>
    </div>
  )
}

export default NumberTrivia