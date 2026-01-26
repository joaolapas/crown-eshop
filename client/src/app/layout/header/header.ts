import {Component, inject} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MatBadge} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {Busy} from '../../core/services/busy';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatProgressBar} from '@angular/material/progress-bar';

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage,
    MatBadge,
    MatIconModule,
    MatButton,
    RouterLink,
    RouterLinkActive,
    MatProgressSpinner,
    MatProgressBar
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  busyService = inject(Busy);
}
