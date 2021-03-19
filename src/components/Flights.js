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
    console.log(codesDict)

    var directDict = {}
    directDict[true] = "Yes"
    directDict[false] = "No"

    return(
        <div className="flights">
            <table>
                <thead>
                    <tr>
                        <th>Min Price</th>
                        <th>Direct</th>
                        <th>Origin Airport</th>
                        <th>Destination Airport</th>
                    </tr>
                </thead>
                <tbody>
                    {props.flights.map(flight => {
                        return (<tr id={flight.QuoteId}>
                            <th>{flight.MinPrice}</th> 
                            <th>{directDict[flight.Direct]}</th>
                            <th>{codesDict[flight.OutboundLeg.OriginId]}</th>
                            <th>{codesDict[flight.OutboundLeg.DestinationId]}</th>
                        </tr>);
                    })}
                </tbody>
            </table>
         </div>
    )
}

export default Flights;