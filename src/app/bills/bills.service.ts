import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillsService {
  spreadsheetId = '1B7Rl-OpAZJG6WPPl5k-LKtZTwt7uZapoM4jUMhAI-mE'
  range = 'Full Data!A1:BB'
  apiKey = 'AIzaSyAg6Uxjg6_SznPVuNipzDwv0adNZa8bl7k'

  googleForm = `https://sheets.googleapis.com/v4/spreadsheets/${this.spreadsheetId}/values/${this.range}?key=${this.apiKey}`
  
  creditCustomers = ['One & Only Mandarina']
  prices = {
    masa : {
      default: 65,
      credit30: 97.5,
    },
    tortilla : {
      default: 45,
      credit30: 67.5,
    },
    maiz : {
      default: 45,
      credit30: 67.5,
    },
    sopes: {
      default: 45
    },
    tlacoyos : {
      docena: 180,
      media_docena: 100,
      pieza: 15
    },
    complementos: {
      nopales: 40,
      salsa: 25,
      frijol: 40,
      queso: 40
    },
    afilado_de_piedras: {
      default: 200,
      credit30: 250
    },
    pinole: {
      default: 150,
      credit30: 225
    }
  }


  constructor(public http: HttpClient) { }
  getForm = () => {
    return this.http.get(this.googleForm)
  }

}
