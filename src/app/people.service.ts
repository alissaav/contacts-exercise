import { Injectable } from '@angular/core';
import { Person } from './person';
import { PEOPLE } from './mock-people';

@Injectable({
  providedIn: 'root'
})

// singleton class to organize list of people
export class PeopleService {

  // list of people
  people: Person[] = PEOPLE;

  constructor() { }

  // returns list of people
  getPeople(): Person[] {
    return this.people;
  }

  // deletes person from list
  deletePerson(personToDelete: Person): void {
    this.people = this.people.filter(p => p !== personToDelete );
    console.log("Service recieved delete");
    console.log(this.people)
  }

  // updates person's data
  editPerson(personToEdit: Person): void {
    const index = this.people.findIndex(p => p.id == personToEdit.id);
    this.people[index].firstname = personToEdit.firstname;
    this.people[index].lastname = personToEdit.lastname;
    this.people[index].tel = personToEdit.tel;
    this.people[index].email = personToEdit.email;
    this.people[index].address = personToEdit.address;
  }
  addPerson(personToAdd: Person): void {
    this.people.push(personToAdd);
  }

}
