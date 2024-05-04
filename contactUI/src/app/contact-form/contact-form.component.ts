import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactformService } from '../contactform.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private activeRoute:ActivatedRoute,
    private contactService: ContactformService
  ) { 
    this.activeRoute.queryParams.subscribe(params => {
      console.log(params);
      this.userForm.get('firstName')?.setValue(params['firstName']) ;
      this.userForm.get('lastName')?.setValue(params['lastName']) ;
      this.userForm.get('email')?.setValue(params['email']) ;
      this.userForm.get('phoneNumber')?.setValue(params['phoneNumber']) ;
      this.userForm.get('address')?.setValue(params['address']) ;
      this.userForm.get('city')?.setValue(params['city']) ;
      this.userForm.get('state')?.setValue(params['state']) ;
      this.userForm.get('country')?.setValue(params['country']) ;
      this.userForm.get('postalCode')?.setValue(params['postalCode']) ;
  });
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber:['',Validators.required, Validators.maxLength(10)],
      address: ['', Validators.required, Validators.pattern('[a-zA-Z ]*')],
      city: ['', Validators.required, Validators.pattern('[a-zA-Z]*')],
      state: ['', Validators.required,Validators.pattern('[a-zA-Z ]*')],
      country: ['', Validators.required,Validators.pattern('[a-zA-Z ]*')],
      postalCode: ['', Validators.required,Validators.maxLength(6)]
    });
  }

  onSubmit(){
    this.contactService.createContact(this.userForm.value)
    .pipe(
      catchError(err => {
      console.log(err);
      return of([]); 
    }))
    .subscribe((result)=>{
      this.userForm.reset();
    })
  }
}
