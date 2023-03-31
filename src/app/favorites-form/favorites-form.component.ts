import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-favorites-form',
  templateUrl: './favorites-form.component.html',
  styleUrls: ['./favorites-form.component.css']
})
export class FavoritesFormComponent implements OnInit{
  allRecordsInFavs: any;

  ngOnInit(): void {

    // console.log("Favs table");
    this.updateRecords();
  }

  updateRecords(){
    let tableValues = localStorage.getItem("fav-table");

    if(tableValues!==null) {
      this.allRecordsInFavs = JSON.parse(tableValues);
    }else{
      this.allRecordsInFavs = null;
    }
  }

  deleteItem(id: any) {
    alert("Removed from Favorites!");
    localStorage.removeItem(id);

    let jsonData : any[] = [];

    if("fav-table" in localStorage){
      jsonData = JSON.parse(localStorage.getItem("fav-table") || '');
    }

    jsonData = jsonData.filter(item=> item.id != id)

    let finalData = JSON.stringify(jsonData);

    localStorage.setItem("fav-table", finalData);

    this.updateRecords();
  }
}
