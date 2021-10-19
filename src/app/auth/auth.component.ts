import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public isLoginMode = true;
  //Must contain at least one English letter (uppercase or lowercase) and at least one digit
  public passwordRegex = '^(?=.*?[a-zA-Z])(?=.*?[0-9]).*$';

  constructor() {}

  ngOnInit(): void {}

  public onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(form: NgForm): void {
    form.reset();
  }
}
