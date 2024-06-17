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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Custom Validators
export function alphabetValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = /^[a-zA-Z]+$/.test(control.value);
    return isValid ? null : { 'alphabetOnly': true };
  };
}

function validatePassword(c: AbstractControl): ValidationErrors | null {
  const password = c.get('password');
  const confirmPassword = c.get('confirmPassword');

  if (password?.pristine || confirmPassword?.pristine) {
    return null;
  }

  if (password?.value !== confirmPassword?.value) {
    return { passwordMisMatch: true };
  }
  return null;
}

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  loginForm!: FormGroup;
  errorMessage: string = '';
  private destroy$ = new Subject<void>();

  get f() {
    return this.loginForm.controls;
  }

  get password() {
    return this.loginForm.get('passwordGroup.password');
  }
  get confirmPassword() {
    return this.loginForm.get('passwordGroup.confirmPassword');
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

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
      const formValues = this.loginForm.value;
      user = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        password: formValues.passwordGroup.password,
        confirmPassword: formValues.passwordGroup.confirmPassword,
        email: formValues.email,
        phone: formValues.phoneNumber,
        gender: formValues.gender,
      } as User;

      this.authService.signup(user).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.toastr.success('Account was created successfully');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          this.toastr.error(err);
          this.errorMessage = err;
        },
      });
    } else {
      this.toastr.warning('Form is invalid');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
