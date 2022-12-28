import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
constructor(private fb:FormBuilder ){}
loginForm: FormGroup = this.fb.group({
  email:['', [Validators.required,
              Validators.pattern('[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+')
            ]],
  password:['',[
    Validators.required,
     Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')
  ]]
})
login(){
  console.log(this.loginForm.valid)
  console.log(this.loginForm.value)
}
}
