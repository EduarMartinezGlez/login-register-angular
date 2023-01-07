import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MainComponent } from './pages/main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RecoveryByEmailComponent } from './pages/recovery-by-email/recovery-by-email.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    MainComponent,
    RecoveryComponent,
    RecoveryByEmailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule

  ]
})
export class AuthModule { }
