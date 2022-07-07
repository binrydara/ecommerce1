import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOnPage } from './add-on.page';

const routes: Routes = [
  {
    path: '',
    component: AddOnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddOnPageRoutingModule {}
