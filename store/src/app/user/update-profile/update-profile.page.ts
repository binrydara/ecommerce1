import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AddressService } from 'src/service/address.service';
import { ProfileService } from 'src/service/profile.service';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss'],
})
export class UpdateProfilePage implements OnInit {

  @Input() id: string
  @Input() data: any = []
  @Input() addressID: any = []
  public name: string

  public phoneNumber: string = ""

  public province_list: any = []
  public district_list: any = []
  public village_list: any = []
  public pr_id: string = ""
  public dr_id: string = ""
  public pr_name: string = ""
  public dr_name: string = ""
  public vill_name: string = ""
  

  constructor(private modalCtrl: ModalController,
    private pro: ProfileService,
    private load: LoadingController,
    private alt: AlertController,
    private address: AddressService) { }


  ngOnInit() {

    this.loadprovince();

    // this.name = this.data.name

    // if (Object.keys(this.addressID).length == 0) {
    //   console.log("vang!!!!!!!!!!!!!!!!!!!", this.addressID);

    // } else {

    //   this.pr_name = this.addressID.province
    //   this.dr_name = this.addressID.district
    //   this.vill_name = this.addressID.village


    // }
    // this.phoneNumber = this.data.contact.phoneNumber
  }

  public drop: string = "caret-back"
  dropdown() {
    if (this.drop == "caret-back") {
      this.drop = "caret-down"
      this.loadprovince()
    } else {
      this.drop = "caret-back"
    }
  }

  count_description(des: string) {
    return des.length
  }

  async loadprovince() {

    // if (this.datapass.province_server.length != 0) {

    //   this.province_list = this.datapass.province_server
    // } else {
      const loader = await this.load.create({
        message: 'ກຳລັງໂຫລດແຂວງ...',

      });
      loader.present();

      this.address.listAllprovince().subscribe(res => {
        this.province_list = res.data
        // this.datapass.province_server = res.data

        loader.dismiss()
      }, async error => {
        console.log('add errror', error);
        loader.dismiss()

        const alert = await this.alt.create({
          header: 'ຜິດພາດ !!',
          message: 'ກະລຸນາເຊື່ອມຕໍ່ເນັດ',
          buttons: ['OK']
        });

        await alert.present();

        this.dismiss();
      })
    // }

  }

  async loaddistrict(e) {

    this.dr_name = ""
    this.vill_name = ""

    console.log("pr_id", this.pr_id);
    this.pr_name = e.target.value.split(",")[1]

    console.log("pr_name", this.pr_name);

    const loader = await this.load.create({
      message: 'ກຳລັງໂຫລດເມືອງ...',

    });
    loader.present();

    const data = {
      pr_id: this.pr_id
    }
    this.address.getDistrict_by_provinceID(data).subscribe(res => {
      this.district_list = res.data
      console.log(res);
      loader.dismiss()


    }, async error => {
      console.log('add errror', error);
      loader.dismiss()

      const alert = await this.alt.create({
        header: 'ຜິດພາດ !!',
        message: 'ກະລຸນາເຊື່ອມຕໍ່ເນັດ',
        buttons: ['OK']
      });

      await alert.present();

      this.dismiss();
    });
  }

  async loadvillage(e) {
    this.dr_name = e.target.value.split(",")[1]
    console.log("pr_name", this.pr_name);


    const loader = await this.load.create({
      message: 'ກຳລັງໂຫລດບ້ານ...',

    });
    loader.present();


    const data = {
      dr_id: this.dr_id
    }
    this.address.getVillage_by_districtID(data).subscribe(res => {
      this.village_list = res.data
      loader.dismiss()

    }, async error => {
      console.log('add errror', error);
      loader.dismiss()

      const alert = await this.alt.create({
        header: 'ຜິດພາດ !!',
        message: 'ກະລຸນາເຊື່ອມຕໍ່ເນັດ',
        buttons: ['OK']
      });

      await alert.present();

      this.dismiss();
    });
  }

  async update() {

    if (this.name == this.data.name && this.phoneNumber == this.data.contact.phoneNumber
      && this.pr_name == this.addressID.province && this.dr_name == this.addressID.district
      && this.vill_name == this.addressID.village) {

      const alert = await this.alt.create({
        header: 'ແຈ້ງເຕືອນ !!',
        message: 'ຍັງບໍ່ໄດ້ມີການແກ້ໄຂຂໍ້ມູນເທື່ອ !',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }


    if (!this.name) {

      const alert = await this.alt.create({
        header: 'ຜິດພາດ !!',
        message: 'ກະລຸນາປ້ອນຊື່ !',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      const loader = await this.load.create({
        message: 'Please wait...',

      });
      loader.present();

      let data = {
        name: this.name,
        // contact: { email: this.email, facebook: this.facebook, whatsapp: this.whatsapp, phoneNumber: this.phoneNumber },
      }

      // let data_of_product={
      //   name:this.skill,
      //   tags:this.product_tags
      // }
      // console.log("yag",this.product_tags);




      this.pro.update_store(data, this.id).subscribe(async res => {
        if (res.status == 1) {
          loader.dismiss()
          console.log("res", res);

          // const alert = await this.alt.create({
          //   header: 'ແຈ້ງເຕືອນ !!',
          //   message: 'ອັບເດດ Profile ສຳເລັດແລ້ວ',
          //   buttons: ['OK']
          // });

          // await alert.present();

          this.reload()


        } else {
          console.log('status', res);
          loader.dismiss()
          const alert = await this.alt.create({
            header: 'ຜິດພາດ !!',
            message: 'ການ ອັບເດດ ມີບັນຫາ',
            buttons: ['OK']
          });
          await alert.present();
        }
      }, async error => {
        console.log('add errror', error);
        loader.dismiss()

        const alert = await this.alt.create({
          header: 'ແຈ້ງເຕືອນ !!',
          message: 'Error',
          buttons: ['OK']
        });

        await alert.present();
      })


      // if(this.pr_name && this.dr_name && this.vill_name){

      let data_of_address = {
        province: this.pr_name,
        district: this.dr_name,
        village: this.vill_name,
      }
      this.pro.update_address(data_of_address, this.addressID.id).subscribe(async res => {
        if (res.status == 1) {
          console.log("res of update address", res);
        } else {
          console.log('status of update address', res);
          const alert = await this.alt.create({
            header: 'ຜິດພາດ !!',
            message: 'ການ ອັບເດດ ມີບັນຫາ',
            buttons: ['OK']
          });
          await alert.present();
        }
      }, async error => {
        console.log('update address errror', error);

        const alert = await this.alt.create({
          header: 'ແຈ້ງເຕືອນ !!',
          message: 'Error',
          buttons: ['OK']
        });

        await alert.present();
      })
    }

  }

  async clear() {
    const alert = await this.alt.create({
      cssClass: 'my-custom-class',
      header: 'ຢືນຢັນ',
      message: 'ຕ້ອງການລ້າງຂໍ້ມູນແທ້ບໍ່ ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.name = ""
            this.phoneNumber = ""
            this.clearVDP()
          }
        }
      ]
    });

    await alert.present();


  }

  
  clearVDP() {
    this.pr_id = ""
    this.pr_name = ""
    this.dr_id = ""
    this.dr_name = ""
    this.vill_name = ""
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
