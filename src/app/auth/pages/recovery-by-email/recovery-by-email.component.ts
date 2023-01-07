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
  console.log(this.recoveryForm.valid);
  console.log(this.recoveryForm.value);
  const { email } = this.recoveryForm.value;
  this.authService.recoveryPassword(email).subscribe(resp => {
    //todo funciona, sale swal, y entra al dashboard
    console.log('la resp en componente',resp);
    if(!resp){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: resp.error,
      });
    }else{

    }
})
}//else{
 // val[0].role === 'costumers'
  //this.router.navigateByUrl('/prod');
//}
//})
//   console.log("respuesta en el componente login",val[0].role)
//};

}
