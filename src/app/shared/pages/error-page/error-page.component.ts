import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'error-page',
  imports: [RouterLink, ButtonModule],
  templateUrl: './error-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent { }
