import { Component } from '@angular/core';

@Component({
  selector: 'app-core-layout',
  template: `
    <section class="core-layout">
      <router-outlet></router-outlet>
    </section>
  `,
  styles: [
    `
      .core-layout {
        display: block;
      }
    `,
  ],
})
export class CoreLayoutComponent {}
