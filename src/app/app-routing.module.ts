import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FavoritesFormComponent} from "./favorites-form/favorites-form.component";
import {SearchPageComponent} from "./search-page/search-page.component";

const routes: Routes = [
  {path: "search", component:SearchPageComponent},
  {path: "favorites", component:FavoritesFormComponent},
  {path: "", redirectTo:"/search", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// References
// https://angular.io/guide/router
// https://www.smashingmagazine.com/2018/11/a-complete-guide-to-routing-in-angular/
