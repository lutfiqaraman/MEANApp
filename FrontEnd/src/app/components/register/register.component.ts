import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../../services/validation.service';

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

  constructor(private validationRegisterForm: ValidationService ) { }

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
      console.log('Please fill in all required fields');
    }

    this.validationRegisterForm.validateRegsiter(registeredUser);
  }
}
