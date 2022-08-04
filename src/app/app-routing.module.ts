import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { FormComponentComponent } from './components/form-component/form-component.component';
import { ListComponentComponent } from './components/list-component/list-component.component';


const routes: Routes =  [
   { path: "", component: ListComponentComponent }, // the root path (homepage)
   { path: "addIssue", component: FormComponentComponent }, // add issue form
   { path: "details/:_id", component: DetailsComponent } // view/edit issue details
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
