import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponentComponent } from './components/form-component/form-component.component';
import { ListComponentComponent } from './components/list-component/list-component.component';


const routes: Routes =  [
   { path: "", component: ListComponentComponent }, // the root path (homepage)
   { path: "addIssue", component: FormComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
