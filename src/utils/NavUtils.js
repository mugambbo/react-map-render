const NavUtils = {

    appendQueryParam: (location, key, value) => {
        let currentUrlParams = new URLSearchParams(location.search);
        currentUrlParams.set(key, value);
        return location.pathname + "?" + currentUrlParams.toString();
    },

    getQueryParam: (location, key) => {
        let currentUrlParams = new URLSearchParams(location.search);
        return currentUrlParams.get(key);
    }
}

const BundleKeys = {
    zoom: 'zoom',
    center: 'center',
    coordinates: 'coord',
    points: 'points',
    geocoord: 'geocoord',
    mapType: 'maptype',
    apikey: 'apikey'
}

export default NavUtils;
export { BundleKeys };