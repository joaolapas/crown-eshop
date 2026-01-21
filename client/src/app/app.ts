import {Component, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './layout/header/header';
import {HttpClient} from '@angular/common/http';
import { inject } from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {Product} from './shared/models/product';
import {Pagination} from './shared/models/pagination';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
class App implements OnInit {
  baseUrl: string = 'https://localhost:5001/api/';
  private http: HttpClient = inject(HttpClient);   // recebe uma instancia de HttpClient atraves de injeçao de dependência
  products = signal<Product[]>([]);

 ngOnInit(): void {
  this.http.get<Pagination<Product>>(this.baseUrl + 'products').subscribe({
    next:response  => this.products.set(response.data),
    error: error => console.log(error),
    complete: () => console.log('complete'),
  })
 }
}

export default App
