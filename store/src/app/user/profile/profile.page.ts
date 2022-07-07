import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ProfileService } from 'src/service/profile.service';
import { UpdateProfilePage } from '../update-profile/update-profile.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public id: string = ""
  public name: string = ""
  public description = ""
  public tags: any = []
  public contact: any = []
  public data_forUpdate_address: any = []
  public data_forUpdate: any = []
  public address_list: any = []
  public image = "../../assets/icon/avatar.jpg"

  constructor(private rout: Router,
    private profile: ProfileService,
    private load: LoadingController,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private actionSheetController:ActionSheetController) { }

  ngOnInit() {
    // this.getaddress();
    // this.getprofile();

    
  }

  // async action(){
    
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'ເຈົ້າຕ້ອງການ ?',
  //     cssClass: 'my-custom-class',
  //     buttons: [{
  //       text: 'ແກ້ໄຂໂປຣຟາຍ',
  //       role: 'destructive',
  //       icon: 'create',
  //       handler: () => {
  //         this.update_profile()
  //       }
  //     }, {
  //       text: 'ອອກຈາກລະບົບ',
  //       role: 'destructive',
  //       icon: 'exit',
  //       handler: () => {
  //         this.logout()
  //       }
  //     }]
  //   });
  //   await actionSheet.present();
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
            this.rout.navigate(['tabs/user'])
            localStorage.removeItem('token');
          }
        }
      ]
    });

    await alert.present();
  }

  // getaddress(){
  //   if (this.data.user_address.length != 0) {
  //     this.data_forUpdate_address = this.data.user_address
  //     this.address_list = this.data.user_address
  //   } else {
  //     this.loadaddress();
  //   }
  // }
  // getprofile(){
  //   if (this.data.userdata.length != 0) {

  //     this.id = this.data.userdata.id
  //     this.name = this.data.userdata.name
  //     this.description = this.data.userdata.description
  //     this.tags = this.data.userdata.tags
  //     this.contact = this.data.userdata.contact
  //     this.data_forUpdate = this.data.userdata
  //   } else {
  //     this.loadgprofile();
  //   }
  // }

  // async loadgprofile() {

    
  //     const loader = await this.load.create({
  //       message: 'Please wait...',

  //     });
  //     loader.present();

  //     this.profile.selectOne_store().subscribe(res => {
  //       console.log('res of profile', res);

  //       if (Object.keys(res.data).length != 0) {

  //           this.id = res.data.id
  //           this.name = res.data.name
  //           this.description = res.data.description
  //           this.tags = res.data.tags
  //           this.contact = res.data.contact
  //           this.data_forUpdate = res.data

  //         // this.data.userdata = res.data;

  //       }

  //       loader.dismiss()

  //     }), errr => {
  //       console.log('error', errr);
  //       loader.dismiss()
  //     };
  // }

  // async loadaddress() {

  //     localStorage.setItem('skip', '0')

  //     this.profile.LoadAddress().subscribe(async res => {
  //       console.log('res of address', res);


  //       if (res.data.count != 0) {

  //         this.data_forUpdate_address = res.data.rows[0]

  //         this.address_list = res.data.rows[0]

  //         // this.data.user_address = res.data.rows[0]
  //       }

  //       if (res.data.count == 0) {

  //         this.create_address().then(r => {
  //           console.log("Create!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", r);

  //           this.profile.LoadAddress().subscribe(res => {
  //             console.log("load ADDRESS !!!!!!!!!!!!", res);

  //             this.data_forUpdate_address = res.data.rows[0]

  //             this.address_list = res.data.rows[0]
  //             console.log("load more data !!!!!!!!!!!!!!!!!!!!", this.address_list);

  //           })
  //         }).catch(e => {
  //           console.log(e);

  //         })


  //       }

  //     }), errr => {
  //       console.log('error', errr);
  //     };
  //   }
  
  // async create_address(): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     let data_of_address = {
  //       storeUuid: localStorage.getItem('token')
  //     }
  //     this.profile.new_address(data_of_address).subscribe(async res => {
  //       if (res.status == 1) {
  //         console.log("res of new address", res);
  //         resolve(res)
  //       } else {
  //         console.log('status of new address', res);

  //         reject(new Error(res.message));
  //       }
  //     }, async error => {
  //       console.log('add address errror', error);
  //       reject(error);
  //     })
  //   });

  // }



  gotoPost() {
    this.rout.navigate(['post'])
  }

  // async update_profile() {

  //   if (this.data_forUpdate_address) {

  //   } else {
  //     this.data_forUpdate_address = []
  //   }
  //   const modal = await this.modalCtrl.create({
  //     component: UpdateProfilePage,
  //     componentProps: {
  //       'id': this.id,
  //       'data': this.data_forUpdate,
  //       'addressID': this.data_forUpdate_address
  //     }
  //   });

  //   modal.onDidDismiss().then(
  //     res => {
  //       if (res.data.reload) {

  //         this.loadgprofile();
  //         this.loadaddress();
  //       }
  //     }
  //   )

  //   return await modal.present();
  // }

  back() {
    this.rout.navigate(['../../tabs/user'])
  }



  gotoproduct(){
    // this.data.storeID=this.id
    this.rout.navigate(['product/product-list'])
  }

}
