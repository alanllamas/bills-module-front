import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  spreadsheetId : string = ''; 
  range : string = '';
  rangeBalance : string = '';
  rangeHistory : string = '';
  apiKey : string = '';
  googleSheet : string = '';
  
  constructor(public http: HttpClient) { }
  getForm = (month: string) => {
    this.spreadsheetId = '1K3OwbHzHqnbJzysqMoNRnIustkK9ISf5Uos_wVkFa68'
    this.range = `${month}!B2:AZ`
    this.apiKey = 'AIzaSyAg6Uxjg6_SznPVuNipzDwv0adNZa8bl7k'
    this.googleSheet = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.range}?key=${this.apiKey}`
    return this.http.get(this.googleSheet)
  }
}
