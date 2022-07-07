import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/service/api.service';
import { DatapassService } from 'src/service/datapass.service';
import { FileuploadPage } from '../fileupload/fileupload.page';
import { SizeColorPage } from '../size-color/size-color.page';

@Component({
  selector: 'app-add-on',
  templateUrl: './add-on.page.html',
  styleUrls: ['./add-on.page.scss'],
})
export class AddOnPage implements OnInit {

  action: string = 'list';
  id_add: string = '';
  value = [];
  modal_value: string = '';
  @Input() item: any = [];



  @Input() getproimg: any = [];
  aa;

  getImage:(img:string)=>string;
  cancel(){
    this.readyProducts = [];
    this.notuse='n';
    this.datapass.addon={};

    this.modal1.dismiss({
      "dismiss": true,
      "reload": this.readyProducts
    })
  }

  slideOptscategory = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 3,
    pagination:false
  };

  addon: any = {};
  colors = new Array<string>();
  sizes = new Array<string>();
  prod={pd:{},spec:{}}

  notuse:string='n';

  constructor(private modal1: ModalController, private modalCtrl: ModalController, private toast: ToastController,
    private datapass:DatapassService,public apiService:ApiService) {
      this.getImage = this.apiService.getImage.bind(this.apiService);
     }

  ngOnInit() {
      
    console.log(this.getproimg);
    
    if(Object.keys(this.datapass.addon).length != 0 ){
      this.addon=this.datapass.addon;
      this.notuse='y';
    }

    if (!Object.keys(this.addon).length) {
      this.addon['ສີ'] = ['ແດງ', 'ຟ້າ', 'ຂາວ', 'ດຳ', 'ຂຽວ'];
      this.addon['ຂະໜາດ'] = ['S', 'M', 'L', 'XL', 'XXL'];
      // this.addon.colors = ['ແດງ', 'ຟ້າ', 'ຂາວ', 'ດຳ', 'ຂຽວ'];
      // this.addon.sizes = ['S', 'M', 'L', 'XL', 'XXL'];
    }

  }
  // getname(p: string) {
  //   if (p == 'colors') {
  //     return 'ສີ';
  //   } else if (p == 'sizes') {
  //     return 'ຂະໜາດ';
  //   } else {
  //     return p;
  //   }
  // }
  open_addSection(p: string) {
    this.id_add = p;
    this.action = 'add';
    this.modal_value = '';
  }
  addonList() {
    return Object.keys(this.addon).map(v => v);
  }

  addProperty() {
    try {
      const el = document.getElementById('nP') as HTMLIonInputElement;
      const p = el.value;
      if (!p) return;
      if (this.addon[p]) return alert('Property exist ' + p)
      this.addon[p] = [];
      this.action = 'list'

    } catch (error) {
      console.log(error);

    }
    console.log(this.addon);

  }
  removeProperty(p: string) {
    console.log(p);

    if (!confirm('Are you sure')) return;
    delete this.addon[p];
    console.log(this.addon);

  }
  addValue(p: string, t: string) {
    try {
      // const el = document.getElementById(t) as HTMLIonInputElement;
      console.log(p);
      console.log(this.modal_value);

      // if (this.addon[p].includes(el.value)) return alert('Exist');
      // this.addon[p].push(el.value);

      if (this.addon[p].includes(this.modal_value)) return alert('Exist');
      this.addon[p].push(this.modal_value);
      this.modal_value = '';
      this.action = 'list'



    } catch (error) {
      console.log(error);

    }

  }
  removeValue(p: string, i: number) {
    if (this.addon[p].length == 1) {
      if (!confirm('Are you sure?')) return;
    }
    this.addon[p].splice(i, 1)
    if (!this.addon[p].length) delete this.addon[p];
  }

  propertyVal(p: string) {
    return this.addon[p];
  }

  dismiss() {
    this.modal1.dismiss({
      "dismiss": true,
    })
  }

  add: any = '';


  backToList() {
    this.add = '';
    this.action = 'list'
  }

  async presentToast(txt: string) {
    const a = await this.toast.create({
      message: txt,
      duration: 3000,
      position: 'bottom',
      mode: 'ios',
      color: 'dark'
    });
    a.present();
  }
  readyProducts = new Array<IProduct>();
  getTotalAddonLength() {
    return Object.keys(this.addon).length;
  }

  createForm() {
    this.action = 'set'
    if (Object.keys(this.addon).length == 1) {
      console.log('form1');
      this.form1();
    } else if (Object.keys(this.addon).length == 2) {
      this.form2();
    }

  }
  form2() {
    this.readyProducts = []
    console.log('form2');

    const addon = this.addon;
    const arr: Array<any> = Object.values(addon);
    const prop: Array<string> = Object.keys(addon);
    const p = this.createPointer(arr);

    let arx = this.findValues(arr, p);

    const pd = {
      brand: '',
      description: '',
      image:  Array<string>(),
      manufacturer: '',
      name: '',
      moreDetail: '',
      productCode: '',
      productSN: '',
      productTypes: '',
      sku: '',
      storeType: '',
      storeUuid: '',
      tags: [],
      unit: '',
      weight: '',
      mrp: '',
    } as IProduct;
    console.log('arr', arx)
    arx.forEach(v => {
      const prod = JSON.parse(JSON.stringify(pd)) as IProduct;
      // console.log('v',v);

      prod.moreDetail = { prop, data: v, qtty: 0, price: 0 };
      this.readyProducts.push(prod);
     

    })
    console.log(prop, this.readyProducts)
    // submit to the server
    // this.readyProducts= res.data;
    console.log(this.getProductSpecDataList());
    if(this.getproimg.length>0){
        this.addImagesToReadyProducts('','',this.getproimg)
    }
 
  }
  form1() {
    this.readyProducts = []

    const addon = this.addon;
    const arr: Array<any> = Object.values(addon);
    const prop: Array<string> = Object.keys(addon);
    const pd = {
      brand: '',
      description: '',
      image:  Array<string>(),
      manufacturer: '',
      name: 'product1',
      moreDetail: '',
      productCode: '',
      productSN: '',
      productTypes: '',
      sku: '',
      storeType: '',
      storeUuid: '',
      tags: [],
      unit: '',
      weight: '',
      mrp: '',
    } as IProduct;
    arr[0].forEach(v => {
      const prod = JSON.parse(JSON.stringify(pd)) as IProduct;
      console.log('v', v);

      prod.moreDetail = { prop, data: v, qtty: 0, price: 0 };
      this.readyProducts.push(prod);
    
    });
    if(this.getproimg.length>0){
      this.addImagesToReadyProducts('','',this.getproimg)
  }
  }
  getProductSpecDataList1() {
    try {
      // console.log('ZZZZZ',this.readyProducts);
      const z: Array<any> = this.readyProducts.map(v => v.moreDetail.data);
      // console.log('ZZZZZ',z);

      return [... new Set(z)]
    } catch (error) {
      return [];
    }
  }
  getProductSpecDataList() {
    try {
      console.log('ZZZZZ', this.readyProducts);
      const z: Array<any> = this.readyProducts.map(v =>Array.isArray(v.moreDetail.data)?v.moreDetail.data[0]:v.moreDetail.data);
      console.log('ZZZZZ', z);

      return [... new Set(z)]
    } catch (error) {
      return [];
    }
  }
  getProductSpecDataList2(p: string) {
    try {
      const z: Array<any> = this.readyProducts.filter(v => v.moreDetail.data[0] == p).map(v => v.moreDetail.data[1]);
      return [... new Set(z)]
    } catch (error) {
      return [];
    }

  }
  removeImagesFromReadyProducts(p1:string='',p2:string='',imgs:Array<string>=[]){
    const p =new Array<IProduct>();
    if (p1 && p2)  p.push(...this.readyProducts.filter(v => v.moreDetail.data[0] == p1 && v.moreDetail.data[1] == p2));
    else if (p1)  p.push(...this.readyProducts.filter(v => v.moreDetail.data == p1));
    else p.push(...this.readyProducts);
    p.forEach(v=>{
      if(!imgs.length)v.image.length=0;
      else{
        const ind = v.image.findIndex(x => x == imgs[0]);
        if (ind != -1)
           v.image.splice(ind, 1);
      }
      

    })
  }
  addImagesToReadyProducts(p1:string='',p2:string='',imgs:Array<string>=[]){
    const p =new Array<IProduct>();
    if (p1 && p2)  p.push(...this.readyProducts.filter(v => v.moreDetail.data[0] == p1 && v.moreDetail.data[1] == p2));
    else if (p1)  p.push(...this.readyProducts.filter(v => v.moreDetail.data== p1));
    else p.push(...this.readyProducts);
    p.forEach(v=>{
      v.image.push(...imgs)
    })
  }
  getProductDataByparams(p1: string, p2: string = '') {
    try {
      console.log(this.readyProducts);
      
      if (p1 && p2) return this.readyProducts.filter(v => v.moreDetail.data[0] == p1 && v.moreDetail.data[1] == p2);
      else if (p1) return this.readyProducts.filter(v => v.moreDetail.data == p1);
    } catch (error) {
      return [];
    }
  }
  updateReadyProdQtt(ev: any) {
    try {
      const val = ev.target.value;
      const n = ev.target.name;
      const ns = n.split(',');
      // console.log(n,val);
      // console.log(ns);
      if (ns.length > 1)
        this.readyProducts.find(v => v.moreDetail.data[0] == ns[0] && v.moreDetail.data[1] == ns[1]).moreDetail.qtty = val;
      else if (ns.length == 1)
        this.readyProducts.find(v => v.moreDetail.data == ns[0]).moreDetail.qtty = val;
      // console.log(this.readyProducts);
    } catch (error) {
      console.log(error);

    }
  }
  updateReadyProdPrice(ev: any) {
    try {
      const val = ev.target.value;
      const n = ev.target.name;
      const ns = n.split(',');
      // console.log(n,val);
      if (ns.length > 1)
        this.readyProducts.find(v => v.moreDetail.data[0] == ns[0] && v.moreDetail.data[1] == ns[1]).moreDetail.price = val;
      else if (ns.length == 1)
        this.readyProducts.find(v => v.moreDetail.data == ns[0]).moreDetail.price = val;
      // console.log(this.readyProducts);

    } catch (error) {
      console.log(error);

    }
  }

  send() {
    const x = this.readyProducts.filter(v => v.moreDetail.price == 0 || v.moreDetail.qtty == 0)
    // const x=this.readyProducts.filter(v=>isNaN(v.moreDetail.price) || isNaN(v.moreDetail.qtty))

    if (x.length) {
      alert('null');
      return;
    }

    this.datapass.addon=this.addon;

    this.modal1.dismiss({
      "dismiss": true,
      "reload": this.readyProducts
    })
  }



  async getpic() {
    const modal = await this.modalCtrl.create({
      component: FileuploadPage,
      // componentProps: {
      //   'item': this.catName,
      // }
    });

    modal.onDidDismiss().then(res => {
      try {
        if (res.data.tag) {

          // this.catName = res.data.tag[0];
          // this.categoryUuid = res.data.tag[1];
          // console.log("this tag", this.catName + "<=>" + this.categoryUuid);

        }
      } catch (error) {

      }
    })
    return await modal.present();
  }









  createPointer(arr = new Array<any>()) {
    let pointers = new Array<{
      r: number,
      c: number
    }>();
    arr.forEach((v, i) => {
      v.forEach((x: string, ix: number) => {
        pointers.push({ r: i, c: ix })
      })
    })
    return pointers;
  }

  findValues(arr = new Array<any>(), pointers = new Array<{
    r: number,
    c: number
  }>()) {
    let result = new Array<any>();
    let rx = new Array<any>();
    arr.forEach((v, i) => {
      v.forEach((x: any, ix: number) => {
        pointers.filter(v => v.r != i && i == 0).forEach(y => {
          rx = [x].concat(arr[y.r][y.c])
          result.push(rx);
        })
      })

    })
    return result;
  }



}

export interface IProduct {
  productTypes: string;
  productCode: string;
  productSN: string;
  manufacturer: string;
  weight: string;
  name: string;
  image: Array<string>;//path[]
  description: string;
  brand: string;
  unit: string;
  sku: string;
  tags: Array<string>;
  storeType: string;
  storeUuid: string;
  moreDetail: any;
  mrp: string;
}
