import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent  {
  token!: string;
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private fb: FormBuilder,
              private authService: AuthService,){}
    // ngOnInit() {
    //   this.token = this.route.snapshot.paramMap.get('token')!;
    // }

              resetForm: FormGroup = this.fb.group({
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
                // confirmPassword:[
                //   '',
                //   [
                //     Validators.required,
                //     Validators.pattern(
                //       '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
                //     ),
                //   ],
                // ]
            })

            recovery() {
              console.log(this.resetForm.valid);
              console.log(this.resetForm.value);
              const {password} = this.resetForm.value
              this.route.queryParams.subscribe(params => {
                this.token = params['token'];
                console.log('eltoken en la url', this.token);

                this.authService.resetPassword(password, this.token).subscribe(resp => {
                  console.log('la respusta en el componet',resp);

                });
              });
              // this.route.paramMap.subscribe(params => {
                // const token = params.get('token');
              }
              //);

           //   this.authService.resetPassword(email, token).subscribe(result => {

            }
//            }}
