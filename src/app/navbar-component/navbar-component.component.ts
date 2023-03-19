import { Component, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-component.component.html',
  styleUrls: ['./navbar-component.component.css']
})
export class NavbarComponentComponent {

  public favoritesButtonBorderColor: string = '#00000000';
  public searchButtonBorderColor: string = 'white';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
      this.favoritesButtonBorderColor = "rgba(0, 0, 0, 0)";
      this.searchButtonBorderColor = "white";
  }

  navClick(event : any) {
    const currentColor : string = event.target.style.borderColor;
    console.log(currentColor);

    if(currentColor!="white"){
      let temp = this.searchButtonBorderColor;
      this.searchButtonBorderColor = this.favoritesButtonBorderColor;
      this.favoritesButtonBorderColor = temp;
    }
  }
}
