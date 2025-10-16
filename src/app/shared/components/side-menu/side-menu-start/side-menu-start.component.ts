import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  icon: SafeHtml;
  label: string;
  route: string;
}

@Component({
  selector: 'side-menu-start',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-start.component.html',
})
export class SideMenuStartComponent {

  private sanitizer: DomSanitizer = inject(DomSanitizer);

  menuOptions: MenuOption[] = [
    {
      icon: this.sanitizer.bypassSecurityTrustHtml(`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
      d="M3.33 10.67H1.88a1.45 1.45 0 0 1 0-2.89h2.3L5.66 6.3L1.6 3.8a1.45 1.45 0 0 1-.52-1.91a1.47 1.47 0 0 1 2-.77l5.3 2.45L10.94.98a1.47 1.47 0 1 1 2.08 2.08l-2.59 2.56l2.45 5.35a1.46 1.46 0 0 1-.77 1.95a1.45 1.45 0 0 1-1.91-.52L7.7 8.34L6.22 9.82v2.3a1.45 1.45 0 0 1-2.89 0z" stroke-width="1"/>`),
      label: 'Paises',
      route: '/country',
    },
    {
      icon: this.sanitizer.bypassSecurityTrustHtml(`<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
      d="M12.182 7.5h-8.18l-1-5h10a.5.5 0 0 1 .49.59l-.82 4a.49.49 0 0 1-.49.41m-9.18-5L2.582.9a.5.5 0 0 0-.49-.4H.502m3.5 7l.42 2.1a.5.5 0 0 0 .49.4h6.09m-.5 3.5a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1m-5 0a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1" stroke-width="1"/>`),
      label: 'Productos',
      route: '/product',
    },
  ];

}
