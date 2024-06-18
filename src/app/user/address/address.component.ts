import {
  Component,
  OnInit,
} from '@angular/core';
import { Address, User } from '../user';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  user!: User;
  addressForm!: FormGroup;
  showForm = false;
  isMenuOpen!: boolean;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) {}

  get f() {
    return this.addressForm.controls;
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
      this.addressForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        number: user.phone,
      });
    });

    this.addressForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      number: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      const address: Address = this.addressForm.value;
      this.authService.createAddress(address).subscribe((val) => {
        console.log(val);
        this.authService.getUser().subscribe((user) => {
          this.user = user;
          this.addressForm.reset({
            street: '',
            city: '',
            state: '',
            country: '',
          })
          this.showForm = false;

        });
      });
    }
  }

  showAddForm() {
    this.showForm = true;
  }

  back() {
    this.showForm = false;
this.isMenuOpen = false
  }
}