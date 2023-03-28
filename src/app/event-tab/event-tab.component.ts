import {Component, OnInit} from '@angular/core';
import {DataServiceService} from "../data-service.service";
import {ComponentUpdateService} from "../component-update.service";
import {eventDetailsType} from "../types/eventDetails";

@Component({
  selector: 'app-event-tab',
  templateUrl: './event-tab.component.html',
  styleUrls: ['./event-tab.component.css']
})
export class EventTabComponent implements OnInit {

  eventDetails: eventDetailsType | undefined;
  public artists: any | undefined;

  venueDetails : any;
  show: boolean = false;
  show_gr: boolean = false;
  show_cr: boolean = false;

  constructor(private dataService : DataServiceService, private componentUpdateService : ComponentUpdateService) {
    dataService.eventDetails.subscribe(value=>this.eventDetails = value);
    dataService.artistsSpotify.subscribe(value=>this.artists = value);
    dataService.venueDetails.subscribe(value=>this.venueDetails = value);
  }

  backClicked() {
    console.log("Clicked");
    this.componentUpdateService.updateTableVisibilityOnly("visible");
    this.componentUpdateService.emitEventCardStatus(false);
    // this.componentUpdateService.emitChange(true);
    console.log(this.eventDetails);
    console.log(this.artists);
    console.log(this.venueDetails);
  }

  ngOnInit(): void {
  }

  encodeURITwitter(name: string) {
    name = "Check "+name;
    return encodeURI(name);
  }

  isHearted(id:string){
    return localStorage.getItem(id) !== null;
  }

  private Heartit(data : any){

    alert("Event Added to Favorites!");
    localStorage.setItem(data.id, "true");

    let jsonData : any[] = [];

    if("fav-table" in localStorage){
      jsonData = JSON.parse(localStorage.getItem("fav-table") || "");
    }

    jsonData.push({
      id : data.id,
      date : data.localDate,
      event : data.name,
      category: data.classifications.join(" | "),
      venue : data.venue,
    });

    let finalData = JSON.stringify(jsonData);

    localStorage.setItem("fav-table", finalData);
  }
  private DeHeartIt(id: string) {

    alert("Event Removed from Favorites!");
    localStorage.removeItem(id);

    let jsonData : any[] = [];

    if("fav-table" in localStorage){
      jsonData = JSON.parse(localStorage.getItem("fav-table") || '');
    }

    jsonData = jsonData.filter(item=> item.id != id)

    let finalData = JSON.stringify(jsonData);

    localStorage.setItem("fav-table", finalData);

  }

  HeartOrDeheart(data:any) {

    let id = data.id;

    if(this.isHearted(id)) {
      this.DeHeartIt(id);
    }else{
      this.Heartit(data);
    }

  }
}


//References
//https://javascript.plainenglish.io/how-to-remove-an-element-from-an-array-in-javascript-54612785295e
// https://stackoverflow.com/questions/3357553/how-do-i-store-an-array-in-localstorage
