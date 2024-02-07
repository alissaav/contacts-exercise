import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { Person } from '../person';
import { PEOPLE } from '../mock-people';

@Component({
  standalone: true,
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  imports: [
    NgFor
  ]

})
export class PeopleComponent {

  people = PEOPLE;

  person: Person = {
    id: 1,
    firstname: 'Nils',
    lastname: 'Jansen'
  }
  constructor() { }


}
