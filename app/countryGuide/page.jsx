'use client';

import { useState } from 'react'

const CountryGuide = () => {
    const [search, setSearch] = useState("");
    const [country, setCountry] = useState([]);
    const [notFound, setNotFound] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            setNotFound("");

            const response = await fetch(`https://api.restcountries.com/countries/v5?q=${search}`,
                { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_RESTCOUNTRIES_API_KEY}` } }
            )
            if (!response.ok) {
                throw new Error("Failed fetching data")
            }
            const data = await response.json();

            if(data?.data?.objects.length===0){
                 throw new Error("Country not found");
            }

        
            setCountry(data?.data?.objects[0]);
            
        }
        catch(error){
            console.error("Error fetching data", error);
            setCountry([]);
            setNotFound("Couldn't find the Country");
        }
        finally{
            setLoading(false);
        }

    }


    return (
        <div className='h-[80vh] m-auto flex justify-center items-center'>
            <div className='w-full m-auto max-w-[40%] text-center flex-col flex items-center justify-center bg-blue-300
        p-10 rounded-2xl gap-6'>
                <div className='flex w-[80%] gap-4'>
                    <input type="text"
                        placeholder='Type country name here...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-[80%] border-b-2 border-blue-600 text-lg p-2 font-inter focus:outline-none font-sora text-gray-700' />

                    <button
                        className='bg-blue-600 text-white p-2 px-4 rounded-sm text-sm tracking-wide cursor-pointer font-inter'
                        onClick={fetchData}>
                        Search
                    </button>
                </div>
                   
                <div>
                    {notFound && (
                        <p className="text-red-500 mt-4 text-center text-2xl">
                            {notFound}
                        </p>
                    )}
                </div>

                {loading && <div className="text-2xl text-center font-semibold"> Loading... </div>}

                {country?.names?.common && (
                    <div hidden={loading}>
                        <div className='flex flex-col items-center justify-between gap-3'>
                            <img src={country?.flag.url_svg}
                                alt="Country Flag"
                                width='30%'
                                height='auto' />
                            <h2 className='font-sora text-2xl text-blue-900 font-semi bold'> {country?.names?.common}</h2>
                        </div>

                        <div className='flex flex-col justify-start items-start mt-6 gap-2 font-inter text-gray-700'>
                            <h3 className='font-semibold'>Capital: <span className='font-normal'>{country?.capitals[0]?.name}</span></h3>
                            <h3 className='font-semibold'>Continentt: <span className='font-normal'> {country?.continents}</span></h3>
                            <h3 className='font-semibold'>Population: <span className='font-normal'>{country?.population}</span></h3>
                            <h3 className='font-semibold'>Currency: <span className='font-normal'>{country?.currencies[0]?.name} - {country?.currencies[0]?.code}</span></h3>
                            <h3 className='font-semibold'>Common language: <span className='font-normal'>{country?.languages[0]?.name}</span></h3>
                        </div>
                    </div>
                )}



            </div>
        </div>
    )
}

export default CountryGuide