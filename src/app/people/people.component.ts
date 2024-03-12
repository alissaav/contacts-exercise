import { Component } from '@angular/core';
import { Person } from '../person';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']

})
// wrapper component for contact app
export class PeopleComponent {

  // list of all people
  people: Person[] = [];

  constructor(private peopleService: PeopleService){}

  // boolean flags to tell apart if editing and creating person
  isAdding: boolean = false;
  isEditing: boolean = false;

  // stores selected person from list
  selectedPerson?: Person;

  // method to save selected person
  onSelect(person: Person): void {
    if(this.selectedPerson == person){
      this.selectedPerson = undefined;
    } else {
      this.selectedPerson = person;
    }
  }

  // gets and sorts list of people from service
  ngOnInit(): void {
    this.people = this.peopleService.getPeople();
    this.people.sort((a, b) => (a.lastname.toUpperCase() < b.lastname.toUpperCase() ? -1 : 1));
  }

  // updates view on input
  ngDoCheck() {
    console.log("ngDoCheck called");

      this.ngOnInit();
      console.log(this.isEditing)
  }

  // changes isAdding flag
  toggleAdding(val: boolean): void {
    console.log("toggleAdding called");
    this.isAdding = val;
    this.selectedPerson = undefined;
  }

  // changes isEditing flag
  toggleEditing(val: boolean): void {
    console.log("toggleEditing called");
    this.isEditing = val;
  }

}
