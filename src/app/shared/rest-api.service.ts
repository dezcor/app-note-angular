import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpHandler} from '@angular/common/http'
import { User } from './user'
import { Note } from './note'
import { Observable,throwError } from 'rxjs';
import {retry,catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  currentUser = JSON.parse(localStorage.getItem('currentUser'))
  apiURL = 'https://app-of-note.herokuapp.com/';
  token =""

  constructor(private http: HttpClient) {
    if(this.currentUser)
      this.token = this.currentUser['token'];
    else
      this.token = ""
   }

  httpOptions = {
    headers: {
      'Content-TYpe':'application/json',
      'x-access-token':this.token 
    }
  }

  update(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if(this.currentUser)
      this.token = this.currentUser['token'];
    else
      this.token = ""
    this.httpOptions.headers['x-access-token'] = this.token
  }
  getUsers(): Observable<User>{
    this.httpOptions.headers['x-access-token'] = this.token
    return this.http.get<User>(this.apiURL+'/user',this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  getUser(id): Observable<User>{
    this.httpOptions.headers['x-access-token'] = this.token
    return this.http.get<User>(this.apiURL + '/user/' + id,this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  createUser(user): Observable<User>{
    return this.http.post<User>(this.apiURL + '/user',JSON.stringify(user),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  updateUser(id,user): Observable<User>{
    this.httpOptions.headers['x-access-token'] = this.token
    return this.http.put<User>(this.apiURL +'/user/'+id,JSON.stringify(user),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  deleteUser(id){
    this.httpOptions.headers['x-access-token'] = this.token
    return this.http.delete<User>(this.apiURL+'/user/'+id,this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  createNote(note: Note): Observable<Note> {
    this.httpOptions.headers['x-access-token'] = this.token
    return this.http.post<Note>(this.apiURL + '/note',JSON.stringify(note),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  getAllNotes(): Observable<Note[]>{
    this.httpOptions.headers['x-access-token'] = this.token
    return this.http.get<Note[]>(this.apiURL + '/note/',this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  getNote(id): Observable<Note>{
    this.httpOptions.headers['x-access-token'] = this.token
    return this.http.get<Note>(this.apiURL + `/note/${id}`,this.httpOptions)
    .pipe(retry(1),catchError(this.handleError),)
  }

  updateNote(id,note): Observable<Note>{
    this.httpOptions.headers['x-access-token'] = this.token
    return this.http.put<Note>(this.apiURL + `/note/${id}`,JSON.stringify(note),this.httpOptions)
    .pipe(retry(1),catchError(this.handleError))
  }

  deleteNote(id: '') {
    this.httpOptions.headers['x-access-token'] = this.token
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
