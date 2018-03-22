import { Component, OnInit, Inject } from '@angular/core';
import { UserComponent } from '../../../user/user.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-holding-dialog',
  templateUrl: './add-holding-dialog.component.html',
  styleUrls: ['./add-holding-dialog.component.scss']
})
export class AddHoldingDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
