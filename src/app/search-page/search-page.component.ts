import { Component } from '@angular/core';
import {ComponentUpdateService} from "../component-update.service";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {
  showResultsTable : boolean = false;
  showEventsTable : boolean = false;
  constructor(private componentUpdateService : ComponentUpdateService) {
    componentUpdateService.showResultsTable.subscribe(value=>this.showResultsTable = value);
    componentUpdateService.showEventCard.subscribe(value => this.showEventsTable = value);
  }
}
