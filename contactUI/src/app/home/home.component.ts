import { Component, OnInit } from '@angular/core';
import { contactForm } from 'src/models/contactform.interface';
import { ContactformService } from '../contactform.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cLists: contactForm[] = [];

  constructor(private contactService:ContactformService,
    private router: Router){

  }

  ngOnInit(): void {
    this.contactService.getContacts().pipe(
      catchError(err => {
        console.log(err);
        return of([]); 
      })
    ).subscribe((result)=>{
      console.log(result);
      this.cLists = result;
    });
  }

  addNewContact(){
    this.router.navigate(['/contact']);
  }

  editContact(event:any){
    this.contactService.getContact(event).pipe(
      catchError(err => {
        console.log(err);
        return of([]); 
      })
    ).subscribe((result)=>{
      this.router.navigate(['/contact'],{queryParams:result});
    })
  }

  deleteContact(event:any){
    this.contactService.deleteContact(event).pipe(
      catchError(err => {
        console.log(err);
        return of([]); 
      })
    ).subscribe((result)=>{
      location.reload();
      this.router.navigate(['/']);
    })
  }

  sortData(str: any) {
    switch(str){
      case 'firstName': {
        this.cLists.sort((a, b) => {
          const aValue = a['firstName'].toLowerCase();
          const bValue = b['firstName'].toLowerCase();
          return aValue.localeCompare(bValue);
        });
        break; // Add break statement here
      }
      case 'lastName':{
        this.cLists.sort((a, b) => {
          const aValue = a['lastName'].toLowerCase();
          const bValue = b['lastName'].toLowerCase();
          return aValue.localeCompare(bValue);
        });
        break;
      }
      case 'email':{
        this.cLists.sort((a, b) => {
          const aValue = a['email'].toLowerCase();
          const bValue = b['email'].toLowerCase();
          return aValue.localeCompare(bValue);
        });
        break;
      }
      case 'phoneNumber':{
        this.cLists.sort((a, b) => {
          const aValue = a['phoneNumber'].toLowerCase();
          const bValue = b['phoneNumber'].toLowerCase();
          return aValue.localeCompare(bValue);
        });
        break;
      }
      case 'address':{
        this.cLists.sort((a, b) => {
          const aValue = a['address'].toLowerCase();
          const bValue = b['address'].toLowerCase();
          return aValue.localeCompare(bValue);
        });
        break;
      }
      case 'city':{
        this.cLists.sort((a, b) => {
          const aValue = a['city'].toLowerCase();
          const bValue = b['city'].toLowerCase();
          return aValue.localeCompare(bValue);
        });
        break;
      }
      case 'state':{
        this.cLists.sort((a, b) => {
          const aValue = a['state'].toLowerCase();
          const bValue = b['state'].toLowerCase();
          return aValue.localeCompare(bValue);
        });
        break;
      }
      case 'country':{
        this.cLists.sort((a, b) => {
          const aValue = a['country'].toLowerCase();
          const bValue = b['country'].toLowerCase();
          return aValue.localeCompare(bValue);
        });
        break;
      }
      case 'postalCode':{
        this.cLists.sort((a, b) => {
          const aValue = a['postalCode'].toLowerCase();
          const bValue = b['postalCode'].toLowerCase();
          return aValue.localeCompare(bValue);
        });
        break;
      }
    }
    
  }
  
}
