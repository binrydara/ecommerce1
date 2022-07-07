import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostPage } from './post.page';

const routes: Routes = [
  {
    path: '',
    component: PostPage
  },
  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'post-detail',
    loadChildren: () => import('./post-detail/post-detail.module').then( m => m.PostDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostPageRoutingModule {}
