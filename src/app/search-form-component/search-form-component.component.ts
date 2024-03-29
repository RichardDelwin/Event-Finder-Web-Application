import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {DataServiceService} from "../data-service.service";
import {ComponentUpdateService} from "../component-update.service";
import { debounceTime, tap, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search-form-component',
  templateUrl: './search-form-component.component.html',
  styleUrls: ['./search-form-component.component.css']
})

export class SearchFormComponentComponent implements OnInit{
  isChecked: any;
  addressIsDisabled: boolean = false;
  selectedCategory: string = 'Default';
  selectedLocation: string = '';
  enteredKeyword: string = '';
  enteredDistance: Number = 10;
  searchMoviesCtrl = new FormControl();
  minLengthTerm = 1;
  suggestedAttractions: string[] = [];
  isLoading = false;
  constructor(private dataService : DataServiceService, private componentUpdateService: ComponentUpdateService) {
  }

  ngOnInit(){
    this.searchMoviesCtrl.valueChanges
      .pipe(
        filter(res => {
          if(res.length == 0){
            this.suggestedAttractions=[];
          }
          return res !== null && res.length >= this.minLengthTerm;
        }),
        distinctUntilChanged(),
        debounceTime(100),
      tap(()=>{
        this.suggestedAttractions=[];
        this.isLoading= true})).
    subscribe(keyword=>{
      this.autoComplete(keyword);
      // console.log(this.suggestedAttractions);
    })
  }

  autoComplete(keyword : string){

    const url = "https://myloth-hw8-backend-icno4892.wl.r.appspot.com/autocomplete?keyword="+keyword;
    fetch(url)
      .then(res=> res.json())
      .then(res=>{
        // console.log(res);
        this.suggestedAttractions=[]

        for(let i=0; i<res.length; i++){
          this.suggestedAttractions.push(res[i]);
        }
        this.isLoading=false;
      })
    // console.log("suggestedAttractions = ",this.suggestedAttractions);
  }

  async onSearch(f: NgForm) {

    this.cleanComponents();

    this.suggestedAttractions=[];
    // console.log(f);
    let formData = {
      keyword: this.enteredKeyword,
      category: f.value["category-field"],
      distance: (f.value["distance-field"] =="")? 10: f.value["distance-field"],
      latitude:"",
      longitude: ""
    }

    if(this.isChecked){
      let location = await this.dataService.getCurrentLocation()
      formData.latitude = location.latitude;
      formData.longitude = location.longitude;
    }
    else{
      let location = await this.dataService.geocodeAddress(f.value["location-field"]);
      if(location) {
        formData.latitude = location.latitude;
        formData.longitude = location.longitude;
      }
    }
    // console.log(formData);
    this.dataService.getEventRecords(formData);
    this.componentUpdateService.emitChange(true);
    this.componentUpdateService.updateTableVisibilityOnly("visible");
    this.componentUpdateService.emitEventCardStatus(false);
  }

  onClear() {
    this.enteredKeyword = '';
    this.enteredDistance = 10;
    this.selectedCategory = 'Default';
    this.selectedLocation = '';
    this.addressIsDisabled = false;
    this.isChecked = false;
    this.componentUpdateService.emitChange(false);
    this.componentUpdateService.updateTableVisibilityOnly("visible");
    this.componentUpdateService.emitEventCardStatus(false);
  }

  checkboxUpdated() {
    if(this.isChecked){
      this.selectedLocation = '';
      this.addressIsDisabled = true;
    }
    else{
      this.addressIsDisabled = false;
    }
  }

  cleanComponents(){
    this.componentUpdateService.emitChange(false);
    this.componentUpdateService.emitEventCardStatus(false);
    this.componentUpdateService.updateTableVisibilityOnly("visible");
  }
}


// References
// https://www.edgesidesolutions.com/using-angular-shared-service/
// https://www.dotnettricks.com/learn/angular/sharing-data-between-angular-components-methods
// https://fireship.io/lessons/sharing-data-between-angular-components-four-methods/
// Autocomplete - link provided in HW instructions
// https://stackoverflow.com/questions/44213789/angular-validation-with-required-not-working

