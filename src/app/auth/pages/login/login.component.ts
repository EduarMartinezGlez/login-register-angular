import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
constructor(
  private fb:FormBuilder,
  private authService: AuthService
   ){}
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
  const {email, password}= this.loginForm.value
  this.authService.login(email, password)
  .subscribe(resp =>{
    console.log(resp)
  })
}
}
