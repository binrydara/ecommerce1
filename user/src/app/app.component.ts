import { Component } from '@angular/core';
import { AddressService } from 'src/service/address.service';


import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  subscription: Subscription;

  constructor(private addressService:AddressService,public rout:Router) {

    this.subscription = rout.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !rout.navigated;
      }
    });
    this.addressService.initAddresses();
  }

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'ໜ້າຫຼັກ',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'ປະເພດສິນຄ້າ',
      url: '/category',
      icon: 'list'
    },
    {
      title: 'ຮ້ານຄ້າ',
      url: '/store-list',
      icon: 'storefront'
    },
    {
      title: 'ກະຕ່າຂອງຂ້ອຍ',
      url: '/cart',
      icon: 'cart'
    },
    {
      title: 'ສິນຄ້າທີ່ຖືກໃຈ',
      url: '/tab2',
      icon: 'heart'
    },
    {
      title: 'ກະເປົາເງິນ',
      url: '/mywallet',
      icon: 'card'
    },
    {
      title: 'ຂໍ້ມູນສ່ວນຕົວ',
      url: '/user/profile',
      icon: 'person'
    },
    {
      title: 'ລາຍການຊື້ຂອງຂ້ອຍ',
      url: '/orderlist',
      icon: 'receipt'
    },
    {
      title: 'ກ່ຽວກັບເຮົາ',
      url: '/about',
      icon: 'information-circle'
    },
    {
      title: 'ຕິດຕໍ່ເຮົາ',
      url: '/contactus',
      icon: 'mail'
    }
    
  ];
}
