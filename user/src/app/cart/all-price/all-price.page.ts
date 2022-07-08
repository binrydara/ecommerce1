import { Component, Input, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ProfilePage } from 'src/app/user/profile/profile.page';
import { DatapassService, IDistrict, IProvince, IVillage } from 'src/service/datapass.service';
// import { ProductService } from 'src/app/services/product.service';
import { WayPaymoneyPageModule } from './way-paymoney/way-paymoney.module';
import { WayPaymoneyPage } from './way-paymoney/way-paymoney.page';
import { WayTransportPageModule } from './way-transport/way-transport.module';
import { WayTransportPage } from './way-transport/way-transport.page';

@Component({
  selector: 'app-all-price',
  templateUrl: './all-price.page.html',
  styleUrls: ['./all-price.page.scss'],
})
export class AllPricePage implements OnInit {

  public list: any = [
    {
      n: 'ຮ້ານຈັດການຂົນສົ່ງ',
      t: '../../../../assets/icon/delivery_40px.png',
      d: 'ຈ່າຍເມື່ອໄດ້ຮັບສິນຄ້າ',
    },
    {
      n: 'ຂົນສົ່ງທາງສະຖານີ',
      t: '../../../../assets/icon/cargo_transportation_64px.png',
      d: 'ຈ່າຍເມື່ອໄດ້ຮັບສິນຄ້າ',
    },
    {
      n: 'ລູກຄ້າເລືອກຂົນສົ່ງເອງ',
      t: '../../../../assets/icon/scooter_40px.png',
      d: 'ຮັບສິນຄ້າເອງ',
    },
  ];
  public pays: any = [
    { n: 'ຈ່າຍປາຍທາງ', p: '../../../../../assets/icon/money_30px.png' },
    { n: 'ຈ່າຍຜ່ານທາງ BCEL one', p: '../../../../assets/icon/bcl.png' },
    { n: 'ຈ່າຍຜ່ານທາງ M-money', p: '../../../../assets/icon/mmoney.png' },
    { n: 'ຈ່າຍຜ່ານທາງ U-money', p: '../../../../assets/icon/umoney.png' },
  ];
  public location: any;
  ax = Array<any>();
  public detail_person: any;

  constructor(
    private madal: ModalController,
    private modal: ModalController
  ) {}
  public action: number = 1;
  @Input() order: any=[];
  public store_in_cart:any=[];

  storeConfigs = new Array<IStoreConfig>();
  paymentMethod= new  Array<IPaymentMethod>();
  shipmentMethod=Array<IShipmentMethod>();

  public name: string = "";
  public description: string = "";
  public phone: string = "";
  public email: string = "";

  public address_list: any = [];

  ionViewWillEnter(){
    console.log(this.order);
    
    this.store_in_cart=JSON.parse(localStorage.getItem('store_in_cart')).filter(v=>this.order.find(x=>x.storeUuid==v.uuid));
    console.log(this.store_in_cart);
    
  }
  ngOnInit() {
    
  }
  async goto_profile(){

    const mn = await this.madal.create({
      component: ProfilePage,
      componentProps: {
        action_modal: 'modal'
      }
    });
    await mn.present();
  }
  addressname(){
    let a=JSON.parse(localStorage.getItem('profile'));

    if(a){
      let b=a.filter(v=>v.isActive==true);
      // console.log(b);
      
      if(b){
      
        return b[0].location.addressname;
      }
      return "0";
    }

    return "0";
  }

