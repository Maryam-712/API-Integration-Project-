'use client';

import  { useEffect, useState } from 'react'

const UserCard= () => {
    const [result, setResult] = useState();
    const [loadng, setLoading] = useState(false);
    const [search , setSearch] = useState(null);

    const fetchData = async (num) => {
        try{
            setLoading(true);

            const response =await fetch(`http://numbersapi.com/${num}/trivia`)
            if(!response.ok){
                throw new Error("failed fetching data")

            }
            const data = await response.json();
            setResult(data);
            console.log(data)
        }
        catch(error){
            console.error("Error fetching data",error)
        }
        finally{
            setLoading(false);
        }
    }

    const handleSearch = () => {
        fetchData(search);
    }

    const handleRandomNum = () => {
        const number = Math.floor(Math.random() * 301);
        fetchData(number);
    }

    useEffect(() => {
      handleRandomNum();
    }, [])


  return (
    <div>
        <div>
            <div>
                <input type="text" value={search}
                onChange={(e) => setSearch(e.target.value)}/>
                <button onClick={handleSearch}> Get Fact</button>
            </div>

            <button onClick={handleRandomNum}>Get Random Fact</button>

            <div>
                

            </div>
        </div>
    </div>
  )
}

export default UserCard
