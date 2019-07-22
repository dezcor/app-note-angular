import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { AuthenticationService } from '../shared/authentication.service';
import { RestApiService } from '../shared/rest-api.service'
import { User } from '../shared/user';
import { Note } from '../shared/note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  currentUser: User;
  detail : User;
  notes: Note[];
  // id = this.actRoute.snapshot.params['id'];
  // employeeData: any = {};
  constructor(
    private authenticationService: AuthenticationService,
    private restApi: RestApiService) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.restApi.getUser(this.currentUser.id).subscribe(x => this.detail = x);
    }
  ngOnInit() {
    this.loadAllNotes()
  }

  private loadAllNotes() {
    this.restApi.getAllNotes()
        .pipe(first())
        .subscribe(notes => this.notes = notes);
  }

  deleteNote(id){
    this.restApi.deleteNote(id)
    .pipe(first())
    .subscribe(() => this.loadAllNotes());
  }


}
