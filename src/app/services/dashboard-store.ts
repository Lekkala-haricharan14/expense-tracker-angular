import { Injectable, signal } from '@angular/core';
import { Transaction } from '../models/transaction';

@Injectable({ providedIn: 'root' })
export class DashboardStore {
  income = signal(0);
  expenses = signal(0);
  profit = signal(0);
  margin = signal(0);

  calculate(data: Transaction[]) {
    const income = data.filter(t => t.type === 'income')
      .reduce((a, b) => a + b.amount, 0);

    const expenses = data.filter(t => t.type === 'expense')
      .reduce((a, b) => a + b.amount, 0);

    this.income.set(income);
    this.expenses.set(expenses);
    this.profit.set(income - expenses);
    this.margin.set(income ? Math.round((income - expenses) / income * 100) : 0);
  }
}
