import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SizeColorPageRoutingModule } from './size-color-routing.module';

import { SizeColorPage } from './size-color.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SizeColorPageRoutingModule
  ],
  declarations: [SizeColorPage]
})
export class SizeColorPageModule {}
