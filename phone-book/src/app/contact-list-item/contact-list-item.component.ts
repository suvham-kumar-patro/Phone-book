import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IContact } from '../models/IContact';

@Component({
  selector: 'app-contact-list-item',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-list-item.component.html',
  styleUrl: './contact-list-item.component.scss'
})
export class ContactListItemComponent {
  @Input() contact!: IContact;
  @Output() contactDeleted = new EventEmitter<number>();  
  @Output() contactUpdated = new EventEmitter<IContact>();  

  isHovered: boolean = false;

  onHover(state: boolean) {
    this.isHovered = state;
  }


  isEditing = false;
  updatedContact!: IContact;

  onEdit() {
    this.isEditing = true;
    this.updatedContact = { 
      ...this.contact,
      name: this.contact.name, 
      phone: this.contact.phone 
    };
  }

  onSave() {
    if (this.updatedContact.name && this.updatedContact.phone) {
      const updatedContact: IContact = {
        ...this.contact, 
        name: this.updatedContact.name,
        phone: this.updatedContact.phone
      };
      this.contactUpdated.emit(updatedContact);
      this.isEditing = false;
    }
  }

  onCancel() {
    this.isEditing = false;
  }

  onDelete() {
    this.contactDeleted.emit(this.contact.id);
  }
}
