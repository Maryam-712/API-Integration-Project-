'use client';

import { useState } from 'react'



const Recipe = () => {

    const [recipe, setRecipe] = useState(null);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [ingredeints, setIngredients] = useState([]);
    const [showRecipe, setShowRecipe] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${search}`);

            if (!response.ok) {
                throw new Error("Failed fetching data")
            }

            const data = await response.json();
            setRecipe(data);
            console.log(data);

            const meal = data?.meals[0];
            let count = 1;
            let ingredeintsArray = [];

            for (let i in meal) {
                if (i.startsWith("strIngredient") && meal[i]) {
                    const ingredient = meal[i];
                    const measure = meal["strMeasure" + count];

                    ingredeintsArray.push(`${ingredient} ${measure}`);

                    count++;
                }
            }
            setIngredients(ingredeintsArray);

        }

        catch (error) {
            console.error("Error fetching data", error)
        }
        finally {
            setLoading(false);
        }

    }

    const handleClick = () => {
        fetchData();
    }

    const handleRecipe = () => {
        setShowRecipe(true);
    }

    return (
        <div className='container'>
            <div className='relative w-full shadow-lg max-w-[40%] flex flex-col justify-center items-center top-0  '>
                <div className='flex gap-4 p-4 '>
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                        placeholder='Type your recipe here...'
                        className='w-[80%] border-b-2 border-yellow-500 text-lg p-2 font-inter focus:outline-none' />
                    <button type='button'
                        onClick={handleClick}
                        className='bg-yellow-500 text-white p-2 px-3 rounded-sm text-md tracking-wide cursor-pointer'>
                        Search</button>
                </div>

                {loading && <div className="text-2xl text-center font-semibold"> Loading... </div>}

                < div className='flex items-center justify-center flex-col p-8 gap-2' hidden={loading}>
                    <img src={recipe?.meals[0]?.strMealThumb} alt=""
                        width={150}
                        height={150}
                         />
                    <h2 className='font-sora font-semibold text-xl '>{recipe?.meals[0]?.strMeal}</h2>
                    <h2  className='font-sora font-semibold text-lg mb-4 '>{recipe?.meals[0]?.strArea}</h2>

                    <div >
                        <ul className='grid grid-cols-2 gap-x-10 gap-y-1 w-fit mx-auto list-disc list-inside m-0 p-0'>
                        {ingredeints.map((item) => {
                            return <li key={item}>{item}</li>
                        })}
                        </ul>
                    </div>

                    <button className='bg-yellow-500 text-white p-2 px-3 rounded-sm text-md tracking-wide cursor-pointer mt-5'
                    onClick={handleRecipe}
                    >
                        
                        View Recipe</button>

                         {showRecipe && (
                <div className='absolute w-full p-12 top-0 z-10 rounded-xl bg-white shadow-lg'
                 
                > 
                    <button className='absolute top-1 left-115 bg-yellow-500 text-white p-1 px-2 rounded-sm text-lg tracking-wide cursor-pointer'
                    onClick={() => setShowRecipe(false)}>x</button> 
                    <pre className='whitespace-pre-wrap break-words font-inter leading-relaxed'> 
                        {recipe?.meals[0]?.strInstructions}</pre> 
                        </div>
            

            )}
                </div>
                
               
            </div>

        </div>
    )
}

export default Recipe