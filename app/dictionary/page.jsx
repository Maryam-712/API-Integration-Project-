'use client';

import { useRef, useState, useEffect } from 'react';

const Dictionary = () => {
    const [searchWord, setSearchWord] = useState("");
    const [result, setResult] = useState([]);
    const audioRef = useRef(null);
    const [notFound, setNotFound] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try{
            setLoading(true);
            setNotFound("");
         
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
            if(!response.ok){
                throw new Error("Failed to fetch")
            }
                const data = await response.json();
                setResult(data)
            
        }
        catch(error){
            console.error("Error fetching data: ", error);
                setResult([]);
                setNotFound("Couldn't find the word");
                
        }
        finally{
            setLoading(false);
        }
    }

    

    const rawAudio = result[0]?.phonetics?.find(p => p.audio)?.audio;
    const audioUrl = rawAudio
        ? (rawAudio.startsWith("//") ? `https:${rawAudio}` : rawAudio)
        : null;

    useEffect(() => {
        if (audioRef.current && audioUrl) {
            audioRef.current.load();
        }
    }, [audioUrl]);

    // Fallback: use the browser's speech synthesis if the fetched audio file is broken
    const speakFallback = () => {
        if (!result[0]?.word) return;
        const utterance = new SpeechSynthesisUtterance(result[0].word);
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    };

    const playAudio = () => {
        if (!audioUrl || !audioRef.current) {
            speakFallback();
            return;
        }
        audioRef.current.play().catch((err) => {
            console.warn("Fetched audio failed, falling back to speech synthesis:", err);
            speakFallback();
        });
    };

    return (
        <div className='dic-cont'>
            <audio ref={audioRef} src={audioUrl || undefined} preload="none" />

            <div className='flex items-center w-full gap-10 justify-start '>
                <input
                    type="text"
                    placeholder='Type the word here'
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") fetchData(); }}
                    className='w-[50%] border-b-2 border-purple-700 text-lg p-2 font-inter focus:outline-none'
                />
                <button
                    type="button"
                    onClick={fetchData}
                    className='bg-purple-500 text-white p-2 px-3 rounded-sm text-sm tracking-wide cursor-pointer'
                >
                    Search
                </button>
            </div>
            <div>
                {notFound && (
                    <p className="text-red-500 mt-4 text-center text-2xl">
                        {notFound}
                    </p>)}
            </div>

            {loading && <div className="text-2xl text-center font-semibold"> Loading... </div>}
            <div className='result' hidden={loading}>
                <div className='flex justify-between'>
                    <h3 className='text-purple-800 text-2xl font-semibold'>
                        {result[0]?.word}
                    </h3>

                    {result[0]?.word && (
                        <button onClick={playAudio}
                            className='cursor-pointer text-xl'>
                            <i className="fa-solid fa-volume"></i>
                        </button>
                    )}
                </div>

                <div className='flex gap-2 text-gray-400 text-sm mb-8 pt-1'>
                    <p>{result[0]?.meanings[0]?.partOfSpeech} </p>
                    <p>{result[0]?.phonetic}</p>
                </div>

                <div className='text-gray-600 font-inter text-md'>
                    <p> {result[0]?.meanings[0]?.definitions[0]?.definition} </p>
                    <p className='mt-6 border-l-3 px-4 border-purple-700 italic'>
                        {result[0]?.word
                            ? (result[0]?.meanings[0]?.definitions[0]?.example || "No Example found")
                            : ""}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dictionary;