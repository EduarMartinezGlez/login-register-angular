import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
constructor(
  private fb:FormBuilder,
  private authService: AuthService,
  private router:Router
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
    const val = Object.values(resp)
    if(val[0].role == 'admin'){
      this.router.navigateByUrl('/dashboard')
    }
    console.log("respuesta en el componente login",val[0].role)
  })
}
}
