'use client';

import { useEffect, useState } from 'react'

const Currency = () => {
    const currencies = [
        "USD",
        "EUR",
        "GBP",
        "PKR",
        "INR",
        "AED",
        "SAR",
        "CAD",
        "AUD",
        "JPY",
        "CNY",
        "CHF",
        "TRY",
        "QAR",
        "KWD",
        "BHD",
        "OMR",
        "MYR",
        "SGD",
        "NZD"
    ];

    const [fromCurrency, setFromCurrency] = useState("PKR");
    const [toCurrency, setToCurrency] = useState("USD");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [amount, setAmount] = useState("100");

    const key = process.env.NEXT_PUBLIC_CURRENCY_KEY;

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${key}/latest/USD`)
            if (!response.ok) {
                throw new Error("failed fetcing data")
            }
            const data = await response.json();
            const fromExchange = data.conversion_rates[fromCurrency];
            const toExchange = data.conversion_rates[toCurrency];
            const convertedAmount = (amount / fromExchange) * toExchange;
            setResult(`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
            console.log(data);
        }
        catch (error) {
            console.error("Error fetching data", error)
        }
        finally {
            setLoading(false)
        }
    }

    const handleConvert = () => {
        fetchData();
    }
    


    return (
        <div className='container'>
            <div className='wrapper'>

                <div>
                    <h2>Currency Converter</h2>
                </div>

                <label >Amount:</label>
                <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}/>

                <div>
                    <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                    <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>

                </div>
                <button type='button' onClick={handleConvert}>Convert</button>

                <p>{result}</p>
            </div>
        </div>
    )
}

export default Currency