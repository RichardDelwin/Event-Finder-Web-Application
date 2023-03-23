import { Component } from '@angular/core';
import {DataServiceService} from "../data-service.service";
import {ComponentUpdateService} from "../component-update.service";

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css']
})
export class ResultsTableComponent {

  allRecordsInTable : any;
  classVisibility: string = "visible";
  constructor(private dataService : DataServiceService, private componentUpdateService : ComponentUpdateService) {
    dataService.allRecordsInTable.subscribe(value=>this.allRecordsInTable = value);
    componentUpdateService.tableVisibilityStatus.subscribe(value=>this.classVisibility = value);
  }

  recordClicked(row: any) {
    console.log(row.id)
    this.dataService.getEventDetails({"id":row.id});
    // this.componentUpdateService.emitChange(false);
    this.componentUpdateService.updateTableVisibilityOnly("table-invisible");
    this.componentUpdateService.emitEventCardStatus(true);

  }
}
