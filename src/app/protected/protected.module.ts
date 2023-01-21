import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProductComponent } from './product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from "./modal/modal.module";
import { ModalComponent } from "./modal/modal/modal.component"




@NgModule({
    declarations: [
        DashboardComponent,
        UsersComponent,
        ProductComponent,

    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProtectedRoutingModule,
        ModalModule
    ]
})
export class ProtectedModule { }
