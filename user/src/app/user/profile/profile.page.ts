import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ProfileService } from 'src/service/profile.service';
import { DatapassService, IDistrict, IProvince, IVillage } from 'src/service/datapass.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public name: string = "";
  public description: string = "";
  public phone: string = "";
  public email: string = "";


  public addressName: string = "";
  public addressphone: string = "";
  public userName: string = "";
  public actiive: number;
  public province_list = Array<IProvince>();
  public district_list = Array<IDistrict>();
  public village_list = Array<IVillage>();
  public pr_id: number = -1
  public dr_id: number = -1
  public pr_name: string = ""
  public dr_name: string = ""
  public vill_name: string = ""

  public address_list: any = [];
  public image = "../../assets/icon/avatar.jpg";

  public Isaction: boolean = true;

  constructor(private rout: Router, private datapass: DatapassService,
    private profile: ProfileService,
    private load: LoadingController,
    private modalCtrl: ModalController,
    private alt: AlertController) { }

  ngOnInit() {
    this.province_list = this.datapass.province_array;
    this.district_list = this.datapass.distirct_array;
    this.village_list = this.datapass.village_array;


    if (localStorage.getItem('profile') != null || localStorage.getItem('profile') != undefined) {

      this.address_list = JSON.parse(localStorage.getItem('profile'));
      this.name = this.address_list[0].name;
      this.phone = this.address_list[0]?.location?.phone;
      this.email = this.address_list[0]?.location?.email;

      console.log(this.address_list);

    } else {
      this.loadaddress();
    }
  }

  async logout() {
    const alert = await this.alt.create({
      cssClass: 'my-custom-class',
      header: 'ຢືນຢັນ',
      message: 'ຕ້ອງການອອກຈາກລະບົບ ?',
      buttons: [
        {
          text: 'ຍົກເລີກ',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'ຕົກລົງ',
          handler: () => {
            this.rout.navigate(['home'])
            localStorage.removeItem('token');
          }
        }
      ]
    });

    await alert.present();
  }


  async loadaddress() {

    localStorage.setItem('skip', '0')

    this.profile.LoadAddress().subscribe(async res => {
      console.log('res of address', res);


      if (res.data.count != 0) {

        localStorage.setItem('profile', JSON.stringify(res.data.rows));
        this.address_list = res.data.rows;
        this.name = res.data.rows[0].name;
        this.phone = res.data.rows[0]?.location?.phone;
        this.email = res.data.rows[0]?.location?.email;
      }

      if (res.data.count == 0) {

        this.create_profile().then(r => {
          console.log("Create!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", r);

          this.profile.LoadAddress().subscribe(res => {
            console.log("load ADDRESS !!!!!!!!!!!!", res);

            localStorage.setItem('profile', JSON.stringify(res.data.rows));

            this.address_list = res.data.rows;


          })
        }).catch(e => {
          console.log(e);

        })


      }

    }), errr => {
      console.log('error', errr);
    };
  }

  async create_profile(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let data_of_address = {
        storeUuid: localStorage.getItem('token')
      }
      this.profile.new_address(data_of_address).subscribe(async res => {
        if (res.status == 1) {
          console.log("res of new address", res);
          resolve(res)
        } else {
          console.log('status of new address', res);

          reject(new Error(res.message));
        }
      }, async error => {
        console.log('add address errror', error);
        reject(error);
      })
    });

  }

  new_address() {

    if (!this.addressphone || !this.addressName || !this.userName) {
      this.alert('ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ'); return;
    }

    let data = {
      province: this.pr_name,
      district: this.dr_name,
      village: this.vill_name,
      location: { phone: this.addressphone, addressname: this.addressName, username: this.userName}
    }
    this.profile.new_address(data).subscribe(async res => {
      if (res.status == 1) {
        console.log("res of new address", res);
        this.loadaddress();
        this.alert('ເພີ່ມສຳເລັດ');
        this.action = 1;

      } else {
        console.log('status of new address', res);

      }
    }, async error => {
      console.log('add address errror', error);
    })
  }


  update_profile() {

    if (!this.name || !this.phone || !this.email) {
      this.alert('ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ'); return;
    }

    let data = {
      name: this.name,
      location: { phone: this.phone, email: this.email, active: 0 }
    }
    this.profile.update_address(data, '1').subscribe(res => {

      if (res.status == 1) {
        console.log("res of new address", res);

        this.loadaddress();
        this.alert('ແກ້ໄຂສຳເລັດ');
        this.Isaction = !this.Isaction;

      } else {
        console.log('status of new address', res);

      }
    }, error => {
      console.log('add address errror', error);
    })

    //change password UserManager
    //...
  }


  update_address() {

    if (!this.id) {
      this.alert('ບໍ່ມີລະຫັດ');
      return;
    }

    if (!this.addressphone || !this.addressName || !this.userName || !this.pr_name || !this.dr_name || !this.vill_name) {
      this.alert('ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ'); return;
    }

    let data = {
      province: this.pr_name,
      district: this.dr_name,
      village: this.vill_name,
      location: { phone: this.addressphone, addressname: this.addressName, username: this.userName}
    }
    this.profile.update_address(data, this.id.toString()).subscribe(res => {

      if (res.status == 1) {
        console.log("res of new address", res);

        this.loadaddress();
        this.alert('ແກ້ໄຂສຳເລັດ');
        this.action = 1;


      } else {
        console.log('status of new address', res);

      }
    }, error => {
      console.log('add address errror', error);
    })

    //change password UserManager
    //...
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////

  public action = 0;
  public title: string = ""
  public id: number;

  getactive(data: any) {
    if (data.isActive == true) {
      return 'danger'
    } else {
      return 'medium'
    }
  }
  async remove(id: number, index: number) {
    console.log(id);

    const alert = await this.alt.create({
      header: 'ແຈ້ງເຕືອນ',
      message: "ທ່ານຕ້ອງການລຶບແທ້ບໍ່ ?",
      buttons: [{
        text: 'ຍົກເລີກ',
        handler: () => {

        }
      }, {
        text: 'ຕົກລົງ',
        handler: () => {
          this.delete(id, index);
        }
      }]
    });

    await alert.present();
  }

  delete(id: number, index: number) {

    this.profile.delete_address(id + '').subscribe(r => {

      if (r.status == 1) {
        console.log("res of del address", r);

        // this.loadaddress();
        this.address_list.splice(index, 1);
        localStorage.setItem('profile', JSON.stringify(this.address_list));
        this.alert('ລຶບສຳເລັດ');

      } else {
        console.log('status of new address', r);

      }

    }, error => {
      console.log('add address errror', error);
    })
  }

  clear() {
    this.pr_name = '';
    this.dr_name = ''
    this.vill_name = '';

    this.pr_id = 0;

    this.addressName = "";
    this.addressphone = "";
    this.userName = "";
  }

  go_add() {
    this.title = "ເພີ່ມທີ່ຢູ່"
    this.action = 2;
    this.clear();
  }
  go_edit(data: any, index: number) {

    console.log(index);

    this.pr_name = this.address_list[index].province;
    this.dr_name = this.address_list[index].district;
    this.vill_name = this.address_list[index].village;

    this.pr_id = this.province_list.find(v => v.pr_name == this.pr_name)?.pr_id;
    this.dr_id = this.district_list.find(v => v.dr_name == this.dr_name)?.dr_id;

    this.id = data.id;

    this.addressName = this.address_list[index].location.addressname;
    this.addressphone = this.address_list[index].location.phone;
    this.userName = this.address_list[index].location.username;


    this.title = "ແກ້ໄຂທີ່ຢູ່"
    this.action = 2;

    console.log(this.pr_name + "-" + this.dr_name + '-' + this.vill_name);
    console.log(this.pr_id + '-' + this.dr_id);


  }

  check(id: number) {
    if (id == 1) {
      return false;
    } else {
      return true;
    }
  }
  limit() {
    if (this.address_list.length < 4) {
      return true;
    }
    return false;
  }

  async changeLo(data: any, index: number) {

    if(data.isActive==true){
      this.alert('ທ່ານເລືອກ '+data.location.addressname+' ເປັນບ່ອນຮັບເຄື່ອງແລ້ວ');
      return;
    }

    const alert = await this.alt.create({
      header: 'ແຈ້ງເຕືອນ',
      message: "ທ່ານຕ້ອງການເລືອກ " + data.location.addressname + " ເປັນບ່ອນຮັບເຄື່ອງແມ່ນບໍ່ ?",
      buttons: [{
        text: 'ຍົກເລີກ',
        handler: () => {

        }
      }, {
        text: 'ຕົກລົງ',
        handler: () => {

          this.ChangeLocation(data.id, index)
        }
      }]
    });

    await alert.present();
  }
  async ChangeLocation(id: number, index: number) {

    const loading = await this.load.create({
      message: 'ກະລຸນາລໍຖ້າ...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.profile.ChangeLocation(id + '').subscribe((response: any) => {

      console.log(response.data);
      if (response.status == 1) {
        this.alert('ການຕັ້ງຄ່າສຳເລັດ');

        this.loadaddress();

      } else {
        this.alert('ປ່ຽນບໍ່ສຳເລັດ');
      }

      loading.dismiss();
    }, async error => {
      console.log('errror', error);
      loading.dismiss()

      this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

    })
  }

  findVillages() {
    return this.village_list.filter(v => v.dr_id == this.dr_id);
  }
  findDistricts() {
    return this.district_list.filter(v => v.pr_id == this.pr_id);
  }

  loaddistrict() {
    this.dr_name = ""
    this.dr_id = -1;

    console.log("pr_id", this.pr_id);
    this.pr_name = this.province_list.find(v => v.pr_id == this.pr_id).pr_name;

    console.log("pr_name", this.pr_name);
    console.log("dr_id", this.dr_id);
  }
  loadvillage() {

    this.vill_name = '';
    this.dr_name = this.district_list.find(v => v.dr_id == this.dr_id)?.dr_name;
    console.log("dr_name", this.dr_name);
  }

  async alert(text: string) {
    const alert = await this.alt.create({
      header: 'ແຈ້ງເຕືອນ',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }
}
