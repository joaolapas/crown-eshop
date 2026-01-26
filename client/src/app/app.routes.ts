import { Routes } from '@angular/router';
import {Home} from './features/home/home';
import {ShopComponent} from './features/shop/shopComponent';
import {ProductDetails} from './features/shop/product-details/product-details';
import {TestErrors} from './features/test-errors/test-errors';
import {ServerError} from './shared/components/server-error/server-error';
import {NotFound} from './shared/components/not-found/not-found';

export const routes: Routes = [
  {path: '', component:Home},
  {path: 'shop', component:ShopComponent},
  {path: 'shop/:id', component:ProductDetails},
  {path: 'test-errors', component:TestErrors},
  {path: 'internal-error', component:ServerError},
  {path: 'not-found', component:NotFound},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
];
