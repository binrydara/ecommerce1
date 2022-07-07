import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeliveryStaffPage } from './delivery-staff.page';

const routes: Routes = [
  {
    path: '',
    component: DeliveryStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryStaffPageRoutingModule {}
