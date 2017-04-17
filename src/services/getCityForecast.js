import jQuery from 'jquery';

//hack with jsonp to get data
export default function (city,
                         options = {
                             url: 'https://api.forecast.io/forecast',
                             units: 'units=si',
                             apiKEY: '5fb215f7013d8384bad722001acaa99e'
                         }) {
    return jQuery.ajax({
        url: `${options.url}/${options.apiKEY}/${city.geometry}?${options.units}`,
        dataType: 'jsonp'
    })
        .then(res => {
            return {...city, ...res}
        })
        .catch(err => {
            console.log('getCityForecast error occurred')
        });
}