import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidTokenGuard implements CanActivate, CanLoad {

constructor(private authService:AuthService,
            private router:Router){}

  canActivate(): Observable<boolean> | boolean  {
    console.log('canAtive');
    return this.authService.validateToken()
    .pipe(
      tap(valid=>{
        console.log('valor del valid en canactive', valid);

        if(!valid){
          this.router.navigateByUrl('/auth')
        }})
    );
 }
  canLoad():
    Observable<boolean> | boolean  {
      console.log('canload');
      return this.authService.validateToken()
      .pipe(
        tap(valid=>{
          console.log('valor del tap en canload',valid);
          if(!valid){
            this.router.navigateByUrl('/auth')
          }})
      );
  }
}
