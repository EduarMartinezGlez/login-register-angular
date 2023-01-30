
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DashboardService } from '../service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  visitors: any
  constructor(private router: Router,
    private userService: AuthService,
    private dashboard: DashboardService) { }

  get user() {
    return this.userService.user
  }

  logout() {
    this.userService.logOut()
    this.router.navigateByUrl('/auth')
  }

  ngOnInit() {

    this.dashboard.visitorFunc().subscribe((data) => {
      // console.log('valor de la resp', data);
      this.visitors = data
    },
      (error) => {
        console.log('log del error', error);

      }
    )

  }

}

