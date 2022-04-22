import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  // { path: '**', redirectTo: '' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  {
    path: 'store-list',
    loadChildren: () => import('./store-list/store-list.module').then( m => m.StoreListPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'mywallet',
    loadChildren: () => import('./mywallet/mywallet.module').then( m => m.MywalletPageModule)
  },
  {
    path: 'orderlist',
    loadChildren: () => import('./orderlist/orderlist.module').then( m => m.OrderlistPageModule)
  },
  {
    path: 'store-detail',
    loadChildren: () => import('./store-detail/store-detail.module').then( m => m.StoreDetailPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./product-list/product-list.module').then( m => m.ProductListPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
