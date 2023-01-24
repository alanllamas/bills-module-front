import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-spent-dialog',
  templateUrl: './spent-dialog.component.html',
  styleUrls: ['./spent-dialog.component.scss']
})
export class SpentDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {}
  url: any;

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  
  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url)
  }


  // entry.996343720: comprobante
  // entry.1662826040: numero comprobante
  // entry.392821686: fecha egreso
  // entry.13426703: area
  // entry.1836148303: concepto
  // entry.127432045: proveedor
  // entry.1349422156: monto
  // entry.1340726580: costo de envio
  // entry.1994483305: monto total
  // entry.656246718: metodo de pago
  // entry.1384252505: status
  // entry.1105378917: comentarios
  // entry.184415677: caja
  // entry.1728109210: categoria

  // https://docs.google.com/forms/d/e/1FAIpQLSc0xIsQOM9mB1G8xnKhcxZ1Kavq6noOyOrnLY1bpGkyjl7U3Q/viewform?usp=sf_link
}
