let citiesService = new google.maps.places.AutocompleteService(null, {types: ['geocode']});

export default function (value) {
    return new Promise((resolve, reject) => {
        if (!value.length) resolve([]);

        citiesService.getPlacePredictions({input: value, types: ['(cities)']}, function (cities, status) {
            if (!cities || status !== 'OK') {
                return resolve([]);
            }

            cities = cities
                .filter((city) => city.types.indexOf("administrative_area_level_3") === -1)
                .map(city => parseCityData(city));

            resolve(cities);
        });
    }).catch(err => {
        console.log('getCities error occurred');
    })
}

function parseCityData(city) {
    let splittedDescrip = city.description.split(',');

    return {
        id: city.place_id,
        name: splittedDescrip[0],
        region: splittedDescrip
    }
}
