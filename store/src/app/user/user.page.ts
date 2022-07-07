import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ProfileService } from 'src/service/profile.service';
import { LoginPage } from '../auth/login/login.page';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  getlogin:boolean=true;

  constructor(private rout: Router,
    private profile: ProfileService,
    private load: LoadingController,
    private alertController: AlertController,
    private modalCtrl:ModalController) { }

  ngOnInit() {
    if (localStorage.getItem('token') == null) {
      this.getlogin=false;
    }else{
      this.getlogin=true;
    }
  }
  image='../../assets/icon/favicon.png';


  async loadgprofile() {
    if (localStorage.getItem('token') == null) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'ຢືນຢັນ',
        message: 'ທ່ານຕ້ອງເຂົ້າສູ່ລະບົບເພື່ອສືບຕໍ່',
        buttons: [
          {
            text: 'ຍົກເລີກ',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {

            }
          }, {
            text: 'ຕົກລົງ',
            handler: async () => {
              const modal = await this.modalCtrl.create({
                component: LoginPage,
                cssClass: 'my-custom-class',
                componentProps: {
                  'modal': true,
                }
              });
              modal.onDidDismiss().then(
                res => {
                
                  // if (res.data.load) {
                  //   this.LoadCountCommentByPostUuid()
          
                  // }
                  this.getlogin=true;
                }
              )
              return await modal.present();
            }
          }
        ]
      });

      await alert.present();
    }
    else{
      this.rout.navigate(['../user/profile']);

    }
  }


  // async MyfavoritesPost() {
  //   if (localStorage.getItem('token') == null) {
  //     const alert = await this.alertController.create({
  //       cssClass: 'my-custom-class',
  //       header: 'ຢືນຢັນ',
  //       message: 'ທ່ານຕ້ອງເຂົ້າສູ່ລະບົບເພື່ອສືບຕໍ່',
  //       buttons: [
  //         {
  //           text: 'ຍົກເລີກ',
  //           role: 'cancel',
  //           cssClass: 'secondary',
  //           handler: () => {

  //           }
  //         }, {
  //           text: 'ຕົກລົງ',
  //           handler: async () => {
  //             const modal = await this.modalCtrl.create({
  //               component: LoginPage,
  //               cssClass: 'my-custom-class',
  //               componentProps: {
  //                 'modal': true,
  //               }
  //             });
  //             modal.onDidDismiss().then(
  //               res => {
                
  //                 // if (res.data.load) {
  //                 //   this.LoadCountCommentByPostUuid()
          
  //                 // }
  //               }
  //             )
  //             return await modal.present();
  //           }
  //         }
  //       ]
  //     });

  //     await alert.present();
  //   } else {
  //     this.rout.navigate(['../user/myfavoritepost']);

  //   }
  // }

  async logout() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ຢືນຢັນ',
      message: 'ຕ້ອງການອອກຈາກລະບົບ ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            // this.rout.navigate(['/auth'])
            localStorage.removeItem('token');
            this.getlogin=false;
          }
        }
      ]
    });

    await alert.present();
  }
}
