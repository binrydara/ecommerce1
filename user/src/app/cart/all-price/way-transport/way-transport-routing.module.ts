import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WayTransportPage } from './way-transport.page';

const routes: Routes = [
  {
    path: '',
    component: WayTransportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WayTransportPageRoutingModule {}
