import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginError, User, UserProfile } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  login() {
    const loginData: UserProfile = {
      user: this.user
    };

    // 方法1: 單純的成功後轉頁，不會處理錯誤
    // this.userService.login(loginData).subscribe(result => {
    //   console.log(result);
    //   this.router.navigateByUrl('/');
    // });

    // 方法2: subscribe 內加上 next, error 方法處理錯誤
    // const observer: Observer<User> = {
    //   next: (result: User) => {
    //     console.log(result);
    //     this.router.navigateByUrl('/');
    //   },
    //   error: (err: HttpErrorResponse) => {
    //     alert((err.error as LoginError).body[0]);
    //   },
    //   complete: () => {}
    // };

    // this.userService.login(loginData).subscribe(observer);

    // 方法3: 使用 catchError 處理錯誤，也可以再使用 throwError 拋出錯誤
    this.userService
      .login(loginData)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          alert((err.error as LoginError).body[0]);
          return throwError(err);
          // return of(null);
        })
      )
      .subscribe((data: UserProfile) => {
        localStorage.setItem('token', data.user.token);
        this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('redirect'));
      });

  }
}
