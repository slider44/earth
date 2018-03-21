import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coin } from '../../models/coin';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CmcService {

  constructor(private http:HttpClient) { }

  readonly ROOT_URL='https://api.coinmarketcap.com/v1/';

  coins:Observable<Coin[]>;

  getCoins(){
    this.coins = this.http.get<Coin[]>(this.ROOT_URL+'/ticker');
    return this.coins;
  }
  
}
