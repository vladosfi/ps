import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IContactFormEntry } from '../_interfaces/contactFormEntry';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  baseUrl = environment.apiUrl + 'contacts';
  
  constructor(private http: HttpClient) { }

  sendMessage(contactFormEntry: IContactFormEntry) : any{
    // this.contactFormEntry = {
    //   recaptchaValue: token,
    //   fromName: 'Vlad', 
    //   sendersEmail: 'vladosfi@gmail.com',
    //   content: 'asdfsdf gsdfg sdfg sdfg sdfg ',
    //   subject: 'E-mail from site',
    // }
    
    return this.http.post(this.baseUrl, contactFormEntry);
  }

}
