import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  spreadsheetId : string = ''; 
  range : string = '';
  rangeBalance : string = '';
  rangeHistory : string = '';
  apiKey : string = '';
  googleSheet : string = '';
  

  constructor(public http: HttpClient) { }
  getForm = (range: string) => {
    
    this.spreadsheetId = '1YCHqQ-OGVtH-wQHlzsbuGARGrBsG-H6KUxuYEWo9nCo'
    this.range = range
    this.apiKey = 'AIzaSyAg6Uxjg6_SznPVuNipzDwv0adNZa8bl7k'
    this.googleSheet = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.range}?key=${this.apiKey}`
    return this.http.get(this.googleSheet)
  }

  getStrapi = (model: string, populate = '*') => {
    
    return this.http.get(`${environment.strapiURL}/api/${model}?populate=${populate}`, {
      headers:{
        'Authorization': `Bearer ${environment.strapiToken}`
      }
    })
  }
  postStrapi(url, data) {
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${environment.strapiToken}`
      }
    })
  }
}
