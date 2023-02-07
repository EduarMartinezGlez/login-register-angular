import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowroomRoutingModule } from './showroom-routing.module';
import { ProductgridComponent } from './productgrid/productgrid.component';


@NgModule({
  declarations: [ProductgridComponent ],
  imports: [
    CommonModule,
    ShowroomRoutingModule
  ]
})
export class ShowroomModule { }
