import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidTokenGuard } from './auth/guards/valid-token.guard';

const routes: Routes = [

  {
    path:'auth',
    loadChildren:()=> import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
     path:'product',
     loadChildren:()=> import('./showroom/showroom.module').then(m=>m.ShowroomModule)
  },

  {
    path: 'dashboard',
    loadChildren:()=> import('./protected/protected.module').then(m=>m.ProtectedModule),
    // canActivate:[ValidTokenGuard],
    // canLoad:[ValidTokenGuard]
  },
  {
    path:'**',
    redirectTo:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
