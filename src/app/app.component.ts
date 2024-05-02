import { Component } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'anneth-collections';
  isSpinning: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((routerEvent: Event): void => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.isSpinning = true;
      console.log('Navigation start - Spinner should be visible');

    }
    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationError ||
      routerEvent instanceof NavigationCancel
    ) {
      this.isSpinning = false;
      console.log('Navigation ends - Spinner should be hidden');
    }
  }
}
