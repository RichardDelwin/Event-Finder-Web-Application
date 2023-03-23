import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComponentUpdateService {

  private show_ResultsTable = new Subject<boolean>();
  // private results_TableRecords = new Subject<any>();
  showResultsTable = this.show_ResultsTable.asObservable();

  private showEventsCardSubject = new Subject<boolean>();
  showEventCard = this.showEventsCardSubject.asObservable();

  private tableVisibilityStatusSubject = new Subject<string>();
  tableVisibilityStatus = this.tableVisibilityStatusSubject.asObservable();


  constructor() { }

  emitChange(change: any){
    this.show_ResultsTable.next(change);
  }

  updateTableVisibilityOnly(change: string){
    this.tableVisibilityStatusSubject.next(change);
  }

  emitEventCardStatus(change: boolean){
    this.showEventsCardSubject.next(change);
  }
}
