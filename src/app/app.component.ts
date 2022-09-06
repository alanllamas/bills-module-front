import { Component } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Logout } from './states/auth.actions';
import { AuthState } from './states/auth.state';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Admin Itacate';
  @Select(AuthState.isLoggedIn) logged: Observable<boolean>

  @Dispatch() logout = () => new Logout()
}
