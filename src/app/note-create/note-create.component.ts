import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs/operators';
import { AuthenticationService } from '../shared/authentication.service';
import { RestApiService } from '../shared/rest-api.service'
import { AlertService } from '../shared/alert.service'
import { User } from '../shared/user';
import { Note } from '../shared/note';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.css']
})
export class NoteCreateComponent implements OnInit {
  currentUser: User;
  detail : User;
  noteForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private restApi: RestApiService,
    private alert: AlertService) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      this.restApi.getUser(this.currentUser.id).subscribe(x => this.detail = x);
    }

  ngOnInit() {
    this.noteForm = this.formBuilder.group({
        title: ['',Validators.required],
        note: ['', Validators.required],
  });
  // get return url from route parameters or default to '/'
  this.returnUrl = this.actRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.noteForm.controls; }

  onSubmit() {
    this.alert.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.noteForm.invalid) {
        return;
    }

    this.loading = true;
    this.restApi.createNote(this.noteForm.value)
    .pipe(first())
      .subscribe(
        data => {
          this.alert.success('Create note successful',true);
          this.router.navigate(['/']);
        },
        error => {
          this.alert.error(error,true);
          this.loading = false;
        });
  }

}
