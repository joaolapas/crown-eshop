import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MatBadge} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage,
    MatBadge,
    MatIconModule,
    MatButton,
    RouterLink
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
