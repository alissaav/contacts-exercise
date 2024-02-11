import { Component, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Person } from '../person';
import { EventEmitter } from '@angular/core';
import { PeopleService } from '../people.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent {
  @Input() person?: Person;
  @Output() toggleIsEditingOrAdding: EventEmitter<boolean> = new EventEmitter();



  //
  //contactForm = new FormGroup({
  //  firstname: new FormControl(this.person?.firstname, [Validators.required]),
  //  lastname: new FormControl(this.person?.lastname, [Validators.required]),
  //});
  contactForm: FormGroup = this.formBuilder.group({
    firstname: ['', {
      validators: [Validators.required]
    }],
    lastname: ['', {
      validators: [Validators.required]
    }],
    tel: this.formBuilder.array([]),
    email: this.formBuilder.array([]),
    address: this.formBuilder.group({
      street: ['', {
        validators: [Validators.required]
      }],
      postcode: [0, {
        validators: [Validators.required]
      }],
      city: ['', {
        validators: [Validators.required]
      }],
      country: ['', {
        validators: [Validators.required]
      }],
    })
  })

  constructor(private peopleService: PeopleService, private formBuilder: FormBuilder){}

  people: Person[] = [];

  ngOnInit(): void {

    // get people array from service
    this.people = this.peopleService.getPeople();



    // prepopulate input fields if component was passed person object
    if(this.people){
      this.contactForm.controls['firstname'].setValue(this.person?.firstname);
      this.contactForm.controls['lastname'].setValue(this.person?.lastname);
      this.contactForm.controls['tel'].setValue(this.person?.tel);
      this.contactForm.controls['email'].setValue(this.person?.email);
      this.contactForm.controls['address'].setValue(this.person?.address)
    }
  }

  get telephones() {
    return this.contactForm.get('tel') as FormArray;
  }

  addTelephone(){
    const telForm = this.formBuilder.group({
      desc: ['Mobil', Validators.required],
      number: [0, Validators.required]
    });
    this.emails.push(telForm);
  }

  deleteTelephone(index: number){
    this.telephones.removeAt(index);
  }

  get emails() {
    return this.contactForm.controls["email"] as FormArray;
  }

  addEmail(){
    const emailForm = this.formBuilder.group({
      desc: ['Privat', Validators.required],
      address: ['', Validators.required]
    });
    this.emails.push(emailForm);
  }

  deleteEmail(index: number){
    this.emails.removeAt(index);
  }


  // cancels editing mode
  cancel(): void {
    this.toggleIsEditingOrAdding.emit(false);
  }

  // Saves new Person
  save(): void {
    if(!this.person) {

      // create new person object from input data
      let newPerson: Person = {
        id: this.getSmallestId(),
        firstname: this.contactForm.controls['firstname'].value as string,
        lastname: this.contactForm.controls['lastname'].value as string,
        tel: [],
        email: [],
        address: undefined
      }

      // send new person to people service
      this.peopleService.addPerson(newPerson);
      // cancels editing mode
      this.toggleIsEditingOrAdding.emit(false);
    }
  }

  // Updates edited Person
  update(): void {
    if(this.person){
      this.person.firstname = this.contactForm.controls['firstname'].value as string;
      this.person.lastname = this.contactForm.controls['lastname'].value as string;
      console.log(this.person);
      this.peopleService.editPerson(this.person);
    }

    // cancels editing mode
    this.toggleIsEditingOrAdding.emit(false);
  }

  // Delete Person from People Array
  delete(person: Person): void {
    this.peopleService.deletePerson(person);
  }

  // Get the smallest, not used ID
  getSmallestId(): number {
    var id: number = 0;
    let sortedArray: Person[] = [];
    this.people.forEach(p => sortedArray.push(Object.assign({}, p)));
    sortedArray.sort((a, b) => { return a.id - b.id});
    sortedArray.forEach(person => {
      if(person.id == id){
        id++;
      }
    });
    return id;
  }
}
