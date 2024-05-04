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
    private router: Router, private toastr: ToastrService
  ){

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
        this.toastr.error(err);
        return of([]); 
      })
    ).subscribe((result)=>{
      console.log(result);
      this.toastr.success("Successfully Deleted");
    })
  }

  sortData(key: string) {
    this.cLists.sort((a, b) => {
      const aValue = a['firstName'].toLowerCase();
      const bValue = b['firstName'].toLowerCase();
      return aValue.localeCompare(bValue);
    });
  }
  
}
