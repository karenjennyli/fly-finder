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
    const [showFlights, setShowFlights] = useState(false)
    const [currencies, setCurrencies] = useState([])

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

            // let responseOrigin = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?" + new URLSearchParams({query: query}), reqOptions)
            // responseOrigin = await responseOrigin.json()
            // let originId = responseOrigin.Places[0].PlaceId
            // // loop through responseOrigin.Places array until get good length
            // // console.log(originId)

            // let responseDest = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?" + new URLSearchParams({query: destQuery}), reqOptions)
            // responseDest = await responseDest.json()
            // let destId = responseDest.Places[0].PlaceId
            // // console.log(destId)

            let originId = query.toUpperCase()
            let destId = destQuery.toUpperCase()
            console.log(originId, destId)

            let s = document.getElementById("currencies")
            console.log(s)
            let value = s.options[s.selectedIndex].text
            
            var response
            // response = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/" + originId + "/" + destId + "/" + inDate + "?inboundpartialdate=2021-03-25", reqOptions)
            response = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/" + value + "/en-US/" + originId + "/" + destId + "/" + inDate + "?inboundpartialdate=" + outDate, reqOptions)
            response = await response.json()
            console.log(response)
            if (response.Quotes === undefined) {
                return
            }
            setFlights(response.Quotes)
            setPlaces(response.Places)


            // response = await fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies", reqOptions)
            // response = await response.json()
            // for (let i = 0; i < currencies.length; i++) {
            //     console.log(currencies[i].Code)
            // }

            // setCurrencies(response.Currencies)
        }
        
        fetchMyAPI()
        setShowFlights(true)
        // setQuery("")
        // setDestQuery("")
        // setInDate("")
        // setOutDate("")
    }

    return(
        <div className="airportinfo">
           <form onSubmit={handleSubmit}>
               <table>
                    <tr>
                        <label htmlFor="queryInput">Origin:</label>
                        <input id="queryInput" value={query} onChange={e => setQuery(e.target.value)} required/>
                        
                        <label htmlFor="destQueryInput">Destination:</label>
                        <input id="destQueryInput" value={destQuery} onChange={e => setDestQuery(e.target.value)} required/>
                    </tr>
                    <tr>
                        <label htmlFor="outDate">Departure Date:</label>
                        <input type="date" id="outDate" value={outDate} onChange={e => setOutDate(e.target.value)}></input>
                        <label htmlFor="inDate">Return Date:</label>
                        <input type="date" id="inDate" value={inDate} onChange={e => setInDate(e.target.value)}></input>
                    </tr>
                </table>
                <Currency currencies={currencies}></Currency>
                <button className="search">Submit</button>
           </form>
           { showFlights ? <Flights flights={flights} places={places}></Flights> : <></>}
        </div>
    )
}

export default AirportInfo;
