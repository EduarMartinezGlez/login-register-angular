import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  siteKey:string
  constructor(
    private recaptchaService:ReCaptchaV3Service,
    private fb:FormBuilder
    ){
    this.siteKey = environment.siteKey
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  loginForm: FormGroup= this.fb.group({
    email: ['',[
      Validators.required,
      Validators.email,
      Validators.pattern(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
     ]],
    password:['',[ Validators.pattern(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
      )]]
  })
}
