'use client';

import { useState, useEffect } from "react";

const PokemonCard = () => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);


      let id = Math.floor(Math.random() * 150) + 1;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const data = await response.json();
      setCard(data);
      console.log(data);

    }
    catch (error) {
      console.error("Error fetching data", error);

    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])



  const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  const color = typeColors[card?.types[0]?.type?.name];

  return (
    <div className="container flex-col ">
      <div className="wrapper bg-white flex items-center flex-col gap-4 p-5 relative"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`
        }}
      >
        <p className="-left-100 absolute left-78 top-5 font-bold text-sm bg-white rounded-xl px-2" hidden={loading}> HP
          <span className="text-lg font-normal" > {card?.stats[0]?.base_stat}</span></p>
        <img src={card?.sprites?.other?.dream_world?.front_default} alt=""
          width={180}
          height={180}
          hidden={loading}
          className="mt-12" />
        <h2 className="font-sora text-2xl uppercase font-semibold">{card?.name}</h2>
        <div className="flex gap-30 m-2">
          {card?.types?.map((item) => {
            return <span key={item.slot}
              className="px-3 py-1 rounded-full text-white font-semibold text-md "
              style={{
                background: ` ${color}`
              }}>{item.type.name}</span>
          })}

        </div>
        <div className="flex items-center gap-20 mt-6" hidden={loading}>
          <h3 className="flex flex-col items-center ">
            {card?.stats[1]?.base_stat}<p className="text-gray-600 font-semibold">Attack</p></h3>

          <h3 className="flex flex-col items-center ">
            {card?.stats[2]?.base_stat}<p className="text-gray-600 font-semibold">Defense</p></h3>

          <h3 className="flex flex-col items-center ">
            {card?.stats[5]?.base_stat}<p className="text-gray-600 font-semibold">Speed</p></h3>
        </div>
        {loading && <div className="text-2xl text-center font-semibold"> Loading... </div>}
      </div>


      <button onClick={fetchData}className="pointer-cursor mt-6 px-4 py-2 bg-black text-white font-semibold text-lg font-sora rounded-lg">
        
        Generate
      </button>
    </div>
  )
}

export default PokemonCard