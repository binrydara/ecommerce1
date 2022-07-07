import { Component, OnInit, ViewChild } from '@angular/core';
import { ServerService } from '../service/server.service';
import { NavController, Platform, LoadingController, IonSlides, AlertController, ToastController, ModalController } from '@ionic/angular';
import { EditPage } from '../edit/edit.page';
import { Router } from '@angular/router';
import { AddOnPage } from '../add-on/add-on.page';
import { ProfileService } from 'src/service/profile.service';
import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';
import { environment } from 'src/environments/environment';

declare var window;

@Component({
  selector: 'app-item',
  templateUrl: 'item.page.html',
  styleUrls: ['item.page.scss'],
})
export class ItemPage {
  apiServer = 'https://hangmiapi.laoapps.com/';
  data: any;
  text: any;
  pet: number = 0;
  ap: number = 0;
  isadd: boolean = true;
  data_forUpdate: any = [];
  user_data: any = [];
  _3apps_data: any = [];
  url='';

  ngOnInit() {


    // this.loadData();
  }

  getImagePath(im: string) {

    if (im) {
      return this.url + im;
    }

    return '../../assets/cart.png'

  }

  constructor(private rout: Router, public alrt: AlertController, public modalCtrl: ModalController,
    public toastController: ToastController, public alertController: AlertController, public server: ServerService,
    private nav: NavController, public loadingController: LoadingController, private profile: ProfileService) {
    window.item = this;
  }

  ionViewWillEnter() {

    this.url = environment.serverFile + 'file/download/';


    // console.log(JSON.parse(localStorage.getItem('user_3apps')));
    if (!localStorage.getItem('user_3apps') || localStorage.getItem('user_3apps') == 'null') {
      this.alert("ເກີດຂໍ້ຜິດພາດບາງຢ່າງ ກະລຸນາກົດເຂົ້າລະບົບໃໝ່ອີກຄັ້ງ");
      this.nav.navigateRoot('/welcome');
    }
    else {
      this.user_data = JSON.parse(localStorage.getItem('user_3apps'));

      if (!localStorage.getItem('item_3product') || localStorage.getItem('item_3product') == 'undefined' || localStorage.getItem('item_3product') == null) {
        this.loadData();
        console.log("loading from server");


      } else {
        this._3apps_data = JSON.parse(localStorage.getItem('item_3product'));
        // this._3apps_data = JSON.parse(localStorage.getItem('item_3product'+JSON.parse(localStorage.getItem('user_3apps')).id));
        console.log(this._3apps_data);

      }
      // if (!localStorage.getItem('item_3product'+JSON.parse(localStorage.getItem('user_3apps')).id) || localStorage.getItem('item_3product'+JSON.parse(localStorage.getItem('user_3apps')).id) == 'undefined' || localStorage.getItem('item_3product'+JSON.parse(localStorage.getItem('user_3apps')).id) == null) {
      //   this.loadData();
      //   console.log("loading from server");


      // } else {
      //   this._3apps_data = JSON.parse(localStorage.getItem('item_3product'+JSON.parse(localStorage.getItem('user_3apps')).id));
      //   console.log(this._3apps_data);

      // }
    }



  }

  async loadData() {

    const loading = await this.loadingController.create({
      message: 'ກະລຸນາລໍຖ້າ...',
      spinner: 'bubbles',
    });
    await loading.present();



    let data = {
      storeType: this.user_data.storeType,
      storeUuid: this.user_data.uuid,
    }

    this.profile.SelectAll(data).subscribe((response: any) => {

      // this.data = response.data;
      console.log(response.data);

      if(response.status==1){
        this._3apps_data = response.data;

        // localStorage.setItem('item_3product'+JSON.parse(localStorage.getItem('user_3apps')).id, JSON.stringify(this._3apps_data));
        localStorage.setItem('item_3product', JSON.stringify(this._3apps_data));
      }
     

      loading.dismiss();

    }, async error => {
      console.log('errror', error);
      loading.dismiss()

      this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

    })
  }


  async changeStatus(item) {

    // item.isActive = !item.isActivle;
    // item.isActive = !item.isActive;
    console.log(item.isActive);

    const alert = await this.alrt.create({
      header: 'ແຈ້ງເຕືອນ',
      message: 'ຕ້ອງການປ່ຽນສະຖານະສິນຄ້າແທ້ບໍ່ ?',
      buttons: [{
        text: 'ຍົກເລີກ',
        handler: () => {
          // item.isActive = !item.isActivle;
          console.log(item.isActive);
          item.isActive = !item.isActive;
          console.log(item.isActive);
        }
      },
      {
        text: 'ຕົກລົງ',
        handler: async () => {
          console.log(item.isActive);

          const loading = await this.loadingController.create({
            message: 'ກະລຸນາລໍຖ້າ...',
          });
          await loading.present();

          let data = {
            pid: item.id,
            isActive: item.isActive,
            owneruuid: this.user_data.uuid,
          }

          this.profile.changeStatus(data).subscribe((response: any) => {

            if (response.status == 1) {
              this.loadData();
            } else {
              item.isActive = !item.isActive;
            }
            console.log(response);
            loading.dismiss();

            this.presentToast('ອັບເດດຂໍ້ມູນສຳເລັດແລ້ວ');
          });


        }
      }
      ]
    });

    await alert.present();



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

  detail(odata) {
    localStorage.setItem('odata', JSON.stringify(odata));

    this.nav.navigateForward('/detail');
  }

  add() {
    // this.isadd=true;
    // this.nav.navigateForward('/item/add-edit');
    // this.rout.navigate(['item/add-edit'],{queryParams:{id,profileid,page}})
    let isadd = true;
    this.rout.navigate(['item/add-edit'], { queryParams: { isadd } })
  }

  edit(data) {
    // this.isadd=false;
    // this.data_forUpdate=data;
    // this.nav.navigateForward('/item/add-edit');

    let data_forUpdate = JSON.stringify(data);
    let isadd = false;
    this.rout.navigate(['item/add-edit'], { queryParams: { isadd, data_forUpdate } });
  }
  async editPrice(idata) {
    // localStorage.setItem('idata', JSON.stringify(idata));

    // this.nav.navigateForward('/edit');

    const modal = await this.modalCtrl.create({
      component: EditPage,
      // cssClass:'modal-fullscreen',
      cssClass: 'dialog-modal',
      componentProps: {
        'data': idata,
      }
    });

    modal.onDidDismiss().then(
      res => {
        try {
          if (res.data.reload) {
            this.loadData();
          }
        } catch (error) {
          // console.log(error);

        }

      }
    )

    return await modal.present();
  }

  getcolor_size(i:any){
    if(!i.moreDetail){
      return ''
    }
    if(!i.moreDetail.prop){
      return ''
    }
    
    if(i.moreDetail.prop.length ==1){

      let prop1=i.moreDetail.prop[0];

      if(prop1=='colors'){
        prop1='ສີ';
      }
      if(prop1=='sizes'){
        prop1='ຂະໜາດ';

      }
      return prop1+" : "+i.moreDetail.data

    }else if(i.moreDetail.prop.length ==2){ 

      let prop1=i.moreDetail.prop[0];
      let prop2=i.moreDetail.prop[1];

      if(prop1=='colors'){
        prop1='ສີ';
      }
      if(prop2=='sizes'){
        prop2='ຂະໜາດ';

      }
      return prop1+" : "+i.moreDetail.data[0]+" , "+prop2+" : "+i.moreDetail.data[1]

    }else{
      return ''
    }
  }
  
  async alert(text: string) {
    const alert = await this.alrt.create({
      header: 'ແຈ້ງເຕືອນ',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }
}
