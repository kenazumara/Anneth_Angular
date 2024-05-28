import {
  Component,
  OnInit,
  AfterViewInit,
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
import { Observable, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from 'src/app/user/user';

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
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements!: ElementRef[];

  loginForm!: FormGroup;

  get f() {
    return this.loginForm.controls;
  }

  get password() {
    return this.loginForm.get('passwordGroup.password');
  }
  get confirmPassword() {
    return this.loginForm.get('passwordGroup.confirmPassword');
  }

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

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
      }
      // console.log(user);
      this.authService.signup(user).subscribe(data => {
        console.log(data)
        this.router.navigate(['/products'])
      })

    } else {
      console.log('Form is invalid');
      // this.setMessage(this.loginForm);
    }
  }
}



// import { Component, OnInit } from '@angular/core';
// import {
//   AbstractControl,
//   FormBuilder,
//   FormGroup,
//   Validators,
// } from '@angular/forms';
// import { GenericValidator } from '../../shared/generic-validator';

// function validatePassword(
//   c: AbstractControl
// ): { [key: string]: boolean } | null {
//   const password = c.get('password');
//   const confirmPassword = c.get('confirmPassword');

//   if (password && confirmPassword) {
//     if (password.value === confirmPassword.value) {
//       return null;
//     }
//   }
//   return { passwordMisMatch: true };
// }

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css'],
// })
// export class SignUpComponent implements OnInit {
//   loginForm!: FormGroup;

//   get email() {
//     return this.loginForm.get('email');
//   }
//   get password() {
//     return this.loginForm.get('password');
//   }
//   get confirmPassword() {
//     return this.loginForm.get('confirmPassword');
//   }

//   // Use with the generic validation message class
//   displayMessage: { [key: string]: string } = {};
//   private validationMessages: { [key: string]: { [key: string]: string } };
//   private genericValidator: GenericValidator;

//   constructor(private fb: FormBuilder) {
//     this.validationMessages = {
//       email: {
//         required: 'Email is required.',
//       },
//       password: {
//         required: 'Password is required.',
//         minlength: 'Password must be at least eight characters.',
//       },
//       confirmPassword: {
//         minlength: 'confirm paswword must be at least eight characters.',
//         passwordMisMatch: 'Passwords do not match.',
//       },
//     };

