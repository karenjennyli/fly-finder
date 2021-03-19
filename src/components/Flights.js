import React from 'react';
import './Flights.css';

function Flights(props) { 
    // determine airport name based on place id

    var places = props.places // array of places
    var placesDict = {}
    console.log(places)
    for (let i = 0; i < places.length; i++) {
        let currPlace = places[i]
        placesDict[currPlace.PlaceId] = currPlace.IataCode
    }
    console.log(placesDict)

    return(
        <div className="flights">
            <table>
                <thead>
                    <tr>
                        <th>Quote ID</th>
                        <th>Min Price</th>
                        <th>Direct</th>
                        <th>Origin ID</th>
                        <th>Destination ID</th>
                    </tr>
                </thead>
                <tbody>
                    {props.flights.map(flight => {
                        return (<tr id={flight.QuoteId}>
                            <th>{flight.QuoteId}</th>
                            <th>{flight.MinPrice}</th>
                            <th>{flight.Direct}</th>
                            <th>{flight.OutboundLeg.OriginId}</th>
                            <th>{flight.OutboundLeg.DestinationId}</th>
                        </tr>);
                    })}
                </tbody>
            </table>
         </div>
    )
}

export default Flights;