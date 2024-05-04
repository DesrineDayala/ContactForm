import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { contactForm } from 'src/models/contactform.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactformService {
  private apiUrl = 'https://localhost:44396/api/ContactForm';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<contactForm[]> {
    return this.http.get<contactForm[]>(this.apiUrl);
  }

  getContact(id: number): Observable<contactForm[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<contactForm[]>(url)
  }

  // Create a new contact
  createContact(contact: contactForm[]): Observable<contactForm> {
    return this.http.post<contactForm>(this.apiUrl, contact);
  }

  // Update a contact
  updateContact(contact: contactForm): Observable<any> {
    const url = `${this.apiUrl}/${contact.id}`;
    return this.http.put(url, contact);
  }

  // Delete a contact
  deleteContact(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

}
