import { Directive, ElementRef, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appPasswordRegex]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordRegexDirective,
      multi: true,
    },
  ],
})
export class PasswordRegexDirective implements Validator {
  @Input() appPasswordRegex = true;
  validate(control: AbstractControl) {
    return /^(?=.*?[a-zA-Z])(?=.*?[0-9]).*$/.test(control.value) ||
      !this.appPasswordRegex
      ? null
      : { invalidPassword: true };
  }
}
