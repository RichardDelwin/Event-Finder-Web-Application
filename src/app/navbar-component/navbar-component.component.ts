import { Component, ElementRef, Renderer2} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent {

  public favoritesButtonBorderColor: string = '#00000000';
  public searchButtonBorderColor: string = 'white';

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
      this.favoritesButtonBorderColor = "rgba(0, 0, 0, 0)";
      this.searchButtonBorderColor = "white";
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
    }
  }

  goToSearch(event : any) {
    const currentColor : string = event.target.style.borderColor;
    if(this.didStateChange(currentColor)) {
      this.swapColors();
      this.router.navigate(['/search']);
    }
  }
}
