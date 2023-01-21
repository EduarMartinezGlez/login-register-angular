import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RecoveryByEmailComponent } from './pages/recovery-by-email/recovery-by-email.component';
import { RecoveryComponent } from './pages/recovery/recovery.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path:'',component:MainComponent,
  children:[
    {path:'login', component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'recovery',component:RecoveryComponent},
    {path:'recoverybyemail',component:RecoveryByEmailComponent},
    {path:'recovery/:token',component:RecoveryComponent},
    {path:'**', redirectTo:'login'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
