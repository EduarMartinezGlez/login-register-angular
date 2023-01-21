import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  visitors: any
  private baseUrl = environment.baseUrl;
constructor(private router:Router,
            private userService:AuthService,
            private http: HttpClient,
            private dashboard:DashboardService){ }

  get user(){
    return this.userService.user
  }

logout(){
  this.userService.logOut()
  this.router.navigateByUrl('/auth')
}

ngOnInit() {

 this.dashboard.visitorFunc().subscribe(data => {
 // console.log('valor de la resp', data);
  this.visitors = data
 }
 )
 // console.log('vistor en el comp', this.visitors);
  // const url = `${this.baseUrl}/customers/count`;
  // this.http.get(url).subscribe(data => {
  //   console.log(data);
  //   this.visitors = data
  // });
  // return this.visitors
}
// count(){
//   this.dashboard.visitorFunc().subscribe(data => {
//     console.log('valor de la resp', data);
//     this.visitors = data
//    }
//   )
// }
}

