import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private activeRoute: ActivatedRoute,
    private contactService: ContactformService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required, Validators.maxLength(10)],
      address: ['', Validators.required, Validators.pattern('[a-zA-Z ]*')],
      city: ['', Validators.required, Validators.pattern('[a-zA-Z]*')],
      state: ['', Validators.required, Validators.pattern('[a-zA-Z ]*')],
      country: ['', Validators.required, Validators.pattern('[a-zA-Z ]*')],
      postalCode: ['', Validators.required, Validators.maxLength(6)]
    });

    this.activeRoute.queryParams.subscribe(params => {
      this.userForm.setValue({
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
    this.contactService.createContact(this.userForm.value)
      .pipe(
        catchError(err => {
          console.log(err);
          return of([]);
        }))
      .subscribe((result) => {
        this.toastr.success("Contact Created successfully");
        this.userForm.reset();
      })
  }
}
