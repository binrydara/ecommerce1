import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WayTransportPageRoutingModule } from './way-transport-routing.module';

import { WayTransportPage } from './way-transport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WayTransportPageRoutingModule
  ],
  declarations: [WayTransportPage]
})
export class WayTransportPageModule {}
