import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../person';
import { PeopleService } from '../people.service';
@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent {
  constructor(private peopleService: PeopleService){}

  // get selected person from parent component
  @Input() person?: Person;

  // calls isEditing boolean of parent component if editing person
  @Output() toggleIsEditing = new EventEmitter<boolean>();
  // variable to tell apart if user is editing a person
  isEditing: boolean = false;

  // changes isEditing variable of self and parent
  toggleEditing(val: boolean): void {
    this.isEditing = val;
    this.toggleIsEditing.emit(val);
    console.log("is editing toggled " + val);
  }

  // saves edits to person with service method
  editPerson(person: Person): void {
    this.peopleService.editPerson(person);
    this.isEditing = false;
  }

  // deletes person from list with service method
  deletePerson(person: Person): void {
    this.peopleService.deletePerson(person);
  }

}

