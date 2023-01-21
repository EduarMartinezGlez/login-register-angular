import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../modal/modal/modal.component';
import { ModalModule } from "../modal/modal.module"
import { ModalService } from "../service/modal.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  @ViewChild('ModalModule') modal:
  | ModalComponent<UsersComponent>
  | undefined;
​
newsletterForm: FormGroup;
​
constructor(
  public fb: FormBuilder,
) {
  this.newsletterForm = this.fb.group({
    username: ['', [Validators.required]]
  });
}
​
async createRecord(): Promise<void> {
  console.log(this.newsletterForm.value);
​
  await this.close();
}
​
async close(): Promise<void> {
  await this.modal?.close();
}
}

