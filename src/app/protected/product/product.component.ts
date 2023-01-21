import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormComponent } from '../modal/form/form.component';
import { ModalComponent } from '../modal/modal/modal.component';
import { ModalService } from '../service/modal.service';
import { UsersComponent as UsersComponentType} from '../users/users.component';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  component = ModalComponent;

  constructor(private modalService: ModalService<UsersComponentType>) {}
  ​
    async showNewsletter(): Promise<void> {
      const {UsersComponent} = await import(
        '../users/users.component'
      );
  ​
      await this.modalService.open(UsersComponent);
    }
addProduct(){

}
}
