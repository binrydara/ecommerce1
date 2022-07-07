import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMethodPage } from './add-method.page';

const routes: Routes = [
  {
    path: '',
    component: AddMethodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMethodPageRoutingModule {}
