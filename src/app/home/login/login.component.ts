import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get authservice() {
    return this.authService;
  }

  ngOnInit(): void {}

  loginForm(form: NgForm) {
    const password = form.value.password;
    const email = form.value.email;
    this.authService.login(email, password).subscribe((data) => {
      this.router.navigate(['/products']);
    });
    console.log(form.value);
  }
}
