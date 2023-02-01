import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss',
],
})
export class LoginComponent {
  isValid: boolean = true;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  loginForm: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+'),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
        ),
      ],
    ],
  });


  validedCamp(field:string){
    const control = this.loginForm.get(field);

if (control?.valid && control.touched) {
  // Si el campo es válido y ha sido tocado, muestra un mensaje de campo
  return this.isValid = true;

            }else if(!control?.touched){
              return this.isValid = true
            }
            else{
              console.log('false:');
              return this.isValid = false
            }
   }
  login() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(resp => {
      //todo funciona, sale swal, y entra al dashboard

      if (resp === false) {
        console.warn('resp en ifelse', resp);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'unauthorized',
        });

    }const val = Object.values(resp)
    if (  val[0].role === 'Admin' )
      {
      //  console.log('respuesta si if es igal a admin', val[0].role);
        this.router.navigateByUrl('/dashboard');
      }else{
        val[0].role === 'costumers'
        this.router.navigateByUrl('/recovery');
      }
    })
    //   console.log("respuesta en el componente login",val[0].role)
  };
}
