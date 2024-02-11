import { Component } from '@angular/core';
import { Person } from '../person';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']

})
export class PeopleComponent {

  people: Person[] = [];

  constructor(private peopleService: PeopleService){}

  isAdding: boolean = false;
  isEditing: boolean = false;

  selectedPerson?: Person;
  onSelect(person: Person): void {
    if(this.selectedPerson == person){
      this.selectedPerson = undefined;
    } else {
      this.selectedPerson = person;
    }
  }

  ngOnInit(): void {
    this.people = this.peopleService.getPeople();
    this.people.sort((a, b) => (a.lastname.toUpperCase() < b.lastname.toUpperCase() ? -1 : 1));
  }

  ngDoCheck() {
    console.log("ngDoCheck called");

      this.ngOnInit();
      console.log(this.isEditing)
  }

  toggleAdding(val: boolean): void {
    console.log("toggleAdding called");
    this.isAdding = val;
    this.selectedPerson = undefined;
  }

  toggleEditing(val: boolean): void {
    console.log("toggleEditing called");
    this.isEditing = val;
  }

  checkIfAddingShouldBeDisabled(): boolean {
    return this.isEditing;
  }

}
