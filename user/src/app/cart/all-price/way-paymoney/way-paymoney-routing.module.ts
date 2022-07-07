import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WayPaymoneyPage } from './way-paymoney.page';

const routes: Routes = [
  {
    path: '',
    component: WayPaymoneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WayPaymoneyPageRoutingModule {}
