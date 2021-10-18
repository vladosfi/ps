import { Component, OnInit, ViewChild } from '@angular/core';
import { IContactFormEntry } from 'src/app/_interfaces/contactFormEntry';
import { CommonService } from 'src/app/_services/common.service';
import { ToastService } from 'src/app/_services/toast.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {
  @ViewChild('contctForm') editForm: NgForm;
  contactFormEntry: IContactFormEntry;

  constructor(private commonService: CommonService,private toast: ToastService) { }
  
  ngOnInit(): void {
  }
  
  onCaptchaResponse(token: any): void  {
    this.contactFormEntry.recaptchaValue = token;
    // this.commonService.verifyRecaptcha(token).subscribe(
    //   () => {
    //     console.log('Check Complete');
    //   },
    //   (error) => {
    //     this.toast.error(error);
    //   }
    // );
  }

  sentEmail(contactFormContent: IContactFormEntry){
    console.log(contactFormContent.content);
  }
}

//https://tanpure-anjali.medium.com/how-to-implement-google-recaptcha-v3-in-angular-2a4fd026f4ab