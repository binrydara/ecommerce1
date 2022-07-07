import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOnPageRoutingModule } from './add-on-routing.module';

import { AddOnPage } from './add-on.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddOnPageRoutingModule
  ],
  declarations: [AddOnPage]
})
export class AddOnPageModule {}
