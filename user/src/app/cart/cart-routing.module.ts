import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartPage } from './cart.page';

const routes: Routes = [
  {
    path: '',
    component: CartPage
  },
  {
    path: 'all-price',
    loadChildren: () => import('./all-price/all-price.module').then( m => m.AllPricePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartPageRoutingModule {}
