import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllPricePage } from './all-price.page';

const routes: Routes = [
  {
    path: '',
    component: AllPricePage
  },
  {
    path: 'way-paymoney',
    loadChildren: () => import('./way-paymoney/way-paymoney.module').then( m => m.WayPaymoneyPageModule)
  },
  {
    path: 'way-transport',
    loadChildren: () => import('./way-transport/way-transport.module').then( m => m.WayTransportPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllPricePageRoutingModule {}
