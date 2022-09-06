import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }
  login(e: Event) {
    e.preventDefault()

    const email = e.target['elements']['email'].value
    const password = e.target['elements']['password'].value
    this.auth.authenticate({ email, password })
    
  }

}
