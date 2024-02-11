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

  @Input() person?: Person;
  @Output() toggleIsEditing = new EventEmitter<boolean>();
  isEditing: boolean = false;

  toggleEditing(val: boolean): void {
    this.isEditing = val;
    this.toggleIsEditing.emit(val);
    console.log("is editing toggled " + val);
  }

  editPerson(person: Person): void {
    this.peopleService.editPerson(person);
    this.isEditing = false;
  }

  deletePerson(person: Person): void {
    this.peopleService.deletePerson(person);
  }

}

