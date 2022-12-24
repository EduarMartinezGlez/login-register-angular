import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { recaptcha } from 'src/environments/environment.prod';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private fb:FormBuilder,
    private router:Router){}

  registerForm:FormGroup=this.fb.group({
    name: ['',[Validators.required]],
    email:['', [Validators.required,Validators.email,Validators.pattern(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/)]],
    recaptcha:['',[Validators.required]]
  })



register(){
console.log(this.registerForm.value);
this.router.navigateByUrl('/dashboard')

}
}
