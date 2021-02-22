import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  toastrOptions: any = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  constructor( private toastr: ToastrService) {}

  success(message: string, title?: string, ){
    this.toastr.success(message,title, this.toastrOptions);
  }
  
  info(message: string, title?: string, ){
    this.toastr.info(message,title, this.toastrOptions);
  }

  warning(message: string, title?: string, ){
    this.toastr.warning(message,title, this.toastrOptions);
  }

  error(message: string, title?: string, ){
    this.toastr.error(message,title, this.toastrOptions);
  }
}
