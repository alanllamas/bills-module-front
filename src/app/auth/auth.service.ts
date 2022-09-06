import { Injectable } from '@angular/core';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { SetToken } from '../states/auth.actions';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Dispatch() login = (token, expirationTime, refreshToken) => new SetToken(token, expirationTime, refreshToken);
 
  app = initializeApp(environment.FirebaseConfig);
  analytics = getAnalytics(this.app);
  auth = getAuth(this.app)

  constructor() { }
  async authenticate({ email, password }) {
    // console.log(email, password );
    
    const rawSignin = await signInWithEmailAndPassword(this.auth, email, password)
    const tokenData = rawSignin.user['stsTokenManager']
    this.login(tokenData['accessToken'],tokenData['expirationTime'],tokenData['refreshToken'])
    // console.log(tokenData);
  
  }
}
