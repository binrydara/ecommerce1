import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  ToastController
} from '@ionic/angular';
import { AllPricePage } from './all-price/all-price.page';
import { browserRefresh } from '../app.component';
import { environment } from 'src/environments/environment';
// import { DetailProductPage } from '../detail-product/detail-product.page';
// import { StoreProductPage } from '../store-product/store-product.page';

declare var window;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  // image="../../assets/icon/favicon.png"
  // constructor() { }

  // public test=[
  //   {name:'ເສື້ອເຊີດຜູ້ຊາຍສີຂາວ',pic:'../../assets/icon/male.jpg',price:'500.000'},
  //   {name:'ເກີບຜ້າສີຂາວລາຍດຳ',pic:'../../assets/icon/shoe.jpg',price:'500.000'}
  // ]
  // ngOnInit() {
  // }



  // =============== from suck ======================

  public products: any;
  public action: number = 1;
  public plas_qty: number = 0;
  qty: number;
  all: number;
  totals: number;
  price: number;
  public arraynew = [];
  cart: any;
  public total_amount: any;
  public information: string;
  browser: boolean;

  public countproduct: any;

  public myTestProductList: any[] = [];
  ax = Array<any>();
  leng = Array<any>();
  countpost: any;
  ux = Array<any>();
  public page: any;
  public seagment_change: string = 'list_product';
  store_in_cart: any = [];

  url = '';
  constructor(
    private rout: Router,
    private aleraction: AlertController,
    private toat: ToastController,
    private modalcontrol: ModalController // private product:ProductService
  ) { }

  getImagePath(im: string) {

    return this.url + im;
  }

  ngOnInit() {

    this.url = environment.fileManger + '/download/';



    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.store_in_cart = JSON.parse(localStorage.getItem('store_in_cart'));
    this.browser = browserRefresh;
    if (this.browser) {
      this.rout.navigateByUrl('home');
    }
    this.check();
    this.storelist();


    this.cart.forEach((v, i) => {
      v['index'] = i;
    });
    this.unCheckedItem.push(...this.cart.filter((v) => v.storeUuid != this.cart[0].storeUuid));

    setTimeout(() => {
      this.uncheckStore();
    }, 1000);

  }

  check() {
    // show when dont have product and store
    if (this.cart == null) {
      this.information = "''ບໍ່ມີລາຍການທີ່ ທ່ານເລືອກໃສ່ກະຕ່າ''";
    }
  }

  close() {
    // window.s.count();
    window.tab.count();
    this.modalcontrol.dismiss();
  }

  //============================== ເພີ່ມຈໍານວນ ເເລະ ລົບ ຕາມ action  ==========================

  getqty(action: number, product_index: number) {
    if (action == 1) {
      // this.cart.find((v, i) => {
      //   if (v.uuid == uuid) {
      //     if (this.cart[i].order_qty >= 100) {
      //       return;
      //     }
      //     this.cart[i].order_qty++;
      //     this.cart[i].total_order_price = this.cart[i].moreDetail.price * this.cart[i].order_qty;
      //   }
      // });
      if (this.cart[product_index].order_qty >= 100) {
        return;
      }
      this.cart[product_index].order_qty++;
      this.cart[product_index].total_order_price = this.cart[product_index].moreDetail.price * this.cart[product_index].order_qty;

      localStorage.setItem('cart', JSON.stringify(this.cart));
    } else {
      // this.cart.find((v, i) => {
      //   if (v.uuid == uuid) {
      //     if (this.cart[i].order_qty <= 1) {
      //       return;
      //     }
      //     this.cart[i].order_qty--;
      //     this.cart[i].total_order_price = this.cart[i].moreDetail.price * this.cart[i].order_qty;
      //   }
      // });

      if (this.cart[product_index].order_qty <= 1) {
        return;
      }
      this.cart[product_index].order_qty--;
      this.cart[product_index].total_order_price = this.cart[product_index].moreDetail.price * this.cart[product_index].order_qty;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }
  getqty_addons(action: number, product_index: number, i: number) {
    if (action == 1) {

      if (this.cart[product_index].addons[i].qty >= 100) {
        return;
      }
      this.cart[product_index].addons[i].qty++;
      this.cart[product_index].addons[i].total_price = this.cart[product_index].addons[i].moreDetail.price * this.cart[product_index].addons[i].qty;

      localStorage.setItem('cart', JSON.stringify(this.cart));
    } else {

      if (this.cart[product_index].addons[i].qty <= 1) {
        return;
      }
      this.cart[product_index].addons[i].qty--;
      this.cart[product_index].addons[i].total_price = this.cart[product_index].addons[i].moreDetail.price * this.cart[product_index].addons[i].qty;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }



  storelist() {
    // ເເຍກ ຮ້ານຊໍ້າກັນມາເປັນຕົວດຽວ
    if (this.cart != null) {
      this.ax = this.cart.map((v) => v.storeUuid);
      this.ax = [...new Set(this.ax)];


      return this.ax;
    }
  }
  getstorename(s: string) {
    return this.store_in_cart.find((v) => v.uuid == s).name;
  }
  findstore() {
    if (this.cart != null) {
      this.ax = this.cart.map((v) => v.storeUuid);
      this.ax = [...new Set(this.ax)];
      return this.ax.length;
    }
  }
  // async payFor(store: string) {
  //   // ສັ່ງຊື້ຕາມເເຕ່ລະຮ້ານ
  //   const order = this.cart.filter((v) => v.store == store);
  //   console.log(order);
  //   localStorage.setItem('order', JSON.stringify(order));
  //   const detailorder = await this.modalcontrol.create({
  //     component: AllPricePage,
  //   });
  //   await detailorder.present();
  // }



  unCheckedItem = [];
  isStoreChecked(storeUuid:string){
    return !this.unCheckedItem.find((v) => v.storeUuid == storeUuid);
  }
  isItemSelect(i: number) {
    // const uuid=this.cart[i].uuid;
    console.log(i,this.unCheckedItem.length);
    
    return !this.unCheckedItem.find((v) => v.index == i);
  }

  // setAllCheck(v: boolean) {
  //   const el = document.getElementById('allstore') as HTMLIonCheckboxElement;
  //   el.checked = v;
  // }
  addUnCheckedStore(ev: any) {
    // check true store auto select item
    const el = ev.target;
    const s = el.id;
    const val = el.checked;
    if (val) {
      //tha pen true
      let x = this.unCheckedItem.filter((v) => v.storeUuid == s);
      console.log(x);
      x.forEach((v) => {
        this.unCheckedItem.splice(this.unCheckedItem.indexOf(v), 1);
      });
      this.cart.filter((v) => v.storeUuid != s).forEach(v=>{
        if(!this.unCheckedItem.find(x=>x.index==v.index)){
          this.unCheckedItem.push(v);
        }
      })
      this.uncheckStore();
    } else {
      // false
      this.cart.filter((v) => v.storeUuid == s).forEach(v=>{
        if(!this.unCheckedItem.find(x=>x.index==v.index)){
          this.unCheckedItem.push(v);
        }
      })
      // this.setAllCheck(false);
    }
  }

  checkAllItemByStore() {
    const s = [...new Set(this.unCheckedItem.map((v) => v.storeUuid))];
    [
      ...new Set(
        this.cart
          .filter((v) => !s.includes(v.storeUuid))
          .map((v) => v.storeUuid)
      ),
    ].forEach((v: string) => {
      (document.getElementById(v) as HTMLInputElement).checked = true;
    });
  }
  checkStoreByItem(v) {

    (document.getElementById(v) as HTMLInputElement).checked = true;

  }
  uncheckStore() {
    [...new Set(this.unCheckedItem.map((v) => v.storeUuid))].forEach((v) => {
      const x = (document.getElementById(v) as HTMLInputElement);
      if (x)
        x.checked = false;
    });
    // this.setAllCheck(false);
  }

  addUnCheckItems(j: any) {
    let x = this.unCheckedItem.findIndex((v) => v.index == j);

    if (x != -1) {
      const y = this.unCheckedItem.splice(x, 1);
      this.cart.filter((v) => v.storeUuid != this.cart.find(v=>v.index==j).storeUuid)
      .forEach(v => {
        if(!this.unCheckedItem.find(x=>x.index==v.index))
        this.unCheckedItem.push(v);
      });
      this.checkStoreByItem(y[0].storeUuid);
      this.uncheckStore();
    } else {
      this.cart.filter((v) => v.index == j).forEach(v => {
        if(!this.unCheckedItem.find(x=>x.index==v.index)){
           this.unCheckedItem.push(v);
        }
      });
     
      this.uncheckStore();
    }
  }

  // checkallstore(ev: any) {
  //   const el = ev.target;
  //   const s = el.uuid;
  //   const val = el.checked;

  //   if (val) {
  //     this.ax.forEach((v) => {
  //       const el = document.getElementById(v) as HTMLIonCheckboxElement;
  //       console.log(el);

  //       el.checked = true;
  //     });
  //     this.unCheckedItem = [];
  //     return;
  //   }

  //   this.ax.forEach((v) => {
  //     const el = document.getElementById(v) as HTMLIonCheckboxElement;
  //     el.checked = false;
  //   });
  //   this.unCheckedItem.push(...this.cart);
  // }

  async submitSelectedAllItems() {
    const items = this.cart.filter(
      (v) => !this.unCheckedItem.find((x) => x.index == v.index)
    );
    if (!items.length) {
      console.log('allitems');
    } else {
      localStorage.setItem('order', JSON.stringify(items));
      this.modalcontrol
        .create({
          component: AllPricePage,
        })
        .then((r) => r.present());
    }
  }

  sumValueSelectedAllItems() {
    if (this.cart != null) {
      const items = this.cart.filter(
        (v) => !this.unCheckedItem.find((x) => x.index == v.index)
      );

      // const getaddons=items.filter(v=>v.addons.length>0);
      // console.log(getaddons);

      // console.log(items.reduce((x, y)=>x+y.addons.reduce((a, b) =>a + b.total_price, 0),0));

      return items.reduce((x, y) => x + y.addons.reduce((a, b) => a + b.total_price, 0), 0) + items.reduce((a, b) => a + b.total_order_price, 0);
    }
  }

  countSelectedAllItems() {
    if (this.cart != null) {
      // return this.cart
      //   .filter((v) => !this.unCheckedItem.find((x) => x.index == v.index))
      //   .reduce((a, b) => a + b.order_qty, 0);
      const items = this.cart.filter(
        (v) => !this.unCheckedItem.find((x) => x.index == v.index)
      );
      return items.reduce((x, y) =>
        x + y.addons.reduce((a, b) =>
          a + b.qty, 0), 0) +
        items.reduce((a, b) =>
          a + b.order_qty, 0);
    }

  }


  async alertwhenitemnull() {
    const alers = await this.toat.create({
      message: 'ກະລຸນາເລືອກລາຍການສິນຄ້າ!!',
      duration: 1000,
      position: 'middle',
      icon: 'information-circle',
    });
    await alers.present();
  }

  async payAll() {
    // ສັ່ງຊື້ໝົດທຸກຮ້ານ
    const items = this.cart.filter(
      (v) => !this.unCheckedItem.find((x) => x.index == v.index)
    );
    if (items.length == 0) {
      this.alertwhenitemnull();
    } else {
      // localStorage.setItem('order', JSON.stringify(items));
      const detailorder = await this.modalcontrol.create({
        component: AllPricePage,
        componentProps: {
          'order': items
        }
      });

      await detailorder.present();
    }
    // const allBills =[]
    // this.ax.forEach(v=>{
    //   const order = this.cart.filter(v=>v.store==v.store);
    //   const bill ={
    //     storeid:v.id,
    //     order
    //   }
    //   allBills.push(bill);
    //   //==>[]
    // })
  }

  //============================== detele only one item in store ==========================
  async Delete(action: string, j: number, k: number) {
    const aler = await this.aleraction.create({
      header: 'ຢືນຢັນ',
      message: 'ຕ້ອງການເອົາອອກກະຕ່າເເທ້ ຫຼື ບໍ!!',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { },
        },
        {
          text: 'Okey',
          handler: () => {
            this.trush(action, j, k);
          },
        },
      ],
    });
    await aler.present();
  }
  public trush(action: string, j: number, k: number) {

    if (action == 'product') {

      this.cart.splice(j, 1);
    } else {

      this.cart[j].addons.splice(k, 1);
    }


    if (this.cart.length == 0) {
      localStorage.removeItem('cart');
      this.cart = null;
      this.check();
      window.tab.count();
    }
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  //============================== end detele only one item in store ==========================
  // async onClick(cart) {
  //   localStorage.setItem('detail', JSON.stringify(cart));
  //   const mo = await this.modalcontrol.create({
  //     component: DetailProductPage,
  //   });
  //   await mo.present();
  // }

  // async gotoprofile(shop) {
  //   localStorage.setItem('profile', JSON.stringify(shop));
  //   const mo = await this.modalcontrol.create({
  //     component: StoreProductPage,
  //   });
  //   await mo.present();
  // }





  //============================== make order ========================================

  addCartProduct(uuid: string, puuid: string) {
    // const pp = this.PostArray.find(v => v.ownerUuid == uuid)

    // this.cart.push({
    //   ownerUuid: pp.ownerUuid,
    //   product: this.productArray.find(v => v.uuid == puuid),
    //   isAddon: false
    // })
  }
  addCartAddon(uuid: string, puuid: string) {
    // const pp = this.PostArray.find(v => v.ownerUuid == uuid)
    // this.cart.push({
    //   ownerUuid: pp.ownerUuid,
    //   product: this.productArray.find(v => v.uuid == puuid),
    //   isAddon: true
    // })
  }
  optimizeCart(ownerUuid: string) {
    // const c = this.cart.filter(v => v.ownerUuid == ownerUuid && v.isAddon == false);

    // const carr = Array<{
    //   productUuid: string,
    //   amount: number,
    //   value: number,
    //   total: number
    // }>();
    // c.find(x => {
    //   if (!carr.length) {
    //     carr.push({
    //       amount: 1,
    //       productUuid: x.product.uuid,
    //       total: 1,
    //       value: 1,
    //     });
    //   } else {
    //     carr.find((v, i) => {
    //       if (x.product.uuid == v.productUuid) {
    //         carr[i].amount++;
    //         carr[i].total = carr[i].amount * carr[i].value;
    //       }
    //     })
    //   }
    // })
    // return carr;
  }

  optimizeCartAddon(ownerUuid: string) {
    // const c = this.cart.filter(v => v.ownerUuid == ownerUuid && v.isAddon == true);

    // const carr = Array<{
    //   productUuid: string,
    //   amount: number,
    //   value: number,
    //   total: number
    // }>();
    // c.find(x => {
    //   if (!carr.length) {
    //     carr.push({
    //       amount: 1,
    //       productUuid: x.product.uuid,
    //       total: 1,
    //       value: 1,
    //     });
    //   } else {
    //     carr.find((v, i) => {
    //       if (x.product.uuid == v.productUuid) {
    //         carr[i].amount++;
    //         carr[i].total = carr[i].amount * carr[i].value;
    //       }
    //     })
    //   }
    // })
    // return carr;
  }

}
