import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  ipinfo_token = "7754ebeef5da73"
  ipinfo_url = `https://ipinfo.io/?token=${this.ipinfo_token}`
  gmaps_api = "AIzaSyBMp7FiafypEXvkS4Hrhya4-hhDh3nnlr4";

  node_server_url = "http://localhost:3000/"

  private allRecordsInTableSubject = new Subject<any>();
  allRecordsInTable = this.allRecordsInTableSubject.asObservable();


  private eventDetailsSubject = new Subject<any>();
  eventDetails = this.eventDetailsSubject.asObservable();

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

  async getEventRecords(params: {[key: string]: any}): Promise<any> {

    let url = this.node_server_url + "search?";
    const request = await fetch(url + new URLSearchParams(params));
    const response = await request.json();
    console.log(response);
    this.allRecordsInTableSubject.next(response)
    return response;
  }

  async getEventDetails(params: {[key: string]: any}): Promise<any> {

    let url = this.node_server_url + "eventSearch?";
    const request = await fetch(url + new URLSearchParams(params));
    const response = await request.json();
    console.log(response);
    this.eventDetailsSubject.next(response)
    return response;
  }

  // async autocompleteData(keyword : string) : Promise<any>{
  //   let url = "http://localhost:3000/autocomplete?keyword="+keyword;
  //   const request = await fetch(url);
  //   const response = await request.json();
  //
  //   return response;
  // }

}
