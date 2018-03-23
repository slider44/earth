import { Component, OnInit, Inject } from '@angular/core';
import { UserComponent } from '../../../user/user.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CmcService } from '../../../../services/crypto/cmc.service';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operator/map';
import { Coin } from '../../../../models/coin';

@Component({
  selector: 'app-add-holding-dialog',
  templateUrl: './add-holding-dialog.component.html',
  styleUrls: ['./add-holding-dialog.component.scss']
})
export class AddHoldingDialogComponent implements OnInit {
  coins:Observable<Coin[]>;
  coinCtrl: FormControl;
  filteredCoins: Observable<Coin[]>;

  constructor(public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private cmcService: CmcService) { 
      
    }
  ngOnInit() {
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
