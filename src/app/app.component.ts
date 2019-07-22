import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './shared/authentication.service';
import { RestApiService } from './shared/rest-api.service'
import { User } from './shared/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-note';
  currentUser: User;
  detail : User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService,
      private restApi: RestApiService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.authenticationService.logout();
      this.restApi.update()
      this.router.navigate(['/login']);
  }
}
