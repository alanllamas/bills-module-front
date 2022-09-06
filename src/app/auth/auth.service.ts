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
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // firebaseConfig =
  // {
  //   apiKey: "AIzaSyDHG0_TlvCq5YWy81tfR0xzuwhicjIgfPw",
  //   authDomain: "itacate-10070.firebaseapp.com",
  //   projectId: "itacate-10070",
  //   storageBucket: "itacate-10070.appspot.com",
  //   messagingSenderId: "1090728081415",
  //   appId: "1:1090728081415:web:d8cfd8ec824ecf5d9e52a2",
  //   measurementId: "G-FDFRPGF8R9"
  // };

  // databaseURL: "FIREBASE_DATABASE_URL"

  // appID: "1:1090728081415:web:d8cfd8ec824ecf5d9e52a2"

  // Initialize Firebase
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
