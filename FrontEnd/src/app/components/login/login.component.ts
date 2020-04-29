import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { User } from '../../models/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  user: User = new User();

  constructor(
    private auth: AuthService,
    private router: Router,
    private notify: NotificationService
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    this.auth.login(this.user.username, this.user.password).subscribe(
      (result) => {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('token', result.token);
        }

        this.router.navigate(['/users/profile']);
      },
      (error) => {
        if (error) { throw error; }
      }
    );
    // const loginUser = {
    //   username: this.username,
    //   password: this.password
    // };

    // this.auth.authenticateUser(loginUser).subscribe((data: any) => {
    //   if (data.success) {
    //     this.auth.storeUserData(data.token, data.user);
    //     this.notify.onSuccess('Login successfully');
    //     this.router.navigate(['dashboard']);
    //   } else {
    //     this.notify.onFail(data.msg);
    //     this.router.navigate(['login']);
    //   }
    // });
  }

}
