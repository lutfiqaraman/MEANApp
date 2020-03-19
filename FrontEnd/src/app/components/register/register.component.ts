import { Component, OnInit } from '@angular/core';

import { ValidationService } from '../../services/validation.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(
    private validationRegisterForm: ValidationService,
    private notify: NotificationService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmitRegisterForm() {
    const registeredUser = {
      name: this.name,
      username: this.username,
      password: this.password,
      email: this.email
    };

    if (!this.validationRegisterForm.validateRegsiter(registeredUser)) {
      this.notify.onFail('Please fill in all required fields');
    }

    this.validationRegisterForm.validateRegsiter(registeredUser);

    // Register a user
    this.authService.registerUser(registeredUser).subscribe(data => {
      if (data) {
        this.notify.onSuccess('You are now registered ...');
        this.router.navigate(['/login']);
      } else {
        this.notify.onWarn('You are not registered yet');
        this.router.navigate(['/register']);
      }
    });
  }
}