  loadPaymentMethod(){
    this.paymentMethod.push({
      feerange:[{max:10000000,fee:1000},{max:10000000,fee:2000}],
      description:'',
      logo:'',
      uuid:'1',
      name:'cash',
      createdAt:'',
      updatedAt:'',
      id:0
    })
    this.paymentMethod.push({
      feerange:[{max:10000000,fee:1000},{max:10000000,fee:2000}],
      description:'',
      logo:'',
      uuid:'2',
      name:'pay later',
      createdAt:'',
      updatedAt:'',
      id:0
    })
    this.paymentMethod.push({
      feerange:[{max:10000000,fee:1000},{max:10000000,fee:2000}],
      description:'',
      logo:'',
      uuid:'3',
      name:'laab',
      createdAt:'',
      updatedAt:'',
      id:0
    })
    this.paymentMethod.push({
      feerange:[{max:10000000,fee:1000},{max:10000000,fee:2000}],
      description:'',
      logo:'',
      uuid:'4',
      name:'m-money',
      createdAt:'',
      updatedAt:'',
      id:0
    })
  }
  loadShipmentMethod(){
    this.shipmentMethod.push({
      feerange:[{length:10,width:20,height:30,volume:0.06,weight:1000,fee:10000},
        {length:20,width:40,height:60,volume:0.06,weight:2000,fee:20000}],
      description:'',
      logo:'',
      uuid:'1',
      name:'By Seller',
      createdAt:'',
      updatedAt:'',
      id:0
    })
    this.shipmentMethod.push({
      feerange:[{length:10,width:20,height:30,volume:0.06,weight:1000,fee:10000},
        {length:20,width:40,height:60,volume:0.06,weight:2000,fee:20000}],
      description:'',
      logo:'',
      uuid:'2',
      name:'By Buyer',
      createdAt:'',
      updatedAt:'',
      id:0
    })
    this.shipmentMethod.push({
      feerange:[{length:10,width:20,height:30,volume:0.06,weight:1000,fee:10000},
        {length:20,width:40,height:60,volume:0.06,weight:2000,fee:20000}],
      description:'',
      logo:'',
      uuid:'3',
      name:'Waiwa',
      createdAt:'',
      updatedAt:'',
      id:0
    })
    this.shipmentMethod.push({
      feerange:[{length:10,width:20,height:30,volume:0.06,weight:1000,fee:10000},
        {length:20,width:40,height:60,volume:0.06,weight:2000,fee:20000}],
      description:'',
      logo:'',
      uuid:'4',
      name:'HAL',
      createdAt:'',
      updatedAt:'',
      id:0
    })
  }
  getPaymentMethods(pUuid:Array<string>){
    return this.shipmentMethod.filter(v=>pUuid.includes(v.uuid));
  }
  getShipmentMethod(sUuid:Array<string>){
    return this.shipmentMethod.filter(v=>sUuid.includes(v.uuid));
  }
  
  findRangeFee(l: IAddress, a: IAddress,rf:Array<IRangeFee>) {
    let fr = { fee: 0, range: {} as IRangeFee };
    rf.sort((a, b) => a.radius - b.radius).forEach(v=>{
      if (this.distance(l.location.lat, l.location.lng, a.location.lat, a.location.lng) >= v.radius)
        return;
      fr.fee = v.fee;
      fr.range = v;
    })
    return fr;
  }
  findPackageFee(prf:Array<IPackageFee>,storeUuid:string) {
    let pf = { fee: 0, package: {} as IPackageFee };

      prf.sort((a, b) => a.fee - b.fee)
      .forEach((v) => {
        const sumx = this.sumProductTotalVolumeWeight(storeUuid);
        if (sumx.weight >= v.weight) {
          pf.fee = v.fee;
          pf.package = v;
        }
        if (sumx.volume >= v.volume) {
          pf.fee = v.fee;
          pf.package = v;
        }
      });
    return pf;
  }
  sumProductTotalVolumeWeight(storeUuid: string) {
    let weight = 0;
    let volume = 0;
    this.order
      .filter((v) => v.store == storeUuid)
      .forEach((v) => {
        const spec = v.spec;
        const vol = spec.height*spec.width*spec.length;
        volume += spec.volume;
        weight += spec.weight;
      });
    return { volume, weight };
  }

