import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductgridComponent } from './productgrid/productgrid.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {path:'', component:ProductgridComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowroomRoutingModule { }
