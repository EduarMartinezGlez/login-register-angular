import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { UsersComponent } from './users/users.component';
import { AddproductsComponent } from './addproducts/addproducts.component';



const routes: Routes = [
  {
    path:'',
    children:[
      //add the route to grafic
      {path:'', component:DashboardComponent},
      {path:'users', component:UsersComponent},
      {path:'Products', component:ProductComponent},
      {path:'AddProducts', component:AddproductsComponent},

      {path:'**', redirectTo:''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
