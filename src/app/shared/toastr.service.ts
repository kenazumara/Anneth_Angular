import { Injectable } from '@angular/core';
import { ToastrService as NgxToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private toastr: NgxToastrService) {}


  success(message: string, title?:string): void {
    this.toastr.success(message);
  }
  error(message: string): void {
    this.toastr.error(message);
  }
  info(message: string): void {
    this.toastr.info(message);
  }
  warning(message: string): void {
    this.toastr.warning(message);
  }
}