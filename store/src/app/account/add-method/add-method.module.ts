import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMethodPageRoutingModule } from './add-method-routing.module';

import { AddMethodPage } from './add-method.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMethodPageRoutingModule
  ],
  declarations: [AddMethodPage]
})
export class AddMethodPageModule {}
