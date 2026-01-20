import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyStore } from '../../services/property-store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  constructor(public store: PropertyStore) {}

  changeProperty(e: Event) {
    this.store.setProperty(+(e.target as HTMLSelectElement).value);
  }

  setCycle(c: any) {
    this.store.setCycle(c);
  }
}
