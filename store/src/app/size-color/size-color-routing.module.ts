import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SizeColorPage } from './size-color.page';

const routes: Routes = [
  {
    path: '',
    component: SizeColorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SizeColorPageRoutingModule {}
