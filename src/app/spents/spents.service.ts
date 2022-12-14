import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpentsService {

  spreadsheetId = '1ngjMaDo5KeXP0mcSD9u0yd4cByZXfOqw2WHPHOocXL8'
  range = 'Full Data Egresos!A2:BA'
  apiKey = 'AIzaSyAg6Uxjg6_SznPVuNipzDwv0adNZa8bl7k'

  googleForm = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.range}?key=${this.apiKey}`
  
 constructor(public http: HttpClient) { }
  getForm = () => {
    return this.http.get(this.googleForm)
  }

}
