import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import { SearchFormComponentComponent } from './search-form-component/search-form-component.component';
import { FavoritesFormComponent } from './favorites-form/favorites-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ResultsTableComponent } from './results-table/results-table.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    MainBodyComponent,
    NavbarComponentComponent,
    SearchFormComponentComponent,
    FavoritesFormComponent,
    ResultsTableComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
