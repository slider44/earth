import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CmcService } from '../../services/crypto/cmc.service';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.scss']
})
export class CryptoComponent implements OnInit {
  
  coins:Observable<any[]>;

  constructor(private cmcService:CmcService) { }

  ngOnInit() {
    this.coins = this.cmcService.getCoins();
  }

}
