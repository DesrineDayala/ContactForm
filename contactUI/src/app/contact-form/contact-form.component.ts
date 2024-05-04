import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  userForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber:['',Validators.required, Validators.maxLength(10)],
      address: ['', Validators.required, Validators.pattern('[a-zA-Z ]*')],
      city: ['', Validators.required, Validators.pattern('[a-zA-Z]*')],
      state: ['', Validators.required,Validators.pattern('[a-zA-Z ]*')],
      postalCode: ['', Validators.required,Validators.maxLength(6)]
    });
  }

  onSubmit(){
    console.log("its submitted");
  }
}
