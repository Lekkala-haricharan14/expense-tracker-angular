import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyStore {

  /**
   * Property selection
   * 0 = All Properties (Earthy Escape + Millennium Farm combined)
   * 1 = Earthy Escape
   * 2 = Millennium Farm
   */
  propertyId = signal<number>(0);

  /**
   * Time cycle filter
   */
  cycle = signal<'monthly' | 'quarterly' | 'yearly'>('monthly');

  setProperty(id: number): void {
    this.propertyId.set(id);
  }

  setCycle(cycle: 'monthly' | 'quarterly' | 'yearly'): void {
    this.cycle.set(cycle);
  }
}
