import React from 'react';
import './Flights.css';

function Flights(props) { 
    var places = props.places // array of places
    var codesDict = {}
    var namesDict = {}
    for (let i = 0; i < places.length; i++) {
        let currPlace = places[i]
        codesDict[currPlace.PlaceId] = currPlace.IataCode
        namesDict[currPlace.PlaceId] = currPlace.Name
    }

    var directDict = {}
    directDict[true] = "Yes"
    directDict[false] = "No"

    var currencies = props.currencies
    var symbolsDict = {}
    for (let i = 0; i < currencies.length; i++) {
        symbolsDict[currencies[i].Code] = currencies[i].Symbol
    }

    var flights = props.flights
    if (flights.length > 0) var MinPrice = flights[0].MinPrice
    else var MinPrice = 0
    for (let i = 0; i < flights.length; i++) {
        if (flights[i].MinPrice < MinPrice) MinPrice = flights[i].MinPrice
    }

    var pricesDict = {}
    for (let i = 0; i < flights.length; i++) {
        pricesDict[flights[i].MinPrice] = ""
    }
    pricesDict[MinPrice] = "☆"

    return(
        <div className="flights">
            <table>
                <thead>
                    <tr>
                        <th>Price ({symbolsDict[props.currCurrency]})</th>
                        <th>Origin Airport</th>
                        <th>Destination Airport</th>
                        <th>Carrier</th>
                        <th>Direct</th>
                    </tr>
                </thead>
                <tbody>
                    {props.flights.map(flight => {
                        return (<tr id={flight.QuoteId}>
                            <th>{pricesDict[flight.MinPrice]} {flight.MinPrice}</th> 
                            <th>{namesDict[flight.OutboundLeg.OriginId]} ({codesDict[flight.OutboundLeg.OriginId]})</th>
                            <th>{namesDict[flight.OutboundLeg.DestinationId]} ({codesDict[flight.OutboundLeg.DestinationId]})</th>
                            <th>Carrier</th>
                            <th>{directDict[flight.Direct]}</th>
                        </tr>);
                    })}
                </tbody>
            </table>
         </div>
    )
}

export default Flights;