/*get city geometry to get city forecast*/

let geocoder = new google.maps.Geocoder();

export default function (city){

    return new Promise((resolve, reject) => {

        geocoder.geocode({placeId: city.id}, function(cityWithGeometry){
            let geometry = cityWithGeometry[0].geometry.location.toString();

            city.geometry = geometry.slice(1, geometry.length - 1);

            resolve(city);
        });
    });
}
