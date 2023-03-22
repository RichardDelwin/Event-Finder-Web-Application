import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComponentUpdateService {

  private show_ResultsTable = new Subject<boolean>();
  // private results_TableRecords = new Subject<any>();
  showResultsTable = this.show_ResultsTable.asObservable();

  constructor() { }

  emitChange(change: any){
    this.show_ResultsTable.next(change);
  }
}
