import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStore } from '../../services/dashboard-store';
import { FilteredTransactions } from '../../services/filtered-transactions';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {

  constructor(
    public dashboard: DashboardStore,
    private filtered: FilteredTransactions
  ) {
    effect(() => {
      this.dashboard.calculate(this.filtered.filtered());
    });
  }
}
