import { Component, OnInit } from '@angular/core';
import { ReCaptchaService } from 'angular-recaptcha3';
import { CommonService } from 'src/app/_services/common.service';
import { ToastService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private commonService: CommonService,private toast: ToastService) { }
  
  ngOnInit(): void {
  }
  
  onCaptchaResponse(token: any): void  {
    this.commonService.verifyRecaptcha(token).subscribe(
      () => {
        console.log('Check Complete');
      },
      (error) => {
        this.toast.error(error);
      }
    );
  }
}

//https://tanpure-anjali.medium.com/how-to-implement-google-recaptcha-v3-in-angular-2a4fd026f4ab