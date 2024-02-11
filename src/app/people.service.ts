import { Injectable } from '@angular/core';
import { Person } from './person';
import { PEOPLE } from './mock-people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  people: Person[] = PEOPLE;

  constructor() { }

  getPeople(): Person[] {

    return this.people;
  }

  deletePerson(personToDelete: Person): void {
    this.people = this.people.filter(p => p !== personToDelete );
    console.log("Service recieved delete");
    console.log(this.people)
  }
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
