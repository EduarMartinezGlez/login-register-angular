import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ModalComponent,
    FormComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ModalModule { }
