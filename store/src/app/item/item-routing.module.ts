import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemPage } from './item.page';

const routes: Routes = [
  {
    path: '',
    component: ItemPage
  },
  {
    path: 'add-edit',
    loadChildren: () => import('./add-edit/add-edit.module').then( m => m.AddEditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemPageRoutingModule {}
