export function getDate(time) {
    return new Date(time * 1000).toLocaleDateString('en', {weekday: "long", month: "long", day: "2-digit"});
}

export function getCurrentCityTime(time, offset) {
    let currentOffset = -(new Date()).getTimezoneOffset() / 60,
        localTime = time + (offset - currentOffset) * 3600;

    return convertToTime(localTime);
}

export function getWindDirection(val) {
    val = parseFloat(val);
    if ((val >= 0 && val < 10) || (val >= 350 && val < 359.999)) {
        return "N";
    } else if (val >= 10 && val < 80) {
        return "NE";
    } else if (val >= 80 && val < 100) {
        return "E";
    } else if (val >= 100 && val < 170) {
        return "SE"
    } else if (val >= 170 && val < 190) {
        return "S";
    } else if (val >= 190 && val < 260) {
        return "SW"
    } else if (val >= 260 && val < 280) {
        return "W";
    } else {
        return "NW";
    }
}

export function convertToTime(time) {
    let date = new Date(parseFloat(time) * 1000),
        hours = date.getHours(),
        minutes = date.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return hours + ":" + minutes;
}

export function getTimeByOffset(time, offset) {
    let currentOffset = -(new Date()).getTimezoneOffset() / 60,
        localTime = time + (offset - currentOffset) * 3600;

    return convertToTime(localTime);
}

export function getMoonState(val) {
    val = parseFloat(val);

    if (val === 0 || val > 0.75) {
        return 'empty-moon';
    }
    else if (val === 0.25) {
        return 'young-moon';
    }
    else if (val === 0.5) {
        return 'full-moon';
    }
    else if (val === 0.75) {
        return 'old-moon';
    }
    else if (val > 0 && val < 0.25) {
        return 'grow-moon';
    }
    else if (val > 0.25 && val < 0.5) {
        return 'almost-full';
    }
    else if (val > 0.5 && val < 0.75) {
        return 'almost-old';
    }
}