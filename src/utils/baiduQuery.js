import axios from 'axios'
const ak = 'YC8DWemOR8iZ12lUX7b63XAGWbNSgqmI'

export async function searchLocation(param){
    let resp = await axios
    .get(`https://api.map.baidu.com/place/v2/search?query=${param}&region=成都&output=json&ak=${ak}`);
    return resp.data.results
}

export async function searchLocationByCoordinate(location){
    let resp = await axios
    .get(`http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=30.551020799999996,104.06756279999999&output=json&pois=0&ak=YC8DWemOR8iZ12lUX7b63XAGWbNSgqmI`);
    return JSON.parse(resp.data.slice(29,resp.data.length-1)).result.formatted_address
}