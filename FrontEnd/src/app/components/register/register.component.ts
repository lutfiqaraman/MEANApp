import { Component, OnInit } from '@angular/core';

import { ValidationService } from '../../services/validation.service';
import { NotificationService } from 'src/app/services/notification.service';

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
    private notify: NotificationService ) { }

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
    } else {
      this.notify.onSuccess('User has been registered');
    }

    this.validationRegisterForm.validateRegsiter(registeredUser);
  }
}
