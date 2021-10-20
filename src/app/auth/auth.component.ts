import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthResponseData, RawUser } from '../user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public isLoginMode = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm): void {
    // Just in case user tries to manually avoid validation from the browser dev tools
    if (!form.valid) {
      return;
    }
    if (this.isLoginMode) {
      const user = {
        email: form.value.email,
        password: form.value.password,
      };

      this.logInUser(user);
    } else {
      const user = {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password,
      };

      this.signUpUser(user);
    }
    form.reset();
  }

  private signUpUser(newUser: RawUser) {
    this.authService
      .signup(newUser)
      .subscribe((responseData: AuthResponseData) => console.log(responseData));
  }

  private logInUser(user: RawUser) {
    this.authService
      .login(user)
      .subscribe((responseData: AuthResponseData) => console.log(responseData));
  }

  public getPasswordRegex(): string {
    //Must contain at least one English letter (uppercase or lowercase) and at least one digit
    return this.isLoginMode ? '' : '^(?=.*?[a-zA-Z])(?=.*?[0-9]).*$';
  }
}
