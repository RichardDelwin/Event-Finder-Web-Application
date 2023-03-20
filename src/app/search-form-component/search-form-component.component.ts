import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataServiceService} from "./data-service.service";

@Component({
  selector: 'app-search-form-component',
  templateUrl: './search-form-component.component.html',
  styleUrls: ['./search-form-component.component.css']
})

export class SearchFormComponentComponent {
  isChecked: any;
  addressIsDisabled: boolean = false;
  selectedCategory: string = 'Default';
  selectedLocation: string = '';
  enteredKeyword: string = '';
  enteredDistance: string = '';

  constructor(private dataService : DataServiceService) {
  }

  async onSearch(f: NgForm) {

    console.log(f);
    let formData = {
      keyword: f.value["keyword-field"],
      category: f.value["category-field"],
      distance: (f.value["distance-field"] =="")? 10: f.value["distance-field"],
      latitude:"",
      longitude: ""
    }

    console.log(formData);
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

    console.log(formData);
  }

  onClear() {
    this.enteredKeyword = '';
    this.enteredDistance = '';
    this.selectedCategory = 'Default';
    this.selectedLocation = '';
    this.addressIsDisabled = false;
    this.isChecked = false;
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
}
