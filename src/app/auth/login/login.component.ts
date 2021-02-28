import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from 'src/app/library/local-storage';
import { Auth } from 'src/app/library/types';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit {

  user = {
    username: "",
    password: ""
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorage: LocalStorage
  ) { }

  ngOnInit(): void {
  }

  loginUser = (user: Auth) => {
    this.authService.loginUser(user).subscribe(
      (res: any) => {
        this.localStorage.setItem("user", res.data[0]);
        this.router.navigate(['/post']);
      },
      error => {
        console.log(error);
      });
  }

}
