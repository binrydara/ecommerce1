import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AddressService } from 'src/service/address.service';


import { Subscription } from 'rxjs';

export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  public userData:any;
  public appPages:any;
  public selectedIndex = 0;

  subscription: Subscription;

  constructor(public rout:Router,public addressService:AddressService) {
    this.subscription = rout.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !rout.navigated;
      }
  });
  }

  ngOnInit(): void {

    if(localStorage.getItem('user_3apps') && localStorage.getItem('user_3apps') != undefined && localStorage.getItem('user_3apps') != 'null')
    {
      this.userData = JSON.parse(localStorage.getItem('user_3apps'));
    }
    this.appPages = [
      {
        title: 'ໜ້າຫຼັກ',
        url: '/home',
        icon: 'home'
      },
     
      {
        title: 'ບັນຊີຂອງຂ້ອຍ',
        url: '/account',
        icon: 'person-circle'
      },
  
      {
        title: 'ສິດຂອງຂ້ອຍ (Subscription)',
        url: '/plan',
        icon: 'card'
      },
      {
        title: 'ຂໍ້ມູນສິນຄ້າ',
        url: '/item',
        icon: 'grid'
      },
      {
        title: 'ລົງຂາຍສິນຄ້າ',
        url: '/post',
        icon: 'open'
      },
  
      {
        title: 'ລາຍການສັ່ງຊື້ຈາກລູກຄ້າ',
        url: '/my',
        icon: 'cart'
      },
  
      {
        title: 'ພະນັກງານສົ່ງສິນຄ້າ',
        url: '/delivery-staff',
        icon: 'person'
      },
      {
        title: 'ປ່ຽນພາສາ',
        url: '/lang',
        icon: 'flag'
      },
  
      {
        title: 'ຕິດຕໍ່ສູນບໍລິການ',
        url: '/contact',
        icon: 'mail'
      },
  
      
    ];

    this.addressService.initAddresses();
  }

  logout()
  {
    // localStorage.setItem('user_id',null);

    // localStorage.setItem('token','');

    localStorage.removeItem('item_3product');
    
    this.rout.navigateByUrl('/welcome');
  }

  // public appPages = [
  //   {
  //     title: 'ໜ້າຫຼັກ',
  //     url: '/tabs/home',
  //     icon: 'home'
  //   },
  //   {
  //     title: 'ປະເພດສິນຄ້າ',
  //     url: '/category',
  //     icon: 'list'
  //   },
  //   {
  //     title: 'ຮ້ານຄ້າ',
  //     url: '/store-list',
  //     icon: 'storefront'
  //   },
  //   {
  //     title: 'ກະຕ່າຂອງຂ້ອຍ',
  //     url: '/tabs/cart',
  //     icon: 'cart'
  //   },
  //   {
  //     title: 'ສິນຄ້າທີ່ຖືກໃຈ',
  //     url: '/tab2',
  //     icon: 'heart'
  //   },
  //   {
  //     title: 'ກະເປົາເງິນ',
  //     url: '/mywallet',
  //     icon: 'card'
  //   },
  //   {
  //     title: 'ຂໍ້ມູນສ່ວນຕົວ',
  //     url: '/user/profile',
  //     icon: 'person'
  //   },
  //   {
  //     title: 'ທີ່ຢູ່ຮັບສິນຄ້າ',
  //     url: '/user/update-profile',
  //     icon: 'location'
  //   },
  //   {
  //     title: 'ລາຍການຊື້ຂອງຂ້ອຍ',
  //     url: '/orderlist',
  //     icon: 'receipt'
  //   },
  //   {
  //     title: 'ກ່ຽວກັບເຮົາ',
  //     url: '/about',
  //     icon: 'information-circle'
  //   },
  //   {
  //     title: 'ຕິດຕໍ່ເຮົາ',
  //     url: '/contactus',
  //     icon: 'mail'
  //   }
    
  // ];


  
}
