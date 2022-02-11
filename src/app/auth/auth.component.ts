import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthResponseData, RawUser } from '../user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  public isLoginMode = true;
  private subscriptions: Array<Subscription> = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

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
    const loginSubscription = this.authService.login(user).subscribe();
    this.subscriptions.push(loginSubscription);
  }

  public getPasswordRegex(): string {
    //Must contain at least one English letter (uppercase or lowercase) and at least one digit
    return this.isLoginMode ? '' : '^(?=.*?[a-zA-Z])(?=.*?[0-9]).*$';
  }
}
