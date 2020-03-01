import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LocalStorageService} from "angular-2-local-storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel:LoginViewModel = {
    username: '',
    password: ''
  };

  userInfo: any;
  constructor(private http: HttpClient,
              private router: Router,
              private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  login() : void {
    let url = "http://localhost:8080/users/login";
    this.http.post(url, this.loginModel).subscribe(
      res => {
        this.userInfo = res;
        if (this.userInfo == null) {
          alert("login informations wrong.");
          location.reload();
        }
        else {
          this.localStorageService.clearAll();
          this.localStorageService.add("userId", this.userInfo.id) ;
          this.localStorageService.add("username", this.userInfo.username) ;
          this.localStorageService.add("isAdmin", this.userInfo.isAdmin) ;
          this.localStorageService.add("userCount", this.userInfo.userCount) ;

          this.router.navigate(['/posts']);
        }

      },
      err => {
        alert("An error occured while login" + err.toString());
      }
    )
  }
}

export interface LoginViewModel {
  username: string,
  password: string
}
