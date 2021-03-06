import React, { useState } from 'react';
import './AirportInfo.css';
import Flights from './Flights';
import Currency from './Currency';

function AirportInfo() { 
    const [flights, setFlights] = useState([])
    const [places, setPlaces] = useState([])
    const [query, setQuery] = useState("")
    const [destQuery, setDestQuery] = useState("")
    const [inDate, setInDate] = useState("")
    const [outDate, setOutDate] = useState("")
    const [currencies, setCurrencies] = useState([])
    const [currCurrency, setCurrCurrency] = useState("")
    const [carriers, setCarriers] = useState([])

    // get the available currencies from Skyscanner
    if (currencies.length === 0) {
        async function fetchCurrencies() {
            const reqOptions = {
                method: 'GET',
                headers: {
                    "x-rapidapi-key": "9c838d17b0msh9d78bbfa4f324fbp109103jsn16509938ea2e",
                    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    "useQueryString": true
                }
            }
            let response = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies", reqOptions)
            response = await response.json()
            for (let i = 0; i < currencies.length; i++) {
                console.log(currencies[i].Code)
            }
            setCurrencies(response.Currencies)
        }
        fetchCurrencies()
    }

    function handleSubmit(e) {
        e.preventDefault()
        async function fetchMyAPI() {
            const reqOptions = {
                method: 'GET',
                headers: {
                    "x-rapidapi-key": "9c838d17b0msh9d78bbfa4f324fbp109103jsn16509938ea2e",
                    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    "useQueryString": true
                }
            }

            // get origin and destination input
            let originId = query.toUpperCase()
            let destId = destQuery.toUpperCase()
            console.log(originId, destId)

            // get selected currency
            let s = document.getElementById("currencies")
            console.log(s)
            let value = s.options[s.selectedIndex].text
            setCurrCurrency(value)
            
            // fetch quotes
            var response
            response = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/" + value + "/en-US/" + originId + "/" + destId + "/" + inDate + "?inboundpartialdate=" + outDate, reqOptions)
            response = await response.json()
            console.log(response)
            if (response.Quotes === undefined) {
                return
            }
            setFlights(response.Quotes)
            setPlaces(response.Places)
            setCarriers(response.Carriers)
        }
        
        fetchMyAPI()
    }

    return(
        <div className="airportinfo">
            <form onSubmit={handleSubmit}>
                <table>
                    <tr>
                        <td class="input">
                            <label>Leaving from: </label>
                            <input id="queryInput" placeholder="airport code" value={query} onChange={e => setQuery(e.target.value)} required/>
                        </td>
                        <td class="input">
                            <label>Going to: </label>
                            <input id="destQueryInput" placeholder="airport code" value={destQuery} onChange={e => setDestQuery(e.target.value)} required/>
                        </td>
                    </tr>
                    <tr>
                        <td class="input">
                            <label htmlFor="outDate">Departing: </label>
                            <input type="date" id="outDate" value={outDate} onChange={e => setOutDate(e.target.value)}></input>
                        </td>
                        <td class="input">
                            <label htmlFor="inDate">Returning: </label>
                            <input type="date" id="inDate" value={inDate} onChange={e => setInDate(e.target.value)}></input>
                        </td>
                    </tr>
                    <tr>
                        <td class="input">
                            <label>Currency: </label>
                            <Currency currencies={currencies}></Currency>
                        </td>
                    </tr>
                </table>
                <button className="search">Search</button>
           </form>
           <p>Prices with ??? are the lowest.</p>
           <Flights flights={flights} places={places} carriers={carriers} currencies={currencies} currCurrency={currCurrency}></Flights>
        </div>
    )
}

export default AirportInfo;