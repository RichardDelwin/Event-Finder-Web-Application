import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  ipinfo_token = "7754ebeef5da73"
  ipinfo_url = `https://ipinfo.io/?token=${this.ipinfo_token}`
  gmaps_api = "AIzaSyBMp7FiafypEXvkS4Hrhya4-hhDh3nnlr4";

  node_server_url = "http://localhost:3500/"

  private allRecordsInTableSubject = new Subject<any>();
  allRecordsInTable = this.allRecordsInTableSubject.asObservable();


  private eventDetailsSubject = new Subject<any>();
  eventDetails = this.eventDetailsSubject.asObservable();

  private artistsSpotifySubject = new Subject<any>();
  artistsSpotify = this.artistsSpotifySubject.asObservable();

  private venueDetailsSubject = new Subject<any>();
  venueDetails = this.venueDetailsSubject.asObservable();

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
    this.eventDetailsSubject.next(response)

    let venueRes = await this.getVenueDetails({"keyword": response.venue})
    this.venueDetailsSubject.next(venueRes);

    let res = await this.getArtistData(response);
    this.artistsSpotifySubject.next(res);

    return response;
  }

  async getVenueDetails(params: {[key:string]: any}) : Promise<any>{

    let url = this.node_server_url + "venueSearch?";
    const request = await fetch(url + new URLSearchParams(params));
    const response = await request.json();
    return response;
  }

  async getArtistData(data: any){

    let res : any = []
    if(data.attractionsMusic.length == 0){
      return res;
    }
    else{
      for(let i=0; i<data.attractionsMusic.length; i++){
        let url = this.node_server_url + "spotify?";
        const request = await fetch(url + new URLSearchParams({"artist":data.attractionsMusic[i]}));
        const response = await request.json();
        res.push(response);
      }
      return res;
    }

  }

  // async autocompleteData(keyword : string) : Promise<any>{
  //   let url = "http://localhost:3000/autocomplete?keyword="+keyword;
  //   const request = await fetch(url);
  //   const response = await request.json();
  //
  //   return response;
  // }

}
