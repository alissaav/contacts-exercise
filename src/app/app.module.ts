import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';

import { NgFor, NgIf } from '@angular/common';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonEditComponent } from './person-edit/person-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent,
    PersonDetailComponent,
    PersonEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgFor,
    NgIf,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
