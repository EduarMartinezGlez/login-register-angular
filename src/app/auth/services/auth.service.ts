import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) { }

  private baseUrl = environment.baseUrl
  private _user!: User

  get user() {
    return { ...this._user }
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth/login`
    const body = { email, password }
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          const val = Object.values(resp)
          // const (id!,name!,role!,email!)= val
          if (val[0].role) {
            localStorage.setItem('token', resp.token!)
            this._user = {
              id: val[0].id!,
              // resp:true,
              lastName:val[0].lastName,

              name: val[0].name!,
              role: val[0].role!,
              token: resp.token!,
              email: val[0].email!
            }
          }
          console.log('valor de la respuesta', val[0].role);
          ;
        }),//executa el codigo antes que pase al otro operador
        map(resp =>
          // resp =this._user
          //console.log('al la salida del login', resp.resp);
          resp),//el servicio le pasa el valor al componente
        catchError(err => of(false))
      )
  }

  validateToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/validate-token`
    console.log('el url del validatetoken', url);
    const token = localStorage.getItem('token')
    console.log('el token :', token);
    return this.http.post<AuthResponse>(url, { token })
      .pipe(
        map(resp => {
          console.log('en el map del validtoken', resp);
          return true
        }),
        catchError(err => of(false))
      )
  }
logOut(){
  localStorage.clear()
}
register(name:string, lastName:string, phone:string, user:object ) {
  const url = `${this.baseUrl}/customers`
  const body = { name, lastName, phone, user }
  return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap(resp => {
       // const val = Object.values(resp)
        console.log('la respuesta en el servicio', resp.id);

        if (resp.role) {
          localStorage.setItem('token', resp.token!)
          this._user = {
            id: resp.id!,
            name: resp.name!,
            lastName: resp.lastName!,
            role: resp.role!,
            token: resp.token!,
            email: resp.email!
          }
        }
        ;
      }),//executa el codigo antes que pase al otro operador
      map(resp =>
        // resp =this._user
        resp),//el servicio le pasa el valor al componente
      catchError(error => of(error))
    )
}

}
