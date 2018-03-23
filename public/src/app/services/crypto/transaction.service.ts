import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../../src/app/models/transaction';

@Injectable()
export class TransactionService {
  private readonly API_URL = 'http://localhost:1337/transactions';
  
  constructor(private _httpClient: HttpClient) { }

  addTransaction(transaction: Transaction){
    
  }

}
