import { Component, OnInit, ViewChild } from '@angular/core';
import { IContactFormEntry } from 'src/app/_interfaces/contactFormEntry';
import { CommonService } from 'src/app/_services/common.service';
import { ToastService } from 'src/app/_services/toast.service';
import { FormBuilder, FormControl, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {
  contactModel: FormGroup;
  contactFormEntry: IContactFormEntry;
  fromNameMinLen: number = 2;
  fromNameMaxLen: number = 60;
  sendersEmailMinLen: number = 4;
  sendersEmailMaxLen: number = 60;
  contentMinLen: number = 10;
  contentMaxLen: number = 500;
  recaptchaValueMinLen: number = 10;
  recaptchaValueMaxLen: number = 500;
  

  constructor(private commonService: CommonService,private toast: ToastService, fb: FormBuilder) {
    
    this.contactModel = new FormGroup({
      fromName: new FormControl('', [Validators.required, Validators.minLength(this.fromNameMinLen), Validators.maxLength(this.fromNameMaxLen)]),
      sendersEmail: new FormControl('', [Validators.required,Validators.email, Validators.minLength(this.sendersEmailMinLen), Validators.maxLength(this.sendersEmailMaxLen)]),
      content: new FormControl('', [Validators.required, Validators.minLength(this.contentMinLen), Validators.maxLength(this.contentMaxLen)]),
      recaptchaValue: new FormControl('', [Validators.required, Validators.minLength(this.recaptchaValueMinLen), Validators.maxLength(this.recaptchaValueMaxLen)]),
   });
  }
  
   ngOnInit(): void {

  }
  
  onCaptchaResponse(token: any): void  {
    //this.contactFormEntry.recaptchaValue = token;
    // this.commonService.verifyRecaptcha(token).subscribe(
    //   () => {
    //     console.log('Check Complete');
    //   },
    //   (error) => {
    //     this.toast.error(error);
    //   }
    // );
  }

  sentEmail(){
    console.log('sdfsdfsdfsdf');
  }
}

//https://tanpure-anjali.medium.com/how-to-implement-google-recaptcha-v3-in-angular-2a4fd026f4ab