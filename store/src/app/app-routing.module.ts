import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
//   },
//   {
//     path: 'auth',
//     loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
//   },
//   {
//     path: 'user',
//     loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
//   },
//   {
//     path: 'tabs',
//     loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
//   },
//   {
//     path: 'cart',
//     loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
//   },
//   {
//     path: 'product-detail',
//     loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
//   },
//   {
//     path: 'store-list',
//     loadChildren: () => import('./store-list/store-list.module').then( m => m.StoreListPageModule)
//   },
//   {
//     path: 'tab1',
//     loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
//   },
// ];
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactPageModule)
  },

  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountPageModule)
  },

  {
    path: 'my',
    loadChildren: () => import('./my/my.module').then(m => m.MyPageModule)
  },
  {
    path: 'lang',
    loadChildren: () => import('./lang/lang.module').then(m => m.LangPageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./detail/detail.module').then(m => m.DetailPageModule)
  },
  {
    path: 'dboy/:id',
    loadChildren: () => import('./dboy/dboy.module').then(m => m.DboyPageModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./item/item.module').then(m => m.ItemPageModule)
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then(m => m.EditPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'plan',
    loadChildren: () => import('./plan/plan.module').then(m => m.PlanPageModule)
  },
  {
    path: 'my-product',
    loadChildren: () => import('./my-product/my-product.module').then(m => m.MyProductPageModule)
  },
  {
    path: 'delivery-staff',
    loadChildren: () => import('./delivery-staff/delivery-staff.module').then( m => m.DeliveryStaffPageModule)
  },
  {
    path: 'add-on',
    loadChildren: () => import('./add-on/add-on.module').then( m => m.AddOnPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'confirmcode',
    loadChildren: () => import('./confirmcode/confirmcode.module').then( m => m.ConfirmcodePageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'size-color',
    loadChildren: () => import('./size-color/size-color.module').then( m => m.SizeColorPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./post/post.module').then( m => m.PostPageModule)
  },
  {
    path: 'fileupload',
    loadChildren: () => import('./fileupload/fileupload.module').then( m => m.FileuploadPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
