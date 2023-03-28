import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent implements OnInit{

  public favoritesButtonBorderColor: string = '#00000000';
  public searchButtonBorderColor: string = 'white';

  // routerState :string = "";

  constructor(public router: Router) {
      // this.routerState = router.url;
  }

  ngOnInit() {
    // if(this.router.url == '/search') {
    //   console.log("Route = ",this.router.url);
    //   this.favoritesButtonBorderColor = "white";
    //   this.searchButtonBorderColor = "rgba(0, 0, 0, 0)";
    //
    // }
    // else{
    //   this.favoritesButtonBorderColor = "rgba(0, 0, 0, 0)";
    //   this.searchButtonBorderColor = "white";
    // }
  }

  didStateChange = (x:string)=> x!="white";
  swapColors(){
    let temp = this.searchButtonBorderColor;
    this.searchButtonBorderColor = this.favoritesButtonBorderColor;
    this.favoritesButtonBorderColor = temp;
  }

  goToFavorites(event : any){

    const currentColor : string = event.target.style.borderColor;
    if(this.didStateChange(currentColor)) {

      this.swapColors();
      this.router.navigate(['/favorites']);
      // this.routerState = '/favorites'
    }
  }

  goToSearch(event : any) {
    const currentColor : string = event.target.style.borderColor;
    if(this.didStateChange(currentColor)) {
      this.swapColors();
      this.router.navigate(['/search']);
      // this.routerState = '/search'
    }
  }
}


// References
// https://angular.io/guide/router
// https://stackoverflow.com/questions/34597835/how-to-get-current-route
// https://stackoverflow.com/questions/71553969/assigning-background-color-border-color-to-buttons-dynamically-in-angular
// https://stackoverflow.com/questions/59939601/add-border-and-background-color-when-i-click-the-yes-button
// https://angular.io/guide/event-binding-concepts
