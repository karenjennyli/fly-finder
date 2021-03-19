import React from 'react';
// import './Flights.css';

function Currency(props) {
    return(
        <div className="currencies">
            <select id="currencies">
            {props.currencies.map(currency => {
                return (<option value={currency.Code}>{currency.Code}</option>);
            })}
            </select>
        </div>
    )
}

export default Currency;