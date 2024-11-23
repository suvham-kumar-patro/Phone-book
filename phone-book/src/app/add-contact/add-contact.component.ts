import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IContact } from '../models/IContact';
import { ContactServiceService } from '../contact-service.service';

@Component({
  selector: 'app-add-contact',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {
  @Output() contactAdded = new EventEmitter<IContact>();
  addContactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactServiceService
  ) {
    this.addContactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  onAddContact() {
    if (this.addContactForm.valid) {
      const newContact: IContact = this.addContactForm.value;

      this.contactService.addContact(newContact).subscribe({
        next: (addedContact) => {
          console.log(addedContact);

          this.contactAdded.emit(addedContact);  
        },
        error: (error: Error) => {
          console.log(error); 
        }
      });

      this.addContactForm.reset();  
    } else {
      this.addContactForm.markAllAsTouched();  
    }
  }
}
