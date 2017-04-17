import React from 'react';

const AutoComplete = ({cities, addCity}) => (
    <div className="autoComplete">
        <ul className="noselect">
            {cities.map(city => (
                <li onClick={() => addCity(city.id)}
                    key={city.id}>
                    {city.region.join(', ').substr(0, 47)}
                </li>
            ))}
        </ul>
    </div>
);

export default AutoComplete;