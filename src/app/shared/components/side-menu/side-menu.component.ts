import { Component } from '@angular/core';
import { SideMenuStartComponent } from "./side-menu-start/side-menu-start.component";
import { SideMenuEndComponent } from "./side-menu-end/side-menu-end.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'side-menu',
  imports: [SideMenuStartComponent, SideMenuEndComponent, RouterLink],
  template: `
    <div class="navbar bg-base-100 shadow-sm">
      <div class="navbar-start">
          <side-menu-start />
      </div>
      <div class="navbar-center">
        <a class="btn btn-ghost text-xl" routerLink="/">
          <h1 class="text-lg md:text-2xl font-bold text-white">Carreras<span class="text-green-500">App</span></h1>
        </a>
      </div>
      <div class="navbar-end">
        <side-menu-end />
      </div>
    </div>
  `
})
export class SideMenuComponent { }
