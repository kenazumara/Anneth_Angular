import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'src/app/shared/toastr.service';
// import { ToastrService } from 'src/app/shared/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errorMessage: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService

  ) {}

  get authservice() {
    return this.authService;
  }

  ngOnInit(): void {}

  loginForm(form: NgForm) {
    const password = form.value.password;
    const email = form.value.email;

    this.authService.login(email, password).subscribe({
      next: data => {
        if (this.authService.redirectUrl) {
          console.log(this.authService.redirectUrl)
          console.log('hello')
          this.router.navigateByUrl(this.authService.redirectUrl);
        } else {
          this.router.navigate(['/products']);
          console.log(this.authService.isLoggedIn)
          console.log(this.authService.currentUser$)
        }
        this.cdr.detectChanges();
        this.toastr.success('Login Successful')

      },
      error: err => {
        this.toastr.error(err)
        this.errorMessage = err
        this.cdr.detectChanges();
      },
      complete: () => {
        console.log('Login request complete');
      }
    });

    console.log(form.value);
  }

  // loginForm(form: NgForm) {
  //   const password = form.value.password;
  //   const email = form.value.email;
  //   this.authService.login(email, password).subscribe((data) => {
  //     if(this.authService.redirectUrl) {
  //       this.router.navigateByUrl(this.authService.redirectUrl);
  //     } else {
  //       this.router.navigate(['/products']);
  //     }
  //   });
  //   console.log(form.value);
  // }
}
