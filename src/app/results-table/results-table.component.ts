import { Component } from '@angular/core';
import {DataServiceService} from "../data-service.service";

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css']
})
export class ResultsTableComponent {

  allRecordsInTable : any;
  constructor(private dataService : DataServiceService) {
    dataService.allRecordsInTable.subscribe(value=>this.allRecordsInTable = value);
  }

  recordClicked(row: any) {
    console.log(row)
  }
}
