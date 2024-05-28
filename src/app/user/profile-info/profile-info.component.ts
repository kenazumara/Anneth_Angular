import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {
  userForm!: FormGroup
  userDetails!: User


  pageTitle: string = 'Account Information'
  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [ Validators.required]],
      phone: ['', [Validators.required]]
    })

    this.userForm.get('email')?.disable();
this.userForm.get('phone')?.disable();

    this.authService.getUser().subscribe((user: any)=> {
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone
      })
      console.log(user)
    }) 
  }

  isDisabled(): boolean {
    return true; // or false based on your condition
  }

  save() {
    console.log(this.userForm.value)
  }

  
}
