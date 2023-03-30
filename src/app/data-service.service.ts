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
    const eventResponse = await request.json();
    this.eventDetailsSubject.next(eventResponse)

    const venueRes = await this.getVenueDetails({"id": eventResponse.venueId})
    this.venueDetailsSubject.next(venueRes);

    let artistRes = await this.getArtistData(eventResponse);
    this.artistsSpotifySubject.next(artistRes);

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
      let artistRequests = []
      for(let i=0; i<data.attractionsMusic.length; i++){
        let url = this.node_server_url + "spotify?";
        // const request =
        // const response = await request.json();
        // const response = request.json();

        artistRequests.push(fetch(url + new URLSearchParams({"artist":data.attractionsMusic[i]})));

        }
      Promise.all(artistRequests)
        .then(results => Promise.all(results.map(r => r.json())))
        .then(value=> {

          console.log("ARTIST_REQUESTS",value);
          for (let val of value) {
            if (Object.keys(val).length !== 0) {
              res.push(val);
            }
          }
        })
      }
      return res;
    }

  // async autocompleteData(keyword : string) : Promise<any>{
  //   let url = "http://localhost:3000/autocomplete?keyword="+keyword;
  //   const request = await fetch(url);
  //   const response = await request.json();
  //
  //   return response;
  // }

}


// References
// https://www.edgesidesolutions.com/using-angular-shared-service/
// https://www.dotnettricks.com/learn/angular/sharing-data-between-angular-components-methods
// https://fireship.io/lessons/sharing-data-between-angular-components-four-methods/
// https://stackoverflow.com/questions/54896470/how-to-return-the-promise-all-fetch-api-json-data
