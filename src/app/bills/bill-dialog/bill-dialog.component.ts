import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-bill-dialog',
  templateUrl: './bill-dialog.component.html',
  styleUrls: ['./bill-dialog.component.scss']
})
export class BillDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {}
  url: any;
  today = new Date()

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url)
  }
  // numero de nota
  // fecha
  // Area
  // Cliente
  // Monto
  // Monto de envio
  // Monto total
  // Metodo de pago
  // Periodo de pago
  // status de pago
  // Fecha de pago
  // Comentarios
  // espacio

  // data print from notas itacate 2023
  // entry.108021599: numero
  // entry.454952271: fecha
  // entry.813063681: area
  // entry.257303386: cleinte
  // entry.1051691104: productos
  // entry.1575474822: monto
  // entry.472948840: envio
  // entry.711224991: total
  // entry.94495669: metodo
  // entry.1523768582: periodo
  // entry.158052936: status
  // entry.1753859473: fecha de pago
  // entry.719948049: comentarios
  // entry.1633041391: espacio



  // https://docs.google.com/forms/d/e/1FAIpQLSdLRrmAEskI0eDZjoxfM-tvqmsGeUF1g7QMBzhQr08NtcWqpw/viewform?usp=sf_link      formulario notas 2023 cambio de productos

}