  distance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: string = 'K'
  ) {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var radlon1 = (Math.PI * lon1) / 180;
    var radlon2 = (Math.PI * lon2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }


  slideOpts = {
    freeMode: true,
    slidesPerView: 2,
    spaceBetween: 0,
    slidesOffsetBefore: 5,
    freeModeSticky: true,
  };
  slideOpt = {
    freeMode: true,
    slidesPerView: 1.6,
    spaceBetween: 0,
    slidesOffsetBefore: 5,
    freeModeSticky: true,
  };



  dismiss() {
    this.modal.dismiss();
  }

  async transport(action: string) {
    const mn = await this.madal.create({
      component: WayTransportPage,
      componentProps: {
        action: action,
      },
    });
    await mn.present();
    
  }

  //====================================action 1

  counts_qtyshop(uuid) {
    // ບວກຈໍານວນສິນຄ້າ ຕາມຮັານ
    if (this.order != null) {
      return this.order
        .filter((v) => v.storeUuid == uuid)
        .reduce((a, b) => a + b.qty, 0);
    }
  }
  counts_qtyallshop() {
    if (this.order != null) {
      return this.order.reduce((a, b) => a + b.order_qty, 0);
    }
  }
  sum_deliverycoststore(store: any) {
    if (this.order != null) {
      return this.order
        .filter((v) => v.storeUuid == store)
        .reduce((a, b) => a + b.delivery_cost, 0);
    }
  }

  findSum(id: string) {
    // ບວກຈໍານວນເງີນ ຕາມຮັານ
    return this.order
      .filter((v) => v.store == id)
      .reduce((a, b) => a + b.total, 0);
  }

  sum_pricestore(store: any) {
    const a = this.sum_deliverycoststore(store) + this.findSum(store);
    return a;
  }
  sum_pricesall() {
    const a = this.sum_deliverycostall() + this.findSumAll();
    return a;
  }

  sum_deliverycostall() {
    if (this.order != null) {
      return this.order.reduce((a, b) => a + b.delivery_cost, 0);
    }
  }

  findSumAll() {
    // ບວກຈໍານວນເງີນທັງໝົດຮ້ານທີ່ມີ ຕາມຮັານ
    if (this.order != null) {
      return this.order.reduce((a, b) => a + b.total, 0);
    }
  }

  payAll() {
    // ສັ່ງຊື້ໝົດທຸກຮ້ານ
    const allBills = [];
    this.store_in_cart.forEach(v => {
      const order = this.order.filter(x=> x.storeUuid == v.uuid);
      const bill = {
        storeid: v.id,
        order,
      };
      allBills.push(bill);
      //==>[]
    });
    console.log(allBills);
    
  }
}

export interface IBase {
  id: number;
  uuid: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStoreConfig {
  storeUuid: string;
  rangefee: Array<IRangeFee>; //jsonb
  packagefee: Array<IPackageFee>; //jsonb
  location: IAddress; //jsonb
  paymentMethodUuid: Array<string>;
  shipmentMethodUuid: Array<string>;
}
export interface IRangeFee {
    radius: number;
    fee: number;
}
export interface IPackageFee {
    fee: number;
    weight: number;
    length: number;
    width: number;
    height: number;
    volume: number;
}

export interface IPaymentMethod extends IBase {
  name: string;
  logo: string;
  description: string;
  feerange: Array<IPaymentMethodFee>;
}
export interface IShipmentMethod extends IBase {
  name: string;
  logo: string;
  description: string;
  feerange: Array<IShipmentMethodFee>;
}

export interface IShipmentMethodFee{
  width:number;
  length:number;
  height:number;
  volume:number;
  weight:number;
  fee:number
}
export interface IPaymentMethodFee{
  fee:number;
  max:number;
}

export interface IAddress extends IBase {
  storeUuid: string;
  name: string;
  address: string;
  road: string;
  village: string;
  district: string;
  province: string;
  country: string;
  description: string;
  location: IGPSLocation;
}
export interface IGPSLocation{
  lat:number;
  lng:number;
  alt:number;
  gpsTime:string;
  serverTime:string;
}