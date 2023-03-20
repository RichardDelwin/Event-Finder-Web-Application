import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchFormComponentComponent} from "./search-form-component/search-form-component.component";
import {FavoritesFormComponent} from "./favorites-form/favorites-form.component";

const routes: Routes = [
  {path: "search", component:SearchFormComponentComponent},
  {path: "favorites", component:FavoritesFormComponent},
  {path: "", redirectTo:"/search", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
