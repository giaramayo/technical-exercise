import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "./shared/components/side-menu/side-menu.component";
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  showNavbar = signal(true);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;
        this.showNavbar.set(!(url === '/' || url === '/error'));
      });
  }

}
