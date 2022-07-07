import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllPricePageRoutingModule } from './all-price-routing.module';

import { AllPricePage } from './all-price.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllPricePageRoutingModule
  ],
  declarations: [AllPricePage]
})
export class AllPricePageModule {}
