import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpHandler} from '@angular/common/http'
import { User } from './user'
import { Note } from './note'
import { Observable,throwError } from 'rxjs';
import {retry,catchError} from 'rxjs/operators';
import {AuthenticationService} from './authentication.service'
@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  currentUser: User;
  apiURL = 'https://app-of-note.herokuapp.com';
  token =""

  constructor(private http: HttpClient,
              private authenticationService:AuthenticationService ) {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x
      if(this.currentUser)
        this.token = this.currentUser['token'];
      else
        this.token = ""
      this.httpOptions.headers['x-access-token'] = this.token
    });
   }

  httpOptions = {
    headers: {
      'Content-TYpe':'application/json',
      'x-access-token':this.token 
    }
  }

  update(){
    
  }
  getUsers(): Observable<User>{
    return this.http.get<User>(this.apiURL+'/user',this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  getUser(id): Observable<User>{
    return this.http.get<User>(this.apiURL + '/user/' + id,this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  createUser(user): Observable<User>{
    return this.http.post<User>(this.apiURL + '/user',JSON.stringify(user),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  updateUser(id,user): Observable<User>{
    return this.http.put<User>(this.apiURL +'/user/'+id,JSON.stringify(user),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  deleteUser(id){
    return this.http.delete<User>(this.apiURL+'/user/'+id,this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  createNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiURL + '/note',JSON.stringify(note),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  getAllNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(this.apiURL + '/note/',this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  getNote(id): Observable<Note>{
    return this.http.get<Note>(this.apiURL + `/note/${id}`,this.httpOptions)
    .pipe(retry(1),catchError(this.handleError),)
  }

  updateNote(id,note): Observable<Note>{
    return this.http.put<Note>(this.apiURL + `/note/${id}`,JSON.stringify(note),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  deleteNote(id: '') {
    return this.http.delete(this.apiURL + `/note/${id}`,this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  handleError(error){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Error Code ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
