import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopupService } from '../_services/popup.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  
  constructor(
    private popup: PopupService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  register(model) {
    this.authService.register(model).subscribe(() => {
      this.popup.success('registration successful');
    }, error =>{
      this.popup.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
