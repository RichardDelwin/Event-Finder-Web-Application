import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  ipinfo_token = "7754ebeef5da73"
  ipinfo_url = `https://ipinfo.io/?token=${this.ipinfo_token}`
  gmaps_api = "AIzaSyBMp7FiafypEXvkS4Hrhya4-hhDh3nnlr4";
  constructor() { }

  async getCurrentLocation() : Promise<any>{

    const res = await fetch(this.ipinfo_url);
    const jsonRes = await res.json();
    let [latitude, longitude] = jsonRes.loc.split(',');
    return { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };

  }

  async geocodeAddress(location_value: string){

    const encoded_location =  encodeURIComponent(location_value);
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_location}&key=${this.gmaps_api}`;
    let jsonResponse;

    let result = null;

    try{
      const geocode_request = await fetch(geocodeUrl);
      jsonResponse = await geocode_request.json();

      const locationDetails = jsonResponse.results[0]["geometry"]["location"];

      const lat = locationDetails["lat"];
      const long = locationDetails["lng"];
      result = {"latitude" : lat, "longitude" : long};
    }
    catch(error){
      console.log(error);
    }
    return result;
  }

}
