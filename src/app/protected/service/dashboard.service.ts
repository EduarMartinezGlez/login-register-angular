import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = environment.baseUrl;
  private visitors:any
  constructor(private http: HttpClient) { }

  countCostumers(){
  const url = `${this.baseUrl}/customers/count`;
  this.http.get(url).subscribe(data => {
   // console.log('data en el servico',data);
    this.visitors = data
    //console.log('el vistor en servi', this.visitors);

  });
  return this.visitors
  }

  visitorFunc(){
    const url = `${this.baseUrl}/customers/count`;
    return this.http.get(url)
    //.pipe(
  //     map(data  => {
  //       console.log('el data en el servicio de vistor',data)
  //       data
  //     },
  //     catchError((err) => of(false))
  //   )
  //   )
   }
}
