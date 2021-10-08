import { Component, OnInit } from '@angular/core';
import { ReCaptchaService } from 'angular-recaptcha3';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private recaptchaService: ReCaptchaService) { }

  ngOnInit(): void {
  }

  

  onCaptchaResponse(event: any): void  {
    this.recaptchaService.execute({action: 'login'}).then(token => {
      // Backend verification method
      this.sendTokenToBackend(token);
    });
}

sendTokenToBackend(token): void{

}
}

//https://tanpure-anjali.medium.com/how-to-implement-google-recaptcha-v3-in-angular-2a4fd026f4ab