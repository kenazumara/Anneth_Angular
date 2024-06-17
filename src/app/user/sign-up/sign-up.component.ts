import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControlName,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/user/user';
import { AuthService } from '../auth.service';
import { ToastrService } from 'src/app/shared/toastr.service';

export function alphabetValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = /^[a-zA-Z]+$/.test(control.value);
    return isValid ? null : { 'alphabetOnly': true };
  };
}

// Custom password validator function
function validatePassword(
  c: AbstractControl
): { [key: string]: boolean } | null {
  const password = c.get('password');
  const confirmPassword = c.get('confirmPassword');

  if (password?.pristine || confirmPassword?.pristine) {
    return null;
  }
  console.log('hello')

  if (password?.value !== confirmPassword?.value) {
    return { passwordMisMatch: true };
  }
  return null;
}

@Component({
  // selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  loginForm!: FormGroup;
  errorMessage: any;

  get f() {
    return this.loginForm.controls;
  }

  get password() {
    return this.loginForm.get('passwordGroup.password');
  }
  get confirmPassword() {
    return this.loginForm.get('passwordGroup.confirmPassword');
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, alphabetValidator()]],
      lastName: ['', [Validators.required, alphabetValidator()]],
      phoneNumber: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: ['', [Validators.required]],
        },
        { validator: validatePassword }
      ),
    });
  }

  signup(user: User): void {
    if (this.loginForm.valid) {
      user = {
        firstName: this.loginForm.value.firstName,
        lastName: this.loginForm.value.lastName,
        password: this.loginForm.value.passwordGroup.password,
        confirmPassword: this.loginForm.value.passwordGroup.confirmPassword,
        email: this.loginForm.value.email,
        phone: this.loginForm.value.phoneNumber,
        gender: this.loginForm.value.gender,
      } as User
      // console.log(user);
      this.authService.signup(user).subscribe({
        next: data => {
          console.log(data)
          this.toastr.success('Accout was created successfully')
          this.router.navigate(['/products'])
        },
        error: err => {
          this.toastr.error(err)
          this.errorMessage = err
        }
      })

    } else {
      this.toastr.warning('Form is invalid')
    }
  }
}