import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../models/transaction';

@Injectable({ providedIn: 'root' })
export class TransactionApi {
  private API = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) {}

 byProperty(propertyId: number) {
  if (propertyId === 0) {
    return this.http.get<Transaction[]>(this.API);
  }

  return this.http.get<Transaction[]>(
    `${this.API}?propertyId=${propertyId}`
  );
}

  add(tx: Transaction) {
    return this.http.post(this.API, tx);
  }

  remove(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }
}
