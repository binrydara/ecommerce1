import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/service/api.service';
import { ProfileService } from 'src/service/profile.service';
import { ICart, IProduct, IProductDetails, IProductStocks, IProductPost, IStock, ModelService } from '../../model.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {

  getImage: (img: string) => string;

  public url = '';

  public pic: string = "";
  public name: string = "";

  public store_detail: any = [];

  constructor(private activeRoute: ActivatedRoute, private load: LoadingController,
    public modelService: ModelService, private profile: ProfileService, public apiService: ApiService
    ,private rout:Router) {
    this.getImage = this.apiService.getImage.bind(this.apiService);

  }

  ionViewWillEnter() {
    this.url = environment.serverFile + 'file/download/';
    let local = JSON.parse(localStorage.getItem('post_detail'));

    if (Object.keys(local).length > 0) {

      this.PostP = local;

      console.log(this.PostP);

      this.loadProductPosts();
      this.loadStore();
    } else {
      this.rout.navigateByUrl('/post');
      console.log("no post data");
    }
  }
  ngOnInit() {

    // this.activeRoute.queryParams.subscribe(r => {

    //   this.PostP = JSON.parse(r.data);

    //   console.log(this.PostP);

    //   this.loadProductPosts();
    //   this.loadStore();

    // })

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



  PostP: IProductPost;


  productStocks: IProductStocks;
  selectedProduct: IProduct;

  specProperty = new Array<string>();

  cart = new Array<ICart>();
  ownerUuid = ''
  minMax = '';
  propData0 = new Array<string>();
  propData1 = new Array<string>();

  //============================== Post Detail ========================================

  loadProductStocks(pArray: Array<string>) {

    let data = {
      puuid: pArray,
      owneruuid: this.PostP.ownerUuid
    }

    this.profile.loadseconproduct(data).subscribe(res => {

      console.log("load seconProduct", res);

      this.productStocks = res.data
      this.productStocks.product.push(this.PostP.primaryProduct.product);
      /// DEMO
      //   this.productStocks.product.unshift({
      //     "id": 30,
      //     "uuid": "edfded3c-1dd7-4755-924f-7dd062bd8ffc",
      //     "isActive": true,
      //     "createdAt": "2022-06-09T08:15:43.179Z",
      //     "updatedAt": "2022-06-09T08:15:43.179Z",
      //     "name": "ເກີບເກີບ",
      //     "image": "",
      //     "description": "",
      //     "productTypes": "ເກີບ",
      //     "brand": "",
      //     "unit": "",
      //     "productCode": "",
      //     "productSN": "",
      //     "manufacturer": "",
      //     spec: null,
      //     "sku": "",
      //     "tags": [],
      //     "storeType": "ຂາຍເຄື່ອງໃຊ້ທົ່ວໄປ",
      //     "storeUuid": "f81aa204-94e9-4cc2-b20d-eb9ce7f12ffd",
      //     "moreDetail": {
      //         "data": [
      //             "ຂາວ",
      //             "L"
      //         ],
      //         "prop": [
      //             "colors",
      //             "sizes"
      //         ],
      //         "qtty": "200",
      //         "price": "70000"
      //     },
      //     "mrp": null
      // } as unknown as IProduct)

      //DEMO
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
  firSel: string = '';
  secSel: string = '';
  isProductSelected = true;
  minSel: string = '';
  minPhoto: string = '';
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

    if (this.PostP.secondaryProducts.length > 0) {

      const puuid = [];
      puuid.push(... this.PostP.secondaryProducts.map(x => {
        return x.productUuid
      }))

      // puuid.push(... this.PostArray.addons.map(x => {
      //   return x.productUuid
      // }))

      this.loadProductStocks(puuid);
    } else {
      this.setProductSelection()
    }
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
}
