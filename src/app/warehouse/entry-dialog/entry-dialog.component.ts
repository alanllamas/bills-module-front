import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entry-dialog',
  templateUrl: './entry-dialog.component.html',
  styleUrls: ['./entry-dialog.component.scss']
})
export class EntryDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<any>,
    public router: Router
  ) {}
  url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLScyG_hZnNpzviISUCiMNev0hqAFeT2ZEIT0HQE-BVWLns6uSg/formResponse';

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate([], {skipLocationChange: true})
  }
  
  ngOnInit(): void {
  }

}
