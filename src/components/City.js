import React from 'react';
import {getDate, getCurrentCityTime, getWindDirection, getTimeByOffset, getMoonState} from '../parsers';

const City = ({city}) => (
    <div className="town">
        <div className="town-info_updater">
            <time className="last-update">
                {getCurrentCityTime(city.currently.time, city.offset)}
            </time>
        </div>
        <div className="town-info_header">
            <h1 className="current-town">{city.name}</h1>
            <h2 className="addition-town-info">
                <time>
                    {getDate(city.currently.time)}
                </time>
            </h2>
        </div>
        <div className="town-info_weather clearFix">
            <i className={`icon icon-${city.currently.icon} large-icon`}/>
            <p className="weather-state">
                        <span className="weather-state_degrees degrees">
                            {Math.round(city.currently.temperature)}
                        </span>
                <span className="weather-state_description">
                            //{city.currently.summary}
                        </span>
            </p>
            <p className="town-info_daytime">
                <i className={`icon info-daytime_icon icon-${getMoonState(city.daily.data[0].moonPhase)}`}/>
                <time className="info_daytime_now">
                    {getCurrentCityTime(city.daily.data[0].sunriseTime, city.offset)}
                </time>
            </p>
        </div>
        <div className="town-info_details">
            <ul className="details-list">
                <li className="details-item">
                    <div className="details_item-humidity">
                        <i className="icon icon-humidity"/>
                        <span className="humidity-percents details-item_index">
                                    {Math.round(city.currently.humidity * 100)}%
                                </span>
                    </div>
                </li>
                <li className="details-item">
                    <div className="details_item-wind">
                        <i className="icon icon-wind-direction">
                                    <span className="compass-display">
                                        {getWindDirection(city.currently.windBearing)}
                                    </span>
                        </i>
                        <span className="wind-speed details-item_index">
                                    {Math.round(city.currently.windSpeed)}
                                </span>
                    </div>
                </li>
                <li className="details-item">
                    <div className="details_item-sunrise">
                        <i className="icon icon-sunrise"/>
                        <time className="details-item_index">
                            {getTimeByOffset(city.daily.data[0].sunriseTime, city.offset)}
                        </time>
                    </div>
                </li>
                <li className="details-item">
                    <div className="details_item-sunset">
                        <i className="icon icon-sunset"/>
                        <time className="details-item_index">
                            {getTimeByOffset(city.daily.data[0].sunsetTime, city.offset)}
                        </time>
                    </div>
                </li>
            </ul>
        </div>
    </div>
);

export default City;


