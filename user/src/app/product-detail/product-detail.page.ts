import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';
import { ProfileService } from 'src/service/profile.service';
import { ICart, IProduct, IProductDetails, IProductStocks, IProductPost, IStock, ModelService } from '../model.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  getImage: (img: string) => string;

  public url = '';
  public pic: string = "";
  public name: string = "";
  public qty: number = 1;
  public AddonQTY: number = 0;
  public store_detail: any = [];
  public action = '1';
  public firSel: string = '';
  public secSel: string = '';
  public isProductSelected = true;
  public minSel: string = '';
  public minPhoto: string = '';
  public PostP: IProductPost;
  public productStocks: IProductStocks;
  // public selectedProduct: IProduct;
  public selectedProduct: any;
  public specProperty = new Array<string>();
  public cart = new Array<ICart>();
  public ownerUuid = ''
  public minMax = '';
  public propData0 = new Array<string>();
  public propData1 = new Array<string>();
  public addon_list: any = [];
  public all_addons = [];
  public addons_post = [];
  public show_addons = [];

  constructor(private activeRoute: ActivatedRoute, private load: LoadingController, public alt: AlertController,
    public modelService: ModelService, private profile: ProfileService, public apiService: ApiService) {
    this.getImage = this.apiService.getImage.bind(this.apiService);

  }

  ngOnInit() {

    this.url = environment.fileManger + '/download/';


    this.activeRoute.queryParams.subscribe(r => {

      this.PostP = JSON.parse(r.data);

      console.log(this.PostP);

      this.loadProductPosts();
      this.loadStore();

    })
  }

  // ========== load store information by post =========

  loadStore() {

    if (this.PostP?.ownerUuid) {

      this.profile.loadstore(this.PostP.ownerUuid).subscribe(res => {

        console.log(res);

        if (res.status == 1) {

          this.store_detail = res.data;
        }


      }, error => {
        console.log(error);

      })
    }
  }


  //============================== Post Detail ========================================

  loadaddon_detail(pArray: Array<string>) {

    let data = {
      puuid: pArray,
      owneruuid: this.PostP.ownerUuid
    }

    this.profile.loadseconproduct(data).subscribe(res => {

      console.log("load addon", res);


      // this.getaddon_for_loop(res.data.product);

      this.addon_list = res.data.product;

      this.addon_list.forEach(v => {
        v['qty'] = 0;
        v['total_price'] = 0;
      });

    }, error => {
      console.log(error);
    })
  }

  loadProductStocks(pArray: Array<string>) {

    let data = {
      puuid: pArray,
      owneruuid: this.PostP.ownerUuid
    }

    this.profile.loadseconproduct(data).subscribe(res => {

      console.log("load seconProduct", res);

      this.productStocks = res.data
      this.productStocks.product.push(this.PostP.primaryProduct.product);
      this.productStocks.stock.push(this.PostP.primaryProduct.inventory);
      this.productStocks.product.forEach(v => {
        if (v.moreDetail.prop)
          this.specProperty.push(...v.moreDetail.prop);
      })
      if (this.specProperty.length)
        this.specProperty = [...new Set(this.specProperty)];


      this.productStocks.product.forEach(v => {
        if (Array.isArray(v.moreDetail.data))
          this.propData0.push(v.moreDetail.data[0])
        else
          this.propData0.push(v.moreDetail.data)
      })
      this.propData0 = [...new Set(this.propData0)];

      if (this.specProperty.length > 1) {
        this.productStocks.product.forEach(v => {
          if (Array.isArray(v.moreDetail.data))
            this.propData1.push(v.moreDetail.data[1])
          else
            this.propData1.push(v.moreDetail.data)
        })
        this.propData1 = [...new Set(this.propData1)];
      }
      this.setDefaultProductSelection();
      console.log(this.productStocks.product);


    }, error => {
      console.log(error);
    })
  }
  isAvailablePropData1(p: string) {
    if (this.specProperty.length == 2) {
      if (!this.firSel) return true;
      return this.productStocks.product.find(v => v.moreDetail.data[1] == p && v.moreDetail.data[0] == this.firSel || v.moreDetail.data[0] == p && v.moreDetail.data[1] == this.firSel)
    }
    return true;

  }
  isAvailablePropData0(p: string) {

    if (this.specProperty.length == 2) {
      if (!this.secSel) return true;
      return this.productStocks.product.find(v => v.moreDetail.data[1] == p && v.moreDetail.data[0] == this.secSel || v.moreDetail.data[0] == p && v.moreDetail.data[1] == this.secSel)
    }
    return true;

  }
  getImagePathByPropData0(x: string) {


    this.getImagePath(this.productStocks?.product?.find(v => v.moreDetail.data[0] == x || v.moreDetail.data[1] == x).image);
  }
  showImageByPropData0(v: string) {
    if (!this.firSel || this.firSel != v) {
      this.firSel = v;
    } else this.firSel = '';
    this.setProductSelection();
  }
  showImageByPropData1(v: string) {
    if (!this.secSel || this.secSel != v) {
      this.secSel = v;
    } else this.secSel = '';
    this.setProductSelection();

  }
  setProductSelection() {
    if (this.specProperty.length == 2) {
      if (this.secSel && this.firSel) {
        this.selectedProduct = this.productStocks?.product?.find(v => {
          return (v.moreDetail.data[0] == this.firSel && v.moreDetail.data[1] == this.secSel) || (v.moreDetail.data[1] == this.firSel && v.moreDetail.data[0] == this.secSel)
        });
      }
      else {
        this.selectedProduct = {} as IProduct;
      }
    } else if (this.specProperty.length == 1) {
      if (this.firSel) {
        this.selectedProduct = this.productStocks?.product?.find(v => {
          return (v.moreDetail.data == this.firSel)
        });
      } else {
        this.selectedProduct = {} as IProduct;
      }
    } else {
      this.productStocks = {
        product: [this.PostP.primaryProduct.product],
        stock: [this.PostP.primaryProduct.inventory]
      } as IProductStocks;

      this.selectedProduct = this.PostP.primaryProduct.product;
    }

    this.isProductSelected = true;
  }
  getStockByProductUuid(puuid: string) {
    if ((this.secSel && this.firSel && this.specProperty.length == 2) || (this.firSel && this.specProperty.length == 1)) {
      return this.productStocks?.stock?.find(v => v.productUuid == puuid)
    }

    this.productStocks?.stock.sort((a, b) => a.value - b.value);
    return {
      min: this.productStocks?.stock[0]?.value,
      max: this.productStocks?.stock[this.productStocks.stock.length - 1]?.value,
      qtt: this.productStocks?.stock?.reduce((a, b) => a + b.qtt, 0),
      value: -1
    }

  }
  getFirstProp() {

    try {
      return this.selectedProduct?.moreDetail?.prop[0]
    } catch (error) {
      return '';
    }
  }
  getSecondProp() {
    try {
      return this.selectedProduct?.moreDetail?.prop[1]
    } catch (error) {
      return '';
    }
  }
  getFirstPropData() {

    try {
      return Array.isArray(this.selectedProduct?.moreDetail?.data) ? this.selectedProduct?.moreDetail?.data[0] : this.selectedProduct?.moreDetail?.data;
    } catch (error) {
      return '';
    }
  }
  getSecondPropData() {
    try {
      return Array.isArray(this.selectedProduct?.moreDetail?.data) ? this.selectedProduct?.moreDetail?.data[1] : this.selectedProduct?.moreDetail?.data;
    } catch (error) {
      return '';
    }
  }
  getSelected0(v: string) {
    return v == this.firSel ? 'primary' : ''
  }
  getSelected1(v: string) {
    return v == this.secSel ? 'primary' : ''
  }
  getSelectedMini(uuid: string) {
    return uuid == this.minSel ? 'primary' : '';
  }
  selectMiniPhoto(uuid: string) {
    this.minSel = uuid;
    this.isProductSelected = false;
    this.minPhoto = this.productStocks.product.find(v => v.uuid == uuid).image;
  }
  setDefaultProductSelection() {
    const p = this.productStocks.product[this.productStocks.product.length - 1];

    if (this.specProperty.length == 2) {
      this.firSel = p.moreDetail.data[0];
      this.secSel = p.moreDetail.data[1];
    } else if (this.specProperty.length == 1) {

      this.firSel = p.moreDetail.data;
    }



    this.isProductSelected = true;
    this.selectedProduct = p;
  }
  loadProductPosts() {

    this.ownerUuid = this.PostP.ownerUuid;

    console.log(this.ownerUuid);

    if (this.PostP.addons.length > 0) {

      const puuid = [];
      puuid.push(... this.PostP.addons.map(x => {
        return x.productUuid
      }))

      this.loadaddon_detail(puuid);
    }

    if (this.PostP.secondaryProducts.length > 0) {

      const puuid = [];
      puuid.push(... this.PostP.secondaryProducts.map(x => {
        return x.productUuid
      }))

      this.loadProductStocks(puuid);
    } else {
      this.setProductSelection()
    }
  }
  getPrice(puuid: string) {
    // this.inventory.find(v => v.productUuid == puuid)?.price;
  }
  getQtty(puuid: string) {
    // this.inventory.find(v => v.productUuid == puuid)?.amount;
  }
  getImagePath(im: string) {

    if (im) {
      return this.url + im;
    }

    return this.url + this.PostP?.primaryProduct?.product?.image[0];

  }
  showBigPhoto(ev: any) {
    const puuid = ev.target.id;
    console.log(puuid);

    this.selectedProduct = this.productStocks?.product?.find(v => v.uuid == puuid);
  }
  showBigPhoto2(ev: any) {
    const ps = ev.target.id + '';
    const puuid = ps.split('_')[1];
    console.log(puuid);

    // this.selectedProduct = this.productStocks?.product?.find(v => v.uuid == puuid);
  }
  findProductDetails(uuid: string) {
    return this.productStocks?.product?.find(v => v.uuid === uuid);
  }
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
    const c = this.cart.filter(v => v.storeUuid == ownerUuid && v.isAddon == false);

    const carr = Array<{
      productUuid: string,
      amount: number,
      value: number,
      total: number
    }>();
    c.find(x => {
      if (!carr.length) {
        carr.push({
          amount: 1,
          productUuid: x.product.uuid,
          total: 1,
          value: 1,
        });
      } else {
        carr.find((v, i) => {
          if (x.product.uuid == v.productUuid) {
            carr[i].amount++;
            carr[i].total = carr[i].amount * carr[i].value;
          }
        })
      }
    })
    return carr;
  }
  optimizeCartAddon(ownerUuid: string) {
    const c = this.cart.filter(v => v.storeUuid == ownerUuid && v.isAddon == true);

    const carr = Array<{
      productUuid: string,
      amount: number,
      value: number,
      total: number
    }>();
    c.find(x => {
      if (!carr.length) {
        carr.push({
          amount: 1,
          productUuid: x.product.uuid,
          total: 1,
          value: 1,
        });
      } else {
        carr.find((v, i) => {
          if (x.product.uuid == v.productUuid) {
            carr[i].amount++;
            carr[i].total = carr[i].amount * carr[i].value;
          }
        })
      }
    })
    return carr;
  }
  getTotalProductQtty() {
    // return this.inventory.reduce((v, x) => v + x.amount, 0)
  }

  //============= Get Qty ==================

  showgetQty() {

    if (this.selectedProduct) {
      if (Object.keys(this.selectedProduct).length == 0) {
        return true;
      }
    }


    return false;
  }
  getQty(action: string) {

    if (action == '+') {

      this.qty += 1;

    } else if (action == '-') {

      if (this.qty > 1) {
        this.qty -= 1;
      }

    }

  }
  getAddonQTY(action: string, uuid: string) {

    // const a = this.show_addons.find(v => v.uuid == uuid);
    const a = this.addon_list.find(v => v.uuid == uuid);


    if (action == '+') {

      a.qty += 1;
      a.total_price=a.qty*a.moreDetail.price;

    } else if (action == '-') {

      if (a?.qty > 0) {

        a.qty -= 1;
        a.total_price=a.qty*a.moreDetail.price;

      }

    }

  }

  checknullqty() {
    const a = this.addon_list.find(v => v?.qty > 0);
    if (a) {
      return false;
    }
    return true;
  }

  // getaddon_for_loop(data:any){
  //   console.log("dd",data);


  //   if (localStorage.getItem('cart') == null) {

  //     this.addons_post = data;
  //     this.all_addons = data;
  //     this.all_addons.forEach(v => {

  //       v['qty'] = 0;
  //     });

  //     this.show_addons = JSON.parse(JSON.stringify(this.all_addons));
  //   } else {

  //     this.all_addons = JSON.parse(localStorage.getItem('addon_in_cart'));
  //     this.addons_post = data;

  //     console.log(this.addons_post);

  //     this.addons_post.forEach(v => {
  //       const y = this.all_addons.find(x => x.uuid == v.uuid && x.storeUuid == v.storeUuid)
  //       v['qty'] = 0;
  //       if (!y) this.all_addons.push(v)
  //     });

  //     this.show_addons = JSON.parse(JSON.stringify((this.all_addons.filter(v => this.addons_post.find(x => x.uuid == v.uuid && x.storeUuid == v.storeUuid)))));
  //   }
  // }


  // =============== add Cart ===============

  add_addon() {

    if (this.PostP.addons.length > 0) {

      this.action = '2';
    } else {
      this.addCart('1');
    }
  }

  addCart(action: string) {

    // console.log(this.addons_post);

    // if (action == '2') {



    // this.show_addons.forEach(v => {

    //   v['primaryUuid'] = this.selectedProduct.uuid
    // });

    // console.log(this.show_addons);
    // console.log(this.addons_post);

    // this.all_addons.forEach(v=>{
    //   this.show_addons.find(x=>{
    //     if(x.uuid==v.uuid && x.storeUuid==v.storeUuid){
    //       v.qty=x.qty
    //       v['primaryUuid'] =x['primaryUuid'] 
    //       return true;
    //     }
    //   })
    // })

    // localStorage.setItem('addon_in_cart',JSON.stringify(this.all_addons));

    // this.getaddon_for_loop(this.addons_post);

    // }


    let a = [];
    let store = [];

    let total_order_price = parseInt(this.selectedProduct.moreDetail.price) * this.qty;


    this.selectedProduct['order_qty'] = this.qty;
    this.selectedProduct['total_order_price'] = total_order_price;


    if (!JSON.parse(localStorage.getItem('cart')) || JSON.parse(localStorage.getItem('cart')) == 'undefined' || localStorage.getItem('cart') == null
      || localStorage.getItem('store_in_cart') == null) {



      if (action == '2') {

        const addon = this.addon_list.filter(v => v.qty > 0);

        this.selectedProduct['addons'] = addon;


        a.push(this.selectedProduct);
        localStorage.setItem('cart', JSON.stringify(a));


        store.push(this.store_detail);
        localStorage.setItem('store_in_cart', JSON.stringify(store));

        this.action = '1';

      } else {

        this.selectedProduct['addons'] = [];
        a.push(this.selectedProduct);
        localStorage.setItem('cart', JSON.stringify(a));


        store.push(this.store_detail);
        localStorage.setItem('store_in_cart', JSON.stringify(store));

        this.action = '1';

      }



    } else {

      const b = JSON.parse(localStorage.getItem('cart'));

      const current_addons = this.addon_list.filter(v => v.qty > 0);

      if (current_addons.length) {

        this.selectedProduct['addons'] = current_addons;
        b.push(this.selectedProduct);
        localStorage.setItem('cart', JSON.stringify(b));

      } else {
        const z1 = b.filter(v => v.uuid == this.selectedProduct.uuid && v.storeUuid == this.selectedProduct.storeUuid)

        if (z1.length) {

          const z2 = z1.find(v => !v.addons.length);

          if (z2) {
            z2.order_qty += this.qty;
            z2.total_order_price += total_order_price;
            localStorage.setItem('cart', JSON.stringify(b));
          }
          else {

            this.selectedProduct['addons'] = [];
            b.push(this.selectedProduct);
            localStorage.setItem('cart', JSON.stringify(b));

          }
        } else {

          this.selectedProduct['addons'] = [];
          b.push(this.selectedProduct);
          localStorage.setItem('cart', JSON.stringify(b));

        }
      }

        let r = JSON.parse(localStorage.getItem('store_in_cart'));

        const check_store = r.find(v => v.uuid == this.store_detail.uuid);

        if (!check_store) {

          r.push(this.store_detail);
          localStorage.setItem('store_in_cart', JSON.stringify(r));
        }

        this.action = '1'
    }
  }

}