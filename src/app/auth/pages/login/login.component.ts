import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  siteKey:string
  constructor(private recaptchaService:ReCaptchaV3Service){
    this.siteKey = environment.siteKey
  }



  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
