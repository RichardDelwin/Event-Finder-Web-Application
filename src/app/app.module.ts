import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import { SearchFormComponentComponent } from './search-form-component/search-form-component.component';

@NgModule({
  declarations: [
    AppComponent,
    MainBodyComponent,
    NavbarComponentComponent,
    SearchFormComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
