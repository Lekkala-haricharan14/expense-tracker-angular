import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PropertyStore } from '../../services/property-store';
import { FilteredTransactions } from '../../services/filtered-transactions';
import { TransactionApi } from '../../services/transaction-api';
import { Transaction } from '../../models/transaction';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transactions.html',
  styleUrls: ['./transactions.css']
})
export class Transactions {

  // ✅ Declare first
  transactions = signal<Transaction[]>([]);

  type: 'income' | 'expense' = 'income';
  category = '';
  amount = 0;
  date = '';

  // ✅ Used only when "All Properties" is selected
  selectedPropertyId = signal<number>(0);

  constructor(
    public propertyStore: PropertyStore,
    private filtered: FilteredTransactions,
    private api: TransactionApi
  ) {
    // ✅ Assign AFTER DI
    this.transactions = this.filtered.filtered;

    // default selection
    this.selectedPropertyId.set(this.propertyStore.propertyId());
  }

  add() {
    const propertyId =
      this.propertyStore.propertyId() === 0
        ? this.selectedPropertyId()
        : this.propertyStore.propertyId();

    if (!propertyId || !this.amount || !this.date) return;

    this.api.add({
      propertyId,
      type: this.type,
      category: this.category,
      amount: this.amount,
      date: this.date,
      description: ''
    }).subscribe(() => {
      this.filtered.refresh();
      this.amount = 0;
      this.category = '';
    });
  }

  remove(id: number) {
    this.api.remove(id).subscribe(() => {
      this.filtered.refresh();
    });
  }
}
