import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddproductsComponent } from './addproducts/addproducts.component';
import { ProtectedDirective } from '../protected.directive';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EditproductComponent } from './editproduct/editproduct.component';



@NgModule({
    declarations: [
        DashboardComponent,
        ProductComponent,
        AddproductsComponent,
        ProtectedDirective,
        EditproductComponent,

    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProtectedRoutingModule,
        FormsModule,
        SweetAlert2Module
    ]
})
export class ProtectedModule { }
