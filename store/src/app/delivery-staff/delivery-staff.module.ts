import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeliveryStaffPageRoutingModule } from './delivery-staff-routing.module';

import { DeliveryStaffPage } from './delivery-staff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeliveryStaffPageRoutingModule
  ],
  declarations: [DeliveryStaffPage]
})
export class DeliveryStaffPageModule {}
