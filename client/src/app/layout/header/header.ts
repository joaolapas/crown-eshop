import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {MatBadge} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [
    NgOptimizedImage,
    MatBadge,
    MatIconModule,
    MatButton
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

}
