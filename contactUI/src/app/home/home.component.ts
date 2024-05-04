import { Component, OnInit } from '@angular/core';
import { contactForm } from 'src/models/contactform.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cLists: contactForm[] = [{
    firstName:"",
    lastName:"",
    email:"",
    phone:"5",
    address:"",
    city:"",
    state:"",
    country:"",
    zip:"5"
  }];

  ngOnInit(): void {
    console.log(this.cLists);
  }
  
}
