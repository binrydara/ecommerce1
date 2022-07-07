import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ProfileService } from 'src/service/profile.service';
import { DatapassService, IDistrict, IProvince, IVillage } from 'src/service/datapass.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public storeType: string = '';
  action: number = 1;
  public my_store = Array<any>();

  public province_list = Array<IProvince>();
  public district_list = Array<IDistrict>();
  public village_list = Array<IVillage>();

  public pr_id: number = -1
  public dr_id: number = -1
  public pr_name: string = ""
  public dr_name: string = ""
  public vill_name: string = ""

  constructor(private alrt: AlertController, private rout: Router, private profile: ProfileService, private load: LoadingController, private datapass: DatapassService) { }

  ngOnInit() {

    
  }

  ionViewWillEnter(){
    this.province_list = this.datapass.province_array;
    this.district_list = this.datapass.distirct_array;
    this.village_list = this.datapass.village_array;

    // console.log(this.province_list);
    // console.log(this.district_list);
    // console.log(this.village_list);

    this.my_store=[];
    if (!localStorage.getItem('token')) {
      this.rout.navigateByUrl('auth')
      return;
    }


    console.log(JSON.parse(localStorage.getItem('all_store')));
    if (!localStorage.getItem('all_store') || localStorage.getItem('all_store') == 'null') {
      this.loadgprofile();
    }
    else {
      this.my_store = JSON.parse(localStorage.getItem('all_store'));
    }
  }

  findVillages() {
    return this.village_list.filter(v => v.dr_id == this.dr_id);
  }
  findDistricts() {
    return this.district_list.filter(v => v.pr_id == this.pr_id);
  }

  loaddistrict(e) {
    this.dr_name = ""
    this.dr_id = -1;

    console.log("pr_id", this.pr_id);
    this.pr_name = this.province_list.find(v => v.pr_id == this.pr_id).pr_name;

    console.log("pr_name", this.pr_name);
    console.log("dr_id", this.dr_id);
  }
  loadvillage(e) {

    this.vill_name = '';
    this.dr_name = this.district_list.find(v => v.dr_id == this.dr_id)?.dr_name;
    console.log("dr_name", this.dr_name);
  }

  home(index: number) {
    localStorage.setItem('user_3apps', JSON.stringify(this.my_store[index]))
    console.log(index);

    this.rout.navigateByUrl('/home');
  }
  new(data: any) {
    console.log(data);
    console.log(this.pr_name + this.dr_name + this.vill_name);

    // if (this.my_store.length > 0) {
    //   this.alert('ຂໍອະໄພ ລະບົບອານຸຍາດໃຫ້ສ້າງຟຣີພຽງຮ້ານດຽວເທົ່ານັ້ນ');
    //   return;
    // }
    if (!data.storeType) {
      this.alert('ກະລຸນາເລືອກປະເພດຮ້ານ');
      return;
    }
    if (!data.name || !data.phone || !this.pr_name || !this.dr_name || !this.vill_name) {
      this.alert('ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ');
      return;
    }

    let senddata = {
      name: data.name,
      storeType: data.storeType,
      more_detail: { phonenumber: data.phone, province: this.pr_name, district: this.dr_name, village: this.vill_name },
      rangefee: [],
      packagefee: [],
      paymentMethodUuid: [],
      shipmentMethodUuid: []
    }

    this.profile.new_profile(senddata).subscribe(async res => {
      if (res.status == 1) {
        console.log('create profile success!!!!!!!!!!!!!', res);
        this.alert('ຮ້ານຂອງທ່ານໄດ້ຖືກເພີ່ມເຂົ້າໃນລະບົບສຳເລັດແລ້ວ ທາງເຮົາຈະຕິດຕໍ່ກັບໃນໄວໆນີ້');
        this.loadgprofile();
      } else {
        console.log('cant cerate profile', res);
        this.alert('ການດຳເນີນງານບໍ່ສຳເລັດ');

      }

      this.action = 1;
    }, error => {
      console.log('errror', error);
      this.alert('ເກີດຂໍ້ຜິດພາດ ກະລຸນາລອງໃໝ່ພາຍຫຼັງ');
      this.action = 1;
    })
  }

  async loadgprofile() {


    const loader = await this.load.create({
      message: 'ກຳລັງໂຫລດຂໍ້ມູນ...',

    });
    loader.present();

    this.profile.selmany().subscribe(res => {
      console.log('res of many gstore', res);

      if (res.status == 1) {

        if (res.data.count > 0) {
          this.my_store = res.data.rows;
          localStorage.setItem('all_store', JSON.stringify(this.my_store))
          loader.dismiss()

        }else{
          this.my_store=[];
        }
        loader.dismiss()

      } else {
        loader.dismiss()

      }
      // if (Object.keys(res.data).length != 0) {

      //   this.id = res.data.id
      //   this.name = res.data.name
      //   this.description = res.data.description
      //   this.tags = res.data.tags
      //   this.contact = res.data.contact
      //   this.data_forUpdate = res.data

      //   // this.data.userdata = res.data;

      // }


    }), errr => {
      console.log('error', errr);
      loader.dismiss()
    };
  }

  async alert(text: string) {
    const alert = await this.alrt.create({
      header: 'ແຈ້ງເຕືອນ',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }


  logout(){
    localStorage.removeItem('user_3apps');
    localStorage.removeItem('all_store');
    // localStorage.removeItem('token');
    this.rout.navigateByUrl('auth');
  }
}
