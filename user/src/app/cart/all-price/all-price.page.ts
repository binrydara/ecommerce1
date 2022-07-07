import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
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

  public name: string;
  public tel: string;
  public place: string;
  public village: string;
  public district: string;
  public provice: string;
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
    { n: 'ຈ່າຍຜ່ານທາງ BCL one', p: '../../../../assets/icon/bcl.png' },
    { n: 'ຈ່າຍຜ່ານທາງ M-money', p: '../../../../assets/icon/mmoney.png' },
    { n: 'ຈ່າຍຜ່ານທາງ U-money', p: '../../../../assets/icon/umoney.png' },
  ];
  public location: any;
  ax = Array<any>();
  public detail_person: any;

  constructor(
    private madal: ModalController,
    private modal: ModalController,
    private alter: AlertController,
    private toast: ToastController,
    private aleraction: AlertController
  ) {}
  public action: number = 1;
  public order: any;

  storeConfigs = new Array<IStoreConfig>();
  paymentMethod= new  Array<IPaymentMethod>();
  shipmentMethod=Array<IShipmentMethod>();

  customerExtraFee = {
    rangeFee:new  Array<ICustomerRangeFee>(),
    packageFee:  Array<ICustomerPackageFee>()
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
  loadAllStoreConfig() {
    const rfee = new Array<IRangeFee>();
    rfee.push({ fee: 5000, radius: 2 } as IRangeFee);
    rfee.push({ fee: 10000, radius: 5 } as IRangeFee);
    rfee.push({ fee: 20000, radius: 10 } as IRangeFee);
    rfee.push({ fee: 30000, radius: 15 } as IRangeFee);

    const prfee = new Array<IPackageFee>();
    let x = {
      fee: 0,
      length: 400,
      width: 300,
      height: 200,
      weight: 1,
    } as IPackageFee;
    x.volume = x.length * x.width * x.height;
    prfee.push(x);
    x = {
      fee: 5000,
      length: 800,
      width: 300,
      height: 200,
      weight: 2,
    } as IPackageFee;
    x.volume = x.length * x.width * x.height;
    prfee.push(x);
    x = {
      fee: 10000,
      length: 1000,
      width: 300,
      height: 200,
      weight: 3,
    } as IPackageFee;
    x.volume = x.length * x.width * x.height;
    prfee.push(x);

    this.storeConfigs.push({
      rangefee: rfee,
      packagefee: prfee,
      paymentMethodUuid: ['1', '2', '3'],
      shipmentMethodUuid: ['1', '3', '4'],
      location: {
        address: 'pakthang',
        lat: 17.997929164990946,
        lng: 102.56511371102009,
      } as IAddress,
      storeUuid: '1',
    });
    this.storeConfigs.push({
      rangefee: rfee,
      packagefee: prfee,
      paymentMethodUuid: ['1', '2', '3'],
      shipmentMethodUuid: ['1', '3', '4'],
      location: {
        address: 'sikhay',
        lat: 17.99254145033397,
        lng: 102.58925359169066,
      } as IAddress,
      storeUuid: '2',
    });
    this.storeConfigs.push({
      rangefee: rfee,
      packagefee: prfee,
      paymentMethodUuid: ['1', '2', '3'],
      shipmentMethodUuid: ['1', '3', '4'],
      location: {
        address: 'nongbeuk',
        lat: 17.021993000674293,
        lng: 102.59667969598237,
      } as IAddress,
      storeUuid: '1',
    });


    /// REAL TIME GPS location
  }
  getRangeFeeByStoreUuid(storeUuid:string){
    // rangeFee one store
    return this.customerExtraFee.rangeFee.find(v=>v.storeUuid==storeUuid);
  }
  getExtraPackageFeeByStoreUuid(storeUuid:string){
    // pageketFee one store
    return this.customerExtraFee.packageFee.find(v=>v.storeUuid==storeUuid);
  }

  
  selectAddress(id: number) {
    // customer address
    const a = this.address.find((v) => v.id == id);

   this.storeConfigs.forEach((v) => {
      const fr = this.findRangeFee(v.location, a,v.rangefee);
      this.customerExtraFee.rangeFee.push({
        fee: fr.fee,
        range: fr.range,
        storeUuid: v.storeUuid,
      });
      const pf = this.findPackageFee(v.packagefee,v.storeUuid);
      this.customerExtraFee.packageFee.push({
        fee: pf.fee,
        storeUuid: v.storeUuid,
        package: pf.package,
      });
    });
  }
  findRangeFee(l: IAddress, a: IAddress,rf:Array<IRangeFee>) {
    let fr = { fee: 0, range: {} as IRangeFee };
    rf.sort((a, b) => a.radius - b.radius).forEach(v=>{
      if (this.distance(l.lat, l.lng, a.lat, a.lng) >= v.radius)
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

  address = Array<IAddress>();
  loadCustomerAddress() {
    this.address.push({
      id: 0,
      address: 'pakthang',
      lng: 102.57466893795643,
      lat: 17.996458311190448,
      alt: 0,
      isActive: true,
      phonenumber: '0000',
      province: 'vte',
    } as IAddress);
    this.address.push({
      id: 1,
      address: 'nongteng',
      lng: 102.53982676313076,
      lat: 18.018899804509573,
      alt: 0,
      isActive: false,
      phonenumber: '0000',
      province: 'vte',
    } as IAddress);
    this.address.push({
      id: 2,
      address: 'dongdok',
      lng: 102.63076748625407,
      lat: 18.0437741165745,
      alt: 0,
      isActive: false,
      phonenumber: '0000',
      province: 'vte',
    } as IAddress);
  }
  deleteAddress(id: number) {
    const i = this.address.findIndex((v) => v.id == id);
    const x = this.address.splice(i, 1);
    // send x to server
  }

  editAddress(id: number, a: IAddress) {
    const x = this.address.find((v) => v.id == id);
    Object.keys(x).forEach((k) => {
      x[k] = a[k];
    });
    // send x to server
  }
  setDefaultAddress(id: number) {
    const x = this.address.findIndex((v) => v.id == id);
    this.address.forEach((v) => (v.isActive = false));
    this.address[x].isActive = true;
    // send x to server
  }
  addAddress(a: IAddress) {
    this.address.push(a);
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

  ngOnInit() {
    this.order = JSON.parse(localStorage.getItem('order'));
    this.storelist();
    this.detail_person = JSON.parse(localStorage.getItem('detail_person'));
    console.log(this.detail_person);

    this.location = JSON.parse(localStorage.getItem('s'));
    console.log(this.location);
  }

  dismiss() {
    localStorage.removeItem('order');
    localStorage.removeItem('s');
    // localStorage.removeItem('detail_person')
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



  //=============================================action 3

  async add_detail() {
    if (
      !this.name ||
      !this.tel ||
      !this.place ||
      !this.village ||
      !this.district ||
      !this.provice
    ) {
      const alters = await this.alter.create({
        header: 'ຜິດພາດ !!',
        message: 'ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ !!',
        buttons: ['Ok'],
      });
      await alters.present();
    } else {
      const mess = await this.toast.create({
        message: 'ເພີ່ມຂໍ້ມູນສໍາເລັດ.....!!!',
        duration: 1000,
      });
      this.push_detailperson();
      await mess.present();
    }
  }
  clear() {
    this.name = '';
    this.tel = '';
    this.place = '';
    this.village = '';
    this.district = '';
    this.provice = '';
    this.detail_person = JSON.parse(localStorage.getItem('detail_person'));
  }
  push_detailperson() {
    let detail_individual: any;
    let zx: any = JSON.parse(localStorage.getItem('detail_person'));
    if (zx == null) {
      detail_individual = {
        name: this.name,
        tel: this.tel,
        place: this.place,
        village: this.village,
        district: this.district,
        provice: this.provice,
      };
      localStorage.setItem(
        'detail_person',
        JSON.stringify([detail_individual])
      );
      this.clear();
      return;
    }
    if (JSON.parse(localStorage.getItem('detail_person')).length > 0) {
      let u = JSON.parse(localStorage.getItem('detail_person'));
      u.push({
        name: this.name,
        tel: this.tel,
        place: this.place,
        village: this.village,
        district: this.district,
        provice: this.provice,
      });
      localStorage.setItem('detail_person', JSON.stringify(u));
      this.clear();
      return;
    }
  }

  //=================================action 2
  back() {
    this.location = JSON.parse(localStorage.getItem('s'));
    this.action = 1;
  }

  async delete_location(j) {
    const aler = await this.aleraction.create({
      header: 'ຢືນຢັນ',
      message: 'ຕ້ອງການລືບເເທ້ ຫຼື ບໍ!!',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Okey',
          handler: () => {
            this.trush(j);
          },
        },
      ],
    });
    await aler.present();
  }

  trush(j) {
    if (this.detail_person != null) {
      let a = JSON.parse(localStorage.getItem('detail_person'));
      a.splice(j, 1);
      localStorage.setItem('detail_person', JSON.stringify(a));
      this.detail_person = JSON.parse(localStorage.getItem('detail_person'));
    }
    if (this.detail_person.length == 0) {
      localStorage.removeItem('detail_person');
      this.detail_person = null;
    }
  }

  sent(item) {
    localStorage.setItem('s', JSON.stringify([item]));
    this.action = 1;
    this.location = JSON.parse(localStorage.getItem('s'));
  }

  //====================================action 1

  storelist() {
    // ເເຍກ ຮ້ານຊໍ້າກັນມາເປັນຕົວດຽວ
    if (this.order != null) {
      this.ax = this.order.map((v) => v.store);
      this.ax = [...new Set(this.ax)];
      return this.ax;
    }
  }
  findstore() {
    if (this.order != null) {
      this.ax = this.order.map((v) => v.store);
      this.ax = [...new Set(this.ax)];
      return this.ax.length;
    }
  }

  counts_qtyshop(shop) {
    // ບວກຈໍານວນສິນຄ້າ ຕາມຮັານ
    if (this.order != null) {
      return this.order
        .filter((v) => v.store == shop)
        .reduce((a, b) => a + b.qty, 0);
    }
  }
  counts_qtyallshop() {
    if (this.order != null) {
      return this.order.reduce((a, b) => a + b.qty, 0);
    }
  }
  sum_deliverycoststore(store: any) {
    if (this.order != null) {
      return this.order
        .filter((v) => v.store == store)
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
    this.ax.forEach((v) => {
      const order = this.order.filter((v) => v.store == v.store);
      const bill = {
        storeid: v.id,
        order,
      };
      allBills.push(bill);
      //==>[]
    });
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
// export interface IStoreLocation {
//   storeUuid: string;

// }

export interface IRangeFee extends IBase {
  // storeUuid:string;
  radius: number;
  fee: number;
  description: string;
}
export interface IPackageFee extends IBase {
  // storeUuid:string;
  fee: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  volume: number;
  description: string;
}

export interface IPaymentMethod extends IBase {
  // storeUuid:string;
  name: string;
  logo: string;
  description: string;
  feerange: Array<IPaymentMethodFee>;
}
export interface IShipmentMethod extends IBase {
  // storeUuid:string;
  name: string;
  logo: string;
  description: string;
  feerange: Array<IShipmentMethodFee>;
}
export interface IAddress extends IBase {
  address: string;
  road: string;
  province: string;
  district: string;
  village: string;
  phonenumber: string;
  contactdetails: string;
  lat: number;
  lng: number;
  alt: number;
  isActive: boolean;
}

export interface ICustomerPackageFee {
  storeUuid: string;
  fee: number;
  package: IPackageFee;
}
export interface ICustomerRangeFee {
  storeUuid: string;
  fee: number;
  range: IRangeFee;
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
