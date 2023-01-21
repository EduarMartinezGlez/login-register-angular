import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recovery-by-email',
  templateUrl: './recovery-by-email.component.html',
  styleUrls: ['./recovery-by-email.component.scss']
})
export class RecoveryByEmailComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }
  recoveryForm: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+'),
      ],
    ],
})
recovery() {
  //console.log(this.recoveryForm.valid);
  //console.log(this.recoveryForm.value);
  const  {email}  = this.recoveryForm.value;
console.log('el email dentro del form', email);

  this.authService.recoveryPassword(email).subscribe(result => {
    //todo funciona, sale swal, y entra al dashboard
    const {message} = result
   // console.log('la resp en componente',message);
    if(!result){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.error,
      });
    }else{
      Swal.fire({
        icon: 'success',
        title: 'OK',
        text: message,
      });
    //  this.router.navigateByUrl('/recoverybyemail');
    }
})
}
}