//     // Define an instance of the validator for use with this form,
//     // passing in this form's set of validation messages.
//     this.genericValidator = new GenericValidator(this.validationMessages);
//   }

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       passwordGroup: this.fb.group(
//         {
//           password: ['', [Validators.required, Validators.minLength(8)]],
//           confirmPassword: ['', [Validators.minLength(8)]],
//         },
//         validatePassword
//       ),
//     });

//     // Set validation messages on form control
//     this.loginForm
//       .get('passwordGroup.confirmPassword')!
//       .setValidators([
//         Validators.required,
//         Validators.minLength(8),
//         this.passwordMatchValidator.bind(this),
//       ]);
//   }

//   passwordMatchValidator(
//     control: AbstractControl
//   ): { [key: string]: boolean } | null {
//     if (this.loginForm) {
//       return control.value ===
//         this.loginForm.get('passwordGroup.password')!.value
//         ? null
//         : { passwordMisMatch: true };
//     }
//     return null;
//   }

//   signup(form: FormGroup) {
//     console.log(form.value);
//   }
// }

// import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, AbstractControl, FormControlName } from '@angular/forms';
// import { GenericValidator } from '../../shared/generic-validator';
// import { fromEvent, merge } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';

// function validatePassword(c: AbstractControl): { [key: string]: boolean } | null {
//   const password = c.get('password');
//   const confirmPassword = c.get('confirmPassword');

//   if (password && confirmPassword && password.value !== confirmPassword.value) {
//     return { passwordMisMatch: true };
//   }
//   return null;
// }

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css']
// })
// export class SignUpComponent implements OnInit {
//   @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

//   loginForm!: FormGroup;
//   displayMessage: string = '';
//   private validationMessages: { [key: string]: { [key: string]: string } };
//   // private genericValidator: GenericValidator;

//   constructor(private fb: FormBuilder) {
//     this.validationMessages = {
//       email: {
//         required: 'Email is required.',
//         email: 'Invalid email address.'
//       },
//       password: {
//         required: 'Password is required.',
//         minlength: 'Password must be at least eight characters.'
//       },
//       confirmPassword: {
//         required: 'Confirm Password is required.',
//         minlength: 'Confirm Password must be at least eight characters.',
//         passwordMisMatch: 'Passwords do not match.'
//       }
//     };

//     // this.genericValidator = new GenericValidator(this.validationMessages);
//   }

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       passwordGroup: this.fb.group({
//         password: ['', [Validators.required, Validators.minLength(8)]],
//         confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
//       }, { validator: validatePassword })
//     });

//     const passwordControl = this.loginForm.get('passwordGroup.password');
//     passwordControl?.valueChanges.pipe(
//       debounceTime(1000)
//     ).subscribe(
//       value => this.setMessage(passwordControl)
//     );
//   }

//   setMessage(c: AbstractControl): void {
//     this.displayMessage = '';
//     if ((c.touched || c.dirty) && c.errors) {
//       this.displayMessage = Object.keys(c.errors).map(
//         key => this.validationMessages[key]).join(' ');
//     }
//   }

//   get email() { return this.loginForm.get('email'); }
//   get password() { return this.loginForm.get('passwordGroup.password'); }
//   get confirmPassword() { return this.loginForm.get('passwordGroup.confirmPassword'); }

//   signup(form: FormGroup): void {
//     if (this.loginForm.valid) {
//       console.log(form.value);
//     } else {
//       console.log('Form is invalid');
//     }
//   }
// }

// import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, AbstractControl, FormControlName } from '@angular/forms';
// import { fromEvent, merge } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';

// function validatePassword(c: AbstractControl): { [key: string]: boolean } | null {
//   const password = c.get('password');
//   const confirmPassword = c.get('confirmPassword');

//   if (password && confirmPassword && password.value !== confirmPassword.value) {
//     return { passwordMisMatch: true };
//   }
//   return null;
// }

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css']
// })
// export class SignUpComponent implements OnInit, AfterViewInit {
//   @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

//   loginForm!: FormGroup;
//   displayMessage: { [key: string]: string } = {};
//   private validationMessages: { [key: string]: { [key: string]: string } };

//   constructor(private fb: FormBuilder) {
//     this.validationMessages = {
//       email: {
//         required: 'Email is required.',
//         email: 'Invalid email address.'
//       },
//       password: {
//         required: 'Password is required.',
//         minlength: 'Password must be at least eight characters.'
//       },
//       confirmPassword: {
//         required: 'Confirm Password is required.',
//         minlength: 'Confirm Password must be at least eight characters.',
//         passwordMisMatch: 'Passwords do not match.'
//       }
//     };
//   }

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       passwordGroup: this.fb.group({
//         password: ['', [Validators.required, Validators.minLength(8)]],
//         confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
//       }, { validator: validatePassword })
//     });

//     this.loginForm.valueChanges
//       .pipe(debounceTime(1000))
//       .subscribe(() => this.setMessage(this.loginForm));
//   }

//   ngAfterViewInit(): void {
//     const controlBlurs = this.formInputElements
//       .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

//     merge(...controlBlurs).pipe(
//       debounceTime(1000)
//     ).subscribe(() => {
//       this.setMessage(this.loginForm);
//     });
//   }

//   setMessage(c: AbstractControl): void {
//     this.displayMessage = {};
//     if ((c.touched || c.dirty) && c.errors) {
//       this.displayMessage = Object.keys(c.errors).map(
//         key => this.validationMessages[key]).join(' ');
//     }

//     const controls = (c as FormGroup).controls;
//     for (const name in controls) {
//       if (controls[name] instanceof FormGroup) {
//         this.setMessage(controls[name]);
//       } else {
//         const control = controls[name];
//         if (control && control.dirty && !control.valid) {
//           this.displayMessage[name] = '';
//           if (control.errors) {
//             this.displayMessage[name] = Object.keys(control.errors).map(
//               key => this.validationMessages[name][key]).join(' ');
//           }
//         }
//       }
//     }
//   }

//   get email() { return this.loginForm.get('email'); }
//   get password() { return this.loginForm.get('passwordGroup.password'); }
//   get confirmPassword() { return this.loginForm.get('passwordGroup.confirmPassword'); }

//   signup(): void {
//     if (this.loginForm.valid) {
//       console.log(this.loginForm.value);
//     } else {
//       console.log('Form is invalid');
//     }
//   }
// }

// import {
//   Component,
//   OnInit,
//   AfterViewInit,
//   ViewChildren,
//   ElementRef,
// } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   AbstractControl,
//   FormControlName,
// } from '@angular/forms';
// import { fromEvent, merge } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';

// function validatePassword(
//   c: AbstractControl
// ): { [key: string]: boolean } | null {
//   const password = c.get('password');
//   const confirmPassword = c.get('confirmPassword');

//   if (password && confirmPassword && password.value !== confirmPassword.value) {
//     return { passwordMisMatch: true };
//   }
//   return null;
// }

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css'],
// })
// export class SignUpComponent implements OnInit, AfterViewInit {
//   @ViewChildren(FormControlName, { read: ElementRef })
//   formInputElements!: ElementRef[];

//   loginForm!: FormGroup;
//   displayMessage: { [key: string]: string } = {};
//   private validationMessages: { [key: string]: { [key: string]: string } };

//   get email() {
//     return this.loginForm.get('email');
//   }
//   get password() {
//     return this.loginForm.get('passwordGroup.password');
//   }
//   get confirmPassword() {
//     return this.loginForm.get('passwordGroup.confirmPassword');
//   }

//   constructor(private fb: FormBuilder) {
//     this.validationMessages = {
//       email: {
//         required: 'Email is required.',
//         email: 'Invalid email address.',
//       },
//       password: {
//         required: 'Password is required.',
//         minlength: 'Password must be at least eight characters.',
//       },
//       confirmPassword: {
//         required: 'Confirm Password is required.',
//         minlength: 'Confirm Password must be at least eight characters.',
//         passwordMisMatch: 'Passwords do not match.',
//       },
//     };
//   }

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       passwordGroup: this.fb.group(
//         {
//           password: ['', [Validators.required, Validators.minLength(8)]],
//           confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
//         },
//         { validator: validatePassword }
//       ),
//     });

//     // this.loginForm.valueChanges
//     //   .pipe(debounceTime(1000))
//     //   .subscribe(() => this.setMessage(this.loginForm));
//   }

//   ngAfterViewInit(): void {
//     const controlBlurs = this.formInputElements.map((formControl: ElementRef) =>
//       fromEvent(formControl.nativeElement, 'blur')
//     );

//     merge(...controlBlurs)
//       .pipe(debounceTime(1000))
//       .subscribe(() => {
//         this.setMessage(this.loginForm);
//       });
//   }

//   // setMessage(c: AbstractControl): void {
//   //   this.displayMessage = {};
//   //   if ((c.touched || c.dirty) && c.errors) {
//   //     Object.keys(c.errors).forEach((key) => {
//   //       // Ensure the error message is extracted from validationMessages correctly
//   //       this.displayMessage[key] =
//   //         this.validationMessages[c.parent?.get(key)?.errors ? key : ''][key];
//   //     });
//   //   }

//   //   const controls = (c as FormGroup).controls;
//   //   for (const name in controls) {
//   //     if (controls[name] instanceof FormGroup) {
//   //       this.setMessage(controls[name]);
//   //     } else {
//   //       const control = controls[name];
//   //       if (control && control.dirty && !control.valid) {
//   //         this.displayMessage[name] = '';
//   //         if (control.errors) {
//   //           this.displayMessage[name] = Object.keys(control.errors)
//   //             .map((key) => this.validationMessages[name][key])
//   //             .join(' ');
//   //         }
//   //       }
//   //     }
//   //   }
//   // }

//   setMessage(controlName: string, c: AbstractControl): void {
//     this.displayMessage = {};  // You may want to change the name to be more generic if handling multiple controls

//     // If the control has errors and has been touched or is dirty, display the appropriate message
//     if ((c.touched || c.dirty) && c.errors) {
//       this.displayMessage = Object.keys(c.errors).map(
//         key => this.validationMessages[controlName][key]).join(' ');
//     }
//   }

//   signup() {}
// }

// import {
//   Component,
//   OnInit,
//   AfterViewInit,
//   ViewChildren,
//   ElementRef,
// } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   AbstractControl,
//   FormControlName,
// } from '@angular/forms';
// import { fromEvent, merge } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';

// // Custom password validator function
// function validatePassword(
//   c: AbstractControl
// ): { [key: string]: boolean } | null {
//   const password = c.get('password');
//   const confirmPassword = c.get('confirmPassword');

//   if (password && confirmPassword && password.value !== confirmPassword.value) {
//     return { passwordMisMatch: true };
//   }
//   return null;
// }

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css'],
// })
// export class SignUpComponent implements OnInit, AfterViewInit {
//   @ViewChildren(FormControlName, { read: ElementRef })
//   formInputElements!: ElementRef[];

//   loginForm!: FormGroup;
//   displayMessage: { [key: string]: string } = {};
//   private validationMessages: { [key: string]: { [key: string]: string } };

//   get email() {
//     return this.loginForm.get('email');
//   }
//   get password() {
//     return this.loginForm.get('passwordGroup.password');
//   }
//   get confirmPassword() {
//     return this.loginForm.get('passwordGroup.confirmPassword');
//   }

//   constructor(private fb: FormBuilder) {
//     this.validationMessages = {
//       email: {
//         required: 'Email is required.',
//         email: 'Invalid email address.',
//       },
//       password: {
//         required: 'Password is required.',
//         minlength: 'Password must be at least eight characters.',
//       },
//       confirmPassword: {
//         required: 'Confirm Password is required.',
//         minlength: 'Confirm Password must be at least eight characters.',
//         passwordMisMatch: 'Passwords do not match.',
//       },
//     };
//   }

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       passwordGroup: this.fb.group(
//         {
//           password: ['', [Validators.required, Validators.minLength(8)]],
//           confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
//         },
//         { validator: validatePassword }
//       ),
//     });
//   }

//   ngAfterViewInit(): void {
//     const controlBlurs = this.formInputElements.map((formControl: ElementRef) =>
//       fromEvent(formControl.nativeElement, 'blur')
//     );

//     merge(...controlBlurs)
//       .pipe(debounceTime(1000))
//       .subscribe(() => {
//         this.setMessage(this.loginForm);
//       });
//   }

//   setMessage(c: AbstractControl): void {
//     this.displayMessage = {};
//     if ((c.touched || c.dirty) && c.errors) {
//       Object.keys(c.errors).forEach((key) => {
//         this.displayMessage[key] = this.validationMessages[key];
//       });
//     }

//     const controls = (c as FormGroup).controls;
//     for (const name in controls) {
//       if (controls[name] instanceof FormGroup) {
//         this.setMessage(controls[name]);
//       } else {
//         const control = controls[name];
//         if (control && control.dirty && !control.valid) {
//           this.displayMessage[name] = '';
//           if (control.errors) {
//             this.displayMessage[name] = Object.keys(control.errors)
//               .map((key) => this.validationMessages[name][key])
//               .join(' ');
//           }
//         }
//       }
//     }
//   }

//   signup(): void {
//     if (this.loginForm.valid) {
//       console.log(this.loginForm.value);
//     } else {
//       console.log('Form is invalid');
//     }
//   }
// }

// import {
//   Component,
//   OnInit,
//   AfterViewInit,
//   ViewChildren,
//   ElementRef,
// } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   AbstractControl,
//   FormControlName,
// } from '@angular/forms';
// import { fromEvent, merge } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';

// // Custom password validator function
// function validatePassword(
//   c: AbstractControl
// ): { [key: string]: boolean } | null {
//   const password = c.get('password');
//   const confirmPassword = c.get('confirmPassword');

//   if (password && confirmPassword && password.value !== confirmPassword.value) {
//     return { passwordMisMatch: true };
//   }
//   return null;
// }

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css'],
// })
// export class SignUpComponent implements OnInit, AfterViewInit {
//   @ViewChildren(FormControlName, { read: ElementRef })
//   formInputElements!: ElementRef[];

//   loginForm!: FormGroup;
//   displayMessage: { [key: string]: string } = {};
//   private validationMessages: { [key: string]: { [key: string]: string } };

//   get email() {
//     return this.loginForm.get('email');
//   }
//   get password() {
//     return this.loginForm.get('passwordGroup.password');
//   }
//   get confirmPassword() {
//     return this.loginForm.get('passwordGroup.confirmPassword');
//   }

//   constructor(private fb: FormBuilder) {
//     this.validationMessages = {
//       email: {
//         required: 'Email is required.',
//         email: 'Invalid email address.',
//       },
//       password: {
//         required: 'Password is required.',
//         minlength: 'Password must be at least eight characters.',
//       },
//       confirmPassword: {
//         required: 'Confirm Password is required.',
//         minlength: 'Confirm Password must be at least eight characters.',
//         passwordMisMatch: 'Passwords do not match.',
//       },
//     };
//   }

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       passwordGroup: this.fb.group(
//         {
//           password: ['', [Validators.required, Validators.minLength(8)]],
//           confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
//         },
//         { validator: validatePassword }
//       ),
//     });

//     this.loginForm.valueChanges
//       .pipe(debounceTime(500))
//       .subscribe(() => this.setMessage(this.loginForm));
//   }

//   ngAfterViewInit(): void {
//     const controlBlurs = this.formInputElements.map((formControl: ElementRef) =>
//       fromEvent(formControl.nativeElement, 'blur')
//     );

//     merge(...controlBlurs)
//       .pipe(debounceTime(1000))
//       .subscribe(() => {
//         this.setMessage(this.loginForm);
//       });
//   }

//   setMessage(c: AbstractControl): void {
//     this.displayMessage = {};  // Reset the display message object

//     if ((c.touched || c.dirty) && c.errors) {
//       Object.keys(c.errors).forEach((key) => {
//         const controlName = Object.keys(this.validationMessages).find(
//           (name) => this.validationMessages[name][key]
//         );
//         if (controlName) {
//           this.displayMessage[controlName] = this.validationMessages[controlName][key];
//         }
//       });
//     }

//     const controls = (c as FormGroup).controls;
//     for (const name in controls) {
//       if (controls[name] instanceof FormGroup) {
//         this.setMessage(controls[name]);
//       } else {
//         const control = controls[name];
//         if (control && control.dirty && !control.valid) {
//           this.displayMessage[name] = '';
//           if (control.errors) {
//             this.displayMessage[name] = Object.keys(control.errors)
//               .map((key) => this.validationMessages[name][key])
//               .join(' ');
//           }
//         }
//       }
//     }
//   }

//   signup(): void {
//     if (this.loginForm.valid) {
//       console.log(this.loginForm.value);
//     } else {
//       console.log('Form is invalid');
//     }
//   }
// }

// import {
//   Component,
//   OnInit,
//   AfterViewInit,
//   ViewChildren,
//   ElementRef,
// } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators,
//   AbstractControl,
//   FormControlName,
// } from '@angular/forms';
// import { Observable, fromEvent, merge } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';

// // Custom password validator function
// function validatePassword(
//   c: AbstractControl
// ): { [key: string]: boolean } | null {
//   const password = c.get('password');
//   const confirmPassword = c.get('confirmPassword');

//   if (password && confirmPassword && password.value !== confirmPassword.value) {
//     return { passwordMisMatch: true };
//   }
//   return null;
// }

// @Component({
//   selector: 'app-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.css'],
// })
// export class SignUpComponent implements OnInit, AfterViewInit {
//   @ViewChildren(FormControlName, { read: ElementRef })
//   formInputElements!: ElementRef[];

//   loginForm!: FormGroup;
//   displayMessage: { [key: string]: string } = {};
//   private validationMessages: { [key: string]: { [key: string]: string } };

//   get email() {
//     return this.loginForm.get('email');
//   }
//   get password() {
//     return this.loginForm.get('passwordGroup.password');
//   }
//   get confirmPassword() {
//     return this.loginForm.get('passwordGroup.confirmPassword');
//   }

//   get passwordGroup() {
//     return this.loginForm.get('passwordGroup')
//   }

//   constructor(private fb: FormBuilder) {
//     this.validationMessages = {
//       email: {
//         required: 'Email is required.',
//         email: 'Invalid email address.',
//       },
//       password: {
//         required: 'Password is required.',
//         minlength: 'Password must be at least eight characters.',
//       },
//       confirmPassword: {
//         required: 'Please confirm your password.',
//         minlength: 'Confirm Password must be at least eight characters.',
//         passwordMisMatch: 'Passwords do not match.',
//       },
//     };
//   }

//   ngOnInit(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       passwordGroup: this.fb.group(
//         {
//           password: ['', [Validators.required, Validators.minLength(8)]],
//           confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
//         },
//         { validator: validatePassword }
//       ),
//     });

//     // this.loginForm.valueChanges
//     //   .pipe(debounceTime(800))
//     //   .subscribe(() => this.setMessage(this.loginForm));
//   }

//   ngAfterViewInit(): void {
//     const controlBlurs: Observable<any>[] = this.formInputElements.map((formControl: ElementRef) =>
//       fromEvent(formControl.nativeElement, 'blur')
//     );

//     merge(this.loginForm.valueChanges, ...controlBlurs)
//       .pipe(debounceTime(500))
//       .subscribe(() => {
//         this.setMessage(this.loginForm);
//       });
//   }

//   setMessage(c: AbstractControl): void {
//     this.displayMessage = {}; // Reset the display message object

//     if ((c.touched || c.dirty) && c.errors) {
//       Object.keys(c.errors).forEach((key) => {
//         const controlName = Object.keys(this.validationMessages).find(
//           (name) => this.validationMessages[name][key]
//         );
//         if (controlName) {
//           this.displayMessage[controlName] = this.validationMessages[controlName][key];
//         }
//       });
//     }

//     const controls = (c as FormGroup).controls;
//     for (const name in controls) {
//       if (controls[name] instanceof FormGroup) {
//         this.setMessage(controls[name]);
//       } else {
//         const control = controls[name];
//         if (control && control.dirty && !control.valid) {
//           this.displayMessage[name] = '';
//           if (control.errors) {
//             this.displayMessage[name] = Object.keys(control.errors)
//               .map((key) => this.validationMessages[name][key])
//               .join(' ');
//           }
//         }
//       }
//     }
//   }

//   signup(): void {
//     if (this.loginForm.valid) {
//       console.log(this.loginForm.value);
//     } else {
//       console.log('Form is invalid');
//       this.setMessage(this.loginForm);
//     }
//   }
// }


