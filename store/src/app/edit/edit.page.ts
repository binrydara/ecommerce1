import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ServerService } from '../service/server.service';
import { NavController, Platform, LoadingController, IonSlides, AlertController, ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: 'edit.page.html',
  styleUrls: ['edit.page.scss'],
})
export class EditPage {

  // data: any;

  @Input() data:any;
  text: any;
  constructor(public modalCtrl:ModalController, public toastController: ToastController, public alertController: AlertController, public server: ServerService, private nav: NavController, public loadingController: LoadingController) {
    // this.data 	= JSON.parse(localStorage.getItem('idata'));
  }

  // ionViewWillEnter()
  // {
  //   if(localStorage.getItem('app_text') && localStorage.getItem('app_text') != undefined)
  //   {
  //     this.text = JSON.parse(localStorage.getItem('app_text'));
  //   }
  // }

  ngOnInit() {
    console.log(this.data);
    
  }


  async edit(formData) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();

    this.server.editItem({ data: formData, id: this.data.id }).subscribe((response: any) => {

      this.presentToast("Updated data Successfully");

      // this.nav.navigateBack('item');

      loading.dismiss();

      this.reload();

    });
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

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }


  reload() {
    this.modalCtrl.dismiss({
      'reload': true,
    });
  }


}
