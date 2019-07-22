import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { NoteUpdateComponent } from './note-update/note-update.component';
import { NoteListComponent } from './note-list/note-list.component';
import { LoginComponent } from './components/login/login.component'
import { UserCreateComponent } from './user-create/user-create.component';

import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {path: 'login',component:LoginComponent},
  //Note
  {path: 'create-note',component:NoteCreateComponent,canActivate:[AuthGuard]},
  {path: 'note-details/:id',component:NoteDetailsComponent,canActivate:[AuthGuard]},
  {path: 'update-note/:id',component:NoteUpdateComponent,canActivate:[AuthGuard]},
  {path: '',component:NoteListComponent,canActivate:[AuthGuard]},
  //User
  {path: 'resgister',component:UserCreateComponent},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
