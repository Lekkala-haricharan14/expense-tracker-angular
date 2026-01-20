import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilteredTransactions } from '../../services/filtered-transactions';
import { Transaction } from '../../models/transaction';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrls: ['./reports.css']
})
export class Reports {

  // ✅ Declare first
  transactions = signal<Transaction[]>([]);

  constructor(private filtered: FilteredTransactions) {
    // ✅ Assign AFTER DI
    this.transactions = this.filtered.filtered;
  }

  // ================================
  // 1️⃣ PROPERTY COMPARISON
  // ================================
  propertySummary = computed(() => {
    const data = this.transactions();

    const summary = {
      earthy: { income: 0, expense: 0 },
      millennium: { income: 0, expense: 0 }
    };

    data.forEach(t => {
      const target =
        t.propertyId === 1 ? summary.earthy : summary.millennium;

      if (t.type === 'income') target.income += t.amount;
      else target.expense += t.amount;
    });

    return summary;
  });

  // ================================
  // 2️⃣ CATEGORY-WISE EXPENSE
  // ================================
  expenseByCategory = computed(() => {
    const map: Record<string, number> = {};

    this.transactions()
      .filter(t => t.type === 'expense')
      .forEach(t => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });

    return Object.entries(map);
  });

  // ================================
  // 3️⃣ CSV EXPORT
  // ================================
  exportCSV() {
    const rows = this.transactions();

    const csv = [
      ['Property', 'Type', 'Category', 'Amount', 'Date'],
      ...rows.map(t => [
        t.propertyId === 1 ? 'Earthy Escape' : 'Millennium Farm',
        t.type,
        t.category,
        t.amount,
        t.date
      ])
    ]
      .map(r => r.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'financial-report.csv';
    a.click();
  }
  incomeByCategory = computed(() => {
  const map: Record<string, number> = {};

  this.transactions()
    .filter(t => t.type === 'income')
    .forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });

  return Object.entries(map);
});
}
