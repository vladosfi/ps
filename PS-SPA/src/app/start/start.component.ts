import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  registerMode = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  
  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean){
    this.registerMode = registerMode;
  }
}
