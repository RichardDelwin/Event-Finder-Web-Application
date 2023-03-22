import { Component } from '@angular/core';
import {ComponentUpdateService} from "./component-update.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HW8v2';
  showResultsTable : boolean = false;
  constructor(private componentUpdateService : ComponentUpdateService) {
    componentUpdateService.showResultsTable.subscribe(value=>this.showResultsTable = value);
  }
}
