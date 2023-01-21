import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @ViewChild('modalComponent') modal:
  | ModalComponent<FormComponent>
  | undefined;

  constructor(
    private fb: FormBuilder,
    ) {}
    Form: FormGroup = this.fb.group({
      username: ['', [Validators.required]]
    });


async createRecord(): Promise<void> {
  console.log(this.Form.value);

  await this.close();
}

async close(): Promise<void> {
  await this.modal?.close();
}
}
