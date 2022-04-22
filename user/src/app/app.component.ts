import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

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
      title: 'ທີ່ຢູ່ຮັບສິນຄ້າ',
      url: '/user/update-profile',
      icon: 'location'
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
