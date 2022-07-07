import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ProfileService } from 'src/service/profile.service';

@Component({
  selector: 'app-add-method',
  templateUrl: './add-method.page.html',
  styleUrls: ['./add-method.page.scss'],
})
export class AddMethodPage implements OnInit {

  public method_list = Array<any>();
  public getmethod_list = Array<any>();
  @Input() action = '';
  @Input() getpayment = [];
  @Input() getshipment = [];
  public count=0;

  constructor(private alrt: AlertController, private load: LoadingController,
    private profile: ProfileService, private modal: ModalController) { }

  ngOnInit() {
    
    if(this.action=='1'){

      // this.loadloadpayment();

    this.method_list=[{uuid:1,name:'Mmoney'},{uuid:2,name:'Umoney'}];
    this.getmethod_list=JSON.parse(JSON.stringify(this.getpayment));
    }else{

      // this.loadloadshipment();

    this.method_list=[{uuid:3,name:'ຮຸ່ງອາລຸນ'},{uuid:4,name:'ອານຸສິດ'}];
    this.getmethod_list=JSON.parse(JSON.stringify(this.getshipment));
    }
  }

  dismiss() {

    this.modal.dismiss({
      'dismissed': true
    });
  }


  send() {

    if (this.action == '1') {
      this.modal.dismiss({
        'dismissed': true,
        'payment':this.getmethod_list
      });
    } else {
      this.modal.dismiss({
        'dismissed': true,
        'shipment':this.getmethod_list
      });
    }
  }


  async loadloadpayment() {

    const loading = await this.load.create({
      message: 'ກະລຸນາລໍຖ້າ...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.profile.loadpayment().subscribe((response: any) => {

      // this.data = response.data;
      this.method_list = response.data;
      console.log(response.data);

      localStorage.setItem('item_3product', JSON.stringify(this.method_list));

      loading.dismiss();

    }, async error => {
      console.log('errror', error);
      loading.dismiss()

      this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

    })
  }

  async loadloadshipment() {

    const loading = await this.load.create({
      message: 'ກະລຸນາລໍຖ້າ...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.profile.loadshipment().subscribe((response: any) => {

      // this.data = response.data;
      this.method_list = response.data;
      console.log(response.data);

      localStorage.setItem('item_3product', JSON.stringify(this.method_list));

      loading.dismiss();

    }, async error => {
      console.log('errror', error);
      loading.dismiss()

      this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

    })
  }


  getcheck(uuid: string) {

    if (this.action == '1') {
      
      if (this.getpayment.length == 0) {
        return false
      } else {

        try {
          
          return this.getpayment.some(v=>v.uuid==uuid);
        } catch (error) {
          return false;
        }
      }
    } else {

      if (this.getshipment.length == 0) {
        return false
      } else {

        try {
          return this.getshipment.some(v=>v.uuid==uuid);
        } catch (error) {
          return false;
        }
      }
    }

  }

  async selectCheckBox(e, i:any) {
    e = e || window.event;
    const el = e.srcElement as HTMLIonCheckboxElement;
    if (el.checked) {
      // if (this.selectArray.length == 3) {
      //   const alert = await this.alrt.create({
      //     header: 'ແຈ້ງເຕືອນ !!',
      //     message: 'ເພີ່ມໄດ້ສູງສຸດ 3 ປະເພດ !',
      //     buttons: ['OK']
      //   });

      //   await alert.present();
      //   return el.checked = false;
      // }
      this.getmethod_list.push(i);
    } else {

      const index = this.getmethod_list.findIndex(v => v.uuid == i.uuid);
      if (index > -1) this.getmethod_list.splice(index, 1);

      if (this.getmethod_list.length == 0) {
        console.log("yes");

      }
    }
    console.log(this.getmethod_list);

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
