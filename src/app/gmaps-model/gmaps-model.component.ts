import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'
import {DataServiceService} from "../data-service.service";
@Component({
  selector: 'app-gmaps-model',
  templateUrl: './gmaps-model.component.html',
  styleUrls: ['./gmaps-model.component.css']
})
export class GmapsModelComponent {

  markerPosition : any | undefined;
  mapOptions: google.maps.MapOptions | undefined;
  constructor(private dataService : DataServiceService) {
    dataService.venueDetails.subscribe(value=> this.updateData(value));
  }

  updateData(value: any){

    this.markerPosition = {lat: value.venueLocation.latitude, lng: value.venueLocation.longitude};

    this.mapOptions = {
      center: this.markerPosition || null,//{ lat: 38.9987208, lng: -77.2538699 },
      zoom : 14
    }

    // console.log("UpdateData", value);
  }


}


// References
// https://medium.com/swlh/angular-google-map-component-basics-and-tips-7ff679e383ff
