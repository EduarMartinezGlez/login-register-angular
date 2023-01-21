import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  AuthResponse,
  RecoveryByEmail,
  User,
} from '../interfaces/auth.interface';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.baseUrl;
  private _user!: User;

  get user() {
    return { ...this._user };
  }
//send the email and password to the backend
  login(email: string, password: string) {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        const val = Object.values(resp);
        // const (id!,name!,role!,email!)= val
        if (val[0].role) {
          localStorage.setItem('token', resp.token!);
          this._user = {
            id: val[0].id!,
            lastName: val[0].lastName,
            name: val[0].name!,
            role: val[0].role!,
            token: resp.token!,
            email: val[0].email!,
          };
        }
      }), //executa el codigo antes que pase al otro operador
      map(
        (resp) =>

          resp
      ), //el servicio le pasa el valor al componente
      catchError((err) => of(false))
    );
  }

  validateToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/validate-token`;
    const token = localStorage.getItem('token');
    return this.http.post<AuthResponse>(url, { token }).pipe(
      map((resp) => {
        return true;
      }),
      catchError((err) => of(false))
    );
  }
  logOut() {
    localStorage.clear();
  }

  register(name: string, lastName: string, phone: string, user: object) {
    const url = `${this.baseUrl}/customers`;
    const body = { name, lastName, phone, user };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        //console.log('la respuesta en el servicio', resp.id);
        if (resp.role) {
          localStorage.setItem('token', resp.token!);
          this._user = {
            id: resp.id!,
            name: resp.name!,
            lastName: resp.lastName!,
            role: resp.role!,
            token: resp.token!,
            email: resp.email!,
          };
        }
      }), //executa el codigo antes que pase al otro operador
      map(resp => resp), //el servicio le pasa el valor al componente
      catchError(error => of(error))
    );
  }

  recoveryPassword(email: string) {
    const url = `${this.baseUrl}/auth/recovery`;
    const body = {email}
    console.log('en el servicio email', body);

    return (
      this.http
        .post<RecoveryByEmail>(url, body)
        // /* A rxjs operator that allows you to execute code before the next operator. */
        .pipe(
          map(resp => resp
            //console.log('el respon en recovery email', {resp});
           // resp;
          ),
          catchError((error) => of(error))
        )
    );
  }
  resetPassword(newPassword: string, token:string) {
    const url = `${this.baseUrl}/auth/change-password`;
    const body = {token,newPassword}
    console.log('en el servicio email', body);

    return (
      this.http
        .post<RecoveryByEmail>(url, body)
        // /* A rxjs operator that allows you to execute code before the next operator. */
        .pipe(
          map(resp => resp
            //console.log('el respon en recovery email', {resp});
           // resp;
          ),
          catchError((error) => of(error))
        )
    );
  }
}
