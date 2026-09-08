'use client';

import { useState } from 'react'


const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState("");

  const key = process.env.NEXT_PUBLIC_KEY;

  const fetchData = async () => {
    try {
      setLoading(true);
      setNotFound("");


      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}&units=metric`);
      if (!response.ok) {
        throw new Error("Failed fetching data")
      }
      const data = await response.json();

      if (data?.length === 0) {
        throw new Error("City not Found")
      }
      setWeather(data);

      console.log(data);
    }
    catch (error) {
      console.error("Error fetching data", error);
      setWeather([]);
      setNotFound("Couldn't found the country ");
    }
    finally {
      setLoading(false);
    }
  }

  const handleClick = () => {
    fetchData();
  }

  return (
    <div className='container'>
      <div className='wrapper bg-blue-500  text-white p-6'>
        <div className='flex items-center justify-center gap-4'>
          <input type="text" value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Type the City here...'
            className='w-[70%] border-b-2 border-white text-lg p-2 font-inter focus:outline-none' />

          <button onClick={handleClick}
            className='bg-white text-blue-500 p-2 px-3 rounded-sm text-md tracking-wide cursor-pointer'
          >
            Search</button>
        </div>

        {notFound && (
          <p className="text-red-500 mt-4 text-center text-2xl">
            {notFound}
          </p>)}

        {loading && <div className="text-2xl text-center font-semibold"> Loading... </div>}

        <div className='flex flex-col items-center gap-6 mt-8'
          hidden={loading} >

          <h3 className='text-xl font-semibold font-sora uppercase'>{weather?.name}</h3>
          <div className='flex flex-col items-center text-md font-sora font-normal'>
            <h4>{weather?.weather[0]?.description}</h4>
            <h4 >{weather?.weather[0]?.main}</h4>
          </div>
          <img src={`https://openweathermap.org/img/w/${weather?.weather[0]?.icon}.png`} alt="" />

          <div className='flex flex-col items-center gap-2'>
            <h2 className='font-sora text-6xl'>{weather?.main?.temp_max}</h2>

            <div className='flex items-center gap-2 mb-10 ' hidden={loading} >
              <h6 className='border-r-1 px-2 uppercase text-sm'>min<p className='text-gray-800 font-semibold font-inter'>{weather?.main?.temp_min}</p></h6>
              <h6 className='uppercase text-sm'>max<p className='text-gray-800 font-semibold font-inter'>{weather?.main?.temp_max}</p></h6>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather