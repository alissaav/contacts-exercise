import { Component, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Person } from '../person';
import { EventEmitter } from '@angular/core';
import { PeopleService } from '../people.service';
import { Telephone } from '../telephone';
import { Email } from '../email';
import { Address } from '../adress';

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
  contactForm!: FormGroup;
  addressForm!: FormGroup;

  constructor(private peopleService: PeopleService, private formBuilder: FormBuilder){}

  people: Person[] = [];

  ngOnInit(): void {

    // get people array from service
    this.people = this.peopleService.getPeople();

    this.addressForm = this.formBuilder.group({
      street: [this.person?.address?.street, {
        validators: [Validators.required]
      }],
      postcode: [this.person?.address?.postcode, {
        validators: [Validators.required]
      }],
      city: [this.person?.address?.city, {
        validators: [Validators.required]
      }],
      country: [this.person?.address?.country, {
        validators: [Validators.required]
      }],
    })

    this.contactForm = this.formBuilder.group({
      firstname: [this.person?.firstname, {
        validators: [Validators.required]
      }],
      lastname: [this.person?.lastname, {
        validators: [Validators.required]
      }],
      tel: this.formBuilder.array([]),
      email: this.formBuilder.array([]),
      address: this.addressForm,
    });

    this.person?.tel.forEach(tel => {
      console.log(tel);
      this.addTelephone(tel.desc, tel.number);
    });

    this.person?.email.forEach(email => {
      this.addEmail(email.desc, email.address);
    });
  }

  get telephones() {
    return this.contactForm.get('tel') as FormArray;
  }

  addTelephone(desc = "Mobil", number = NaN){
    const telForm = this.formBuilder.group({
      desc: [desc, Validators.required],
      number: [number, Validators.required]
    });
    this.telephones.push(telForm);
  }

  deleteTelephone(index: number){
    this.telephones.removeAt(index);
  }

  get emails() {
    return this.contactForm.get('email') as FormArray;
  }

  addEmail(desc = "Privat", address = ""){
    const emailForm = this.formBuilder.group({
      desc: [desc, Validators.required],
      address: [address, Validators.required]
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
        tel: this.contactForm.controls['tel'].value as Telephone[],
        email: this.contactForm.controls['email'].value as Email[],
        address: <Address>{
          street: this.addressForm.controls['street'].value as string,
          postcode: this.addressForm.controls['postcode'].value as number,
          city: this.addressForm.controls['city'].value as string,
          country: this.addressForm.controls['country'].value as string,
        }

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
      this.person.tel = this.contactForm.controls['tel'].value as Telephone[];
      this.person.email = this.contactForm.controls['email'].value as Email[];
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
