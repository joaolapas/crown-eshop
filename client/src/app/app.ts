import {Component, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './layout/header/header';
import {ShopComponent} from './features/shop/shopComponent';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ShopComponent,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
class App {

}

export default App
