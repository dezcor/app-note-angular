import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { AuthenticationService } from '../shared/authentication.service';
import { RestApiService } from '../shared/rest-api.service';
import { AlertService } from '../shared/alert.service';
import { User } from '../shared/user';
import { Note } from '../shared/note';

@Component({
  selector: 'app-note-update',
  templateUrl: './note-update.component.html',
  styleUrls: ['./note-update.component.css']
})
export class NoteUpdateComponent implements OnInit {
  currentUser: User;
  detail : User;
  noteForm: FormGroup;
  id = this.actRoute.snapshot.params['id'];
  loading = false;
  submitted = false;
  returnUrl: string;
  notes: Note;
  // id = this.actRoute.snapshot.params['id'];
  // employeeData: any = {};
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private restApi: RestApiService,
    private alert: AlertService) { 
      this.restApi.getNote(this.id).pipe(first()).subscribe(note => this.notes = note);
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.restApi.getUser(this.currentUser.id).subscribe(x => this.detail = x);
  }

  get f() { return this.noteForm.controls; }

  ngOnInit() {  
    this.noteForm = this.formBuilder.group({
      title : ['', Validators.required],
      note :  ['', Validators.required]
    });
    //this.noteForm.patchValue({note:this.notes.note});
  }

  onSubmit() {
    this.alert.clear();

    this.submitted = true;

    // stop here if form is invalid
    if (this.noteForm.invalid) {
        return;
    }

    this.loading = true;
    if(window.confirm('Are you sure, you want to update?')){
      this.restApi.updateNote(this.id,this.noteForm.value)
      .pipe(first())
        .subscribe(
          data => {
              this.alert.success('Update successful');
              this.router.navigate(['/']);
          },
          error => {
            this.alert.error(error);
            this.loading = false;
          });
    }
  }

  get note() { return this.noteForm.get('note'); }

}
