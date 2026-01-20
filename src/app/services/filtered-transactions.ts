import { Injectable, signal, effect } from '@angular/core';
import { Transaction } from '../models/transaction';
import { PropertyStore } from './property-store';
import { TransactionApi } from './transaction-api';
import { filterByCycle } from './date-filter';

@Injectable({ providedIn: 'root' })
export class FilteredTransactions {

  private reload = signal(0);

  all = signal<Transaction[]>([]);
  filtered = signal<Transaction[]>([]);

  constructor(
    private propertyStore: PropertyStore,
    private api: TransactionApi
  ) {
    effect(() => {
      // 👇 these trigger refetch
      const propertyId = this.propertyStore.propertyId();
      const cycle = this.propertyStore.cycle();
      this.reload();

      this.api.byProperty(propertyId).subscribe(data => {
        // IMPORTANT: data is already ALL if propertyId === 0
        this.all.set(data);

        // ONLY apply date filter
        const filteredData = filterByCycle(data, cycle);
        this.filtered.set(filteredData);
      });
    });
  }

  refresh(): void {
    this.reload.update(v => v + 1);
  }
}
