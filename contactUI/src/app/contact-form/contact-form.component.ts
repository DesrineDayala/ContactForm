import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactformService } from '../contactform.service';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute,private toastr: ToastrService,private router: Router,
    private contactService: ContactformService) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id:[''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', [Validators.required,Validators.maxLength(10)]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postalCode: ['', Validators.required]
    });

    this.activeRoute.queryParams.subscribe(params => {
      this.userForm.setValue({
        id:params['id'],
        firstName: params['firstName']|| '',
        lastName: params['lastName']|| '',
        email: params['email']|| '',
        phoneNumber:params['phoneNumber']|| '',
        address: params['address']|| '',
        city: params['city']|| '',
        state: params['state']|| '',
        country: params['country']|| '',
        postalCode: params['postalCode']|| ''
      });
    });
  }

  onSubmit() {
    console.log(this.userForm.value.id);
    if(this.userForm.value.id > 0){
      this.contactService.updateContact(this.userForm.value).pipe(
        catchError(err => {
          console.log(err);
          this.toastr.error(err, 'Error');
          return of([]);
        })
      ).subscribe((result)=>{
        this.toastr.success('Contact Updated', 'Success');
        this.userForm.reset();
        this.router.navigate(['/']);
      })
    }else{
      this.contactService.createContact(this.userForm.value)
      .pipe(
        catchError(err => {
          console.log(err);
          this.toastr.error(err, 'Error');
          return of([]);
        }))
      .subscribe((result) => {
        this.toastr.success('Contact Created', 'Success');
        this.userForm.reset();
        this.router.navigate(['/']);
      })
    }
    
  }
}
