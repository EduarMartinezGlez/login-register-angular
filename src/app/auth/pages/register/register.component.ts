import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }
  registerForm: FormGroup = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.pattern('[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+')
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.pattern('[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+')
      ],
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern('[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+')
      ],
    ],
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
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')
      ],
    ],
    confirmPassword: [
      '',
      [
        Validators.required,
        this.passwordMatch,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$')
      ],
    ],
  });

  register() {
    const { name, lastName, phone, email, password } = this.registerForm.value;
    const user = { email, password };

    this.authService.register(name, lastName, phone, user).subscribe((resp) => {
      //todo funciona, sale swal, y entra al dashboard
      // const val = Object.values(resp);
      // console.log('resputa en el coponente', resp);

      if (resp.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: resp.error.message
        });
      } else {
        //val[0].role === 'Admin';
        this.router.navigateByUrl('/');
      }
    });
    //console.log(this.registerForm.valid);
  }
  passwordMatch(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }
}
