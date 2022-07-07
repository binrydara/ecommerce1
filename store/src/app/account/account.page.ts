import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../service/server.service';
import { ToastController, NavController, Platform, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { ProfileService } from 'src/service/profile.service';
import { DatapassService, IDistrict, IProvince, IVillage } from 'src/service/datapass.service';
import { AddMethodPage } from './add-method/add-method.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})


export class AccountPage implements OnInit {
  @ViewChild('content', { static: false }) private content: any;

  data: any;
  action: any;
  text: any;
  order: any;
  isOpen: 0;
  public province_list = Array<IProvince>();
  public district_list = Array<IDistrict>();
  public village_list = Array<IVillage>();
  public pr_id: number = -1
  public dr_id: number = -1
  public pr_name: string = ""
  public dr_name: string = ""
  public vill_name: string = ""

  storeType:string='';
  phonenumber:string='';
  name:string='';

  public payment_list=[];
  public shipment_list=[];

  constructor(private alt: AlertController, public server: ServerService, public toastController: ToastController,
    private nav: NavController, public loadingController: LoadingController, private profile: ProfileService,
    private datapass: DatapassService,private modalCtrl:ModalController) {

    // this.text = JSON.parse(localStorage.getItem('app_text'));

  }


  ngOnInit() {

  }



  ionViewWillEnter() {

    this.province_list = this.datapass.province_array;
    this.district_list = this.datapass.distirct_array;
    this.village_list = this.datapass.village_array;

    console.log(JSON.parse(localStorage.getItem('user_3apps')));
    if (!localStorage.getItem('user_3apps') || localStorage.getItem('user_3apps') == 'null') {
      this.alert("ເກີດຂໍ້ຜິດພາດບາງຢ່າງ ກະລຸນາກົດເຂົ້າລະບົບໃໝ່ອີກຄັ້ງ");
      this.nav.navigateRoot('/welcome');
    }
    else {
      this.data = JSON.parse(localStorage.getItem('user_3apps'));
      this.isOpen = this.data.open;
      this.name=this.data.name;
      this.storeType=this.data.storeType;
      this.phonenumber=this.data.more_detail.phonenumber;
      this.payment_list=this.data.paymentMethodUuid;
      this.shipment_list=this.data.shipmentMethodUuid;
      console.log(this.data);
      

      let a=[{uuid:1,name:'Mmoney'},{uuid:2,name:'Umoney'}];
      let b=[{uuid:3,name:'ຮຸ່ງອາລຸນ'},{uuid:4,name:'ອານຸສິດ'}];
      
   try {
    this.payment_list=a.filter(v=>this.payment_list.includes(v.uuid));
    this.shipment_list=b.filter(v=>this.shipment_list.includes(v.uuid));

    if(this.data.rangefee.length>0){
      this.value=this.data.rangefee;
      console.log(this.value);
      
      this.value.splice(this.value.length-1,1);
      
    }else{
      this.value.push({ radius: "", fee: "" });
    }
    if(this.data.packagefee.length>0){
      this.pack_value=this.data.packagefee;

    }else{
      this.pack_value.push({ weight: "", width: "", plength: "", height: "", fee: "", volume: "" });
    }
   } catch (error) {
    console.log(error);
    
   }
    

      
      

      if (!this.data.more_detail.province) {
        console.log("vang!!!!!!!!!!!!!!!!!!!");

      } else {

        this.pr_name = this.data.more_detail.province;
        this.dr_name = this.data.more_detail.district;
        this.vill_name = this.data.more_detail.village;

        this.pr_id = this.province_list.find(v => v.pr_name == this.pr_name)?.pr_id;
        this.dr_id = this.district_list.find(v => v.dr_name == this.dr_name)?.dr_id;

        this.check_prID=this.pr_id;
        
        console.log(this.pr_id);
        console.log(this.dr_id);
    console.log(this.check_prID);


      }
    }
  }

  check_prID:number=0;
  findVillages() {
    return this.village_list.filter(v => v.dr_id == this.dr_id);
  }
  findDistricts() {
    return this.district_list.filter(v => v.pr_id == this.pr_id);
  }

  loaddistrict(e:any) {

    if(this.check_prID!=e.target.value){
      this.dr_id=-1;
      this.dr_name='';
      console.log("fff");
      
    }
    this.pr_name = this.province_list.find(v => v.pr_id == this.pr_id).pr_name;
  }
  loadvillage(e) {

    this.vill_name = '';
    this.dr_name = this.district_list.find(v => v.dr_id == this.dr_id)?.dr_name;
    console.log("dr_name", this.dr_name);
  }

  async update() {

    let save_pack=[];

    if (this.value.length > 0) {
      const a = this.value.find(v => isNaN(v.radius)  || isNaN(v.fee));

      if (a) {

        this.alert("ກະລຸນາປ້ອນອັດຕາຄ່າຂົນສົ່ງໃຫ້ຄົບທຸກຊ່ອງ");
        return;
      }else{
        save_pack.push(...this.value);
        console.log(save_pack);
        
        save_pack.push({ radius: (this.value[this.value.length - 1]?.radius) + 0.1, fee: -1 });
        console.log(save_pack);
      }
    }else{
      this.alert("ກະລຸນາປ້ອນອັດຕາຄ່າຂົນສົ່ງ");
      return;
    }


    if(this.pack_value.length > 0){
      const a = this.pack_value.find(v => !v.weight || !v.width || !v.plength || !v.height || !v.fee || !v.volume);

      if (a) {

        this.alert("ກະລຸນາປ້ອນອັດຕາຄ່າແພັກເຄື່ອງໃຫ້ຄົບທຸກຊ່ອງ");
        return;
      }
    }else{
      this.alert("ກະລຸນາປ້ອນອັດຕາຄ່າແພັກເຄື່ອງ");
      return;
    }

    console.log(this.value);
    console.log(this.pack_value);
    console.log(save_pack);


    if (!this.name || !this.phonenumber || !this.pr_name || !this.dr_name || !this.vill_name) {

      this.alert('ກະລຸນາປ້ອນຂໍ້ມູນໃນຊ່ອງທີ່ມີໝາຍ * ໃຫ້ຄົບ'); return;
    }
    console.log(this.pr_name + this.dr_name + this.vill_name);

    if(this.payment_list.length==0){
      this.alert('ກະລຸນາເລືອກບໍລິການຊຳລະເງິນໃຫ້ລູກຄ້າ'); return;
    }
    if(this.shipment_list.length==0){
      this.alert('ກະລຸນາເລືອກບໍລິການຂົນສົ່ງໃຫ້ລູກຄ້າ'); return;
    }

    let senddata = {
      name: this.name,
      more_detail: { phonenumber: this.phonenumber, province: this.pr_name, district: this.dr_name, village: this.vill_name},
      rangefee:save_pack,
      packagefee:this.pack_value,
      paymentMethodUuid:this.payment_list.map(v=>v.uuid),
      shipmentMethodUuid:this.shipment_list.map(v=>v.uuid)
    }

    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'ກະລຸນາລໍຖ້າ...'
    });
    await loading.present();

    this.profile.update_profile(senddata, this.data.id).subscribe((response: any) => {

      if (response.status == 0) {
        this.presentToast("ການແກ້ໄຂບໍ່ສຳເລັດ !");
      }
      else {
        console.log(response);

        this.data = response.data;

        this.presentToast("ການແກ້ໄຂສຳເລັດ");

        localStorage.setItem('user_3apps', JSON.stringify(this.data));

        let all_store=JSON.parse(localStorage.getItem('all_store'));

        const i=all_store.findIndex(v=>v.id==response.data.id)

        all_store[i]=this.data;

        localStorage.setItem('all_store', JSON.stringify(all_store));
        console.log(all_store);
      }

      loading.dismiss();

    }, async error => {
      console.log('errror', error);
      loading.dismiss()

      this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

    })
  }

  async presentToast(txt) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 3000,
      position: 'top',
      mode: 'ios',
      color: 'dark'
    });
    toast.present();
  }

  async storeOpen(type) {

    const loading = await this.loadingController.create({
      message: 'ກະລຸນາລໍຖ້າ...',
      spinner: 'bubbles',
    });
    await loading.present();


    this.isOpen = type;

    let senddata = {
      open: type
    }

    console.log(type);
    this.profile.update_profile(senddata, this.data.id).subscribe((response: any) => {

      console.log(response.data);
      if (response.data.open == 0) {
        this.alert('ປິດຮ້ານສຳເລັດ');
      } else {
        this.alert('ເປີດຮ້ານສຳເລັດ');
      }
      let data = JSON.parse(localStorage.getItem('user_3apps'))
      data.open = type;
      localStorage.setItem('user_3apps', JSON.stringify(data));

      loading.dismiss();
    }, async error => {
      console.log('errror', error);
      loading.dismiss()

      this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

    })
  }

  async alert(text: string) {
    const alert = await this.alt.create({
      header: 'ແຈ້ງເຕືອນ',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }


  value = [];
  pack_value = [];

  removeradius(i) {
    this.value.splice(i, 1);
  }
  addradius() {
    this.value.push({ radius: "", fee: "" });
  }

  removepack(i) {
    this.pack_value.splice(i, 1);
  }
  addpack() {
    this.pack_value.push({ weight: "", width: "", plength: "", height: "", fee: "", volume: "" });
  }

  getmax() {
    if (this.value[this.value.length - 1]?.radius) {
      return (this.value[this.value.length - 1]?.radius) + 0.1;
    }
    return ''

  }


  calVolume(i: number) {
    let a = this.pack_value[i];

    if (a.width && a.plength && a.height) {
      a.volume = a.width * a.plength * a.height;
      return a.volume;
    }
    return '';
  }



  showpayment() {
    try {
      if (this.payment_list.length == 1) {

        return this.payment_list[0].name;

      } else if (this.payment_list.length > 1) {

        return this.payment_list.map(v => v.name);
      }
    } catch (error) {
      console.log(error);

    }
  }
  showshipment() {
    try {
      if (this.shipment_list.length == 1) {

        return this.shipment_list[0].name;

      } else if (this.shipment_list.length > 1) {

        return this.shipment_list.map(v => v.name);
      }
    } catch (error) {
      console.log(error);

    }
  }


  async getMethod(action: any) {
    const modal = await this.modalCtrl.create({
      component: AddMethodPage,
      componentProps: {
        'action': action,
        'getpayment':this.payment_list,
        'getshipment':this.shipment_list
      }
    });

    modal.onDidDismiss().then(res => {
      try {
        console.log(res);
        
        if (res.data.payment) {
          this.payment_list=[];
          console.log(res.data.payment);
          this.payment_list=res.data.payment;

        }
        if (res.data.shipment) {
          this.shipment_list=[];
          console.log(res.data.shipment);
          this.shipment_list=res.data.shipment;

        }
      } catch (error) {

      }
    })
    return await modal.present();
  }
}
