import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WayPaymoneyPageRoutingModule } from './way-paymoney-routing.module';

import { WayPaymoneyPage } from './way-paymoney.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WayPaymoneyPageRoutingModule
  ],
  declarations: [WayPaymoneyPage]
})
export class WayPaymoneyPageModule {}
