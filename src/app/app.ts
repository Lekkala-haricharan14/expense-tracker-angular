import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Header } from './layout/header/header';
import { Sidebar } from './layout/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    Header,
    Sidebar
  ],
  template: `
    <app-header></app-header>

    <div class="layout">
      <app-sidebar></app-sidebar>

      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      background: var(--bg-app);
    }

    .layout {
      display: flex;
      height: calc(100vh - 64px);
    }

    .content {
      flex: 1;
      padding: 24px 32px;
      overflow-y: auto;
      background: var(--bg-app);
    }
  `]
})
export class App {}
