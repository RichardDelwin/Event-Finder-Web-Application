import {Component} from '@angular/core';
import {DataServiceService} from "../data-service.service";
import {ComponentUpdateService} from "../component-update.service";
import {eventDetailsType} from "../types/eventDetails";

@Component({
  selector: 'app-event-tab',
  templateUrl: './event-tab.component.html',
  styleUrls: ['./event-tab.component.css']
})
export class EventTabComponent{

  eventDetails: eventDetailsType | undefined;
  artists: any | undefined;

  constructor(private dataService : DataServiceService, private componentUpdateService : ComponentUpdateService) {
    dataService.eventDetails.subscribe(value=>this.eventDetails = value);
    dataService.artistsSpotify.subscribe(value=>this.artists = value);
  }

  backClicked() {
    console.log("Clicked");
    this.componentUpdateService.updateTableVisibilityOnly("visible");
    this.componentUpdateService.emitEventCardStatus(false);
    // this.componentUpdateService.emitChange(true);
    console.log(this.eventDetails);
    console.log(this.artists);
  }

}
