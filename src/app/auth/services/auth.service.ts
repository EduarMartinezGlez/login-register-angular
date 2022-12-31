import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) { }

  private baseUrl = environment.baseUrl
  private _user!: User

  get user(){
    return {...this._user}
  }

  login(email:string, password:string){
    const url =`${this.baseUrl}/auth/login`
    const body = {email, password }
   return this.http.post<AuthResponse>(url, body )
   .pipe(
      tap(resp =>{
        const val = Object.values(resp)
        if( val[0].role ){
          this._user ={
            id:val[0].id!,
            name:val[0].name!,
            role:val[0].role!,
            token:resp.token!,
            email:val[0].email!
          }
        }
        console.log('valor de la respuesta',val[0].role);
        ;
      }),//executa el codigo antes que pase al otro operador
    map(resp => resp),//el servicio le pasa el valor al componente
    catchError(err=> of(false) )
   )
  }
}
