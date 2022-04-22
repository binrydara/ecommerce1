import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProfileService } from 'src/service/profile.service';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/service/auth.service';
// import { v4 } from 'uuid';
// import * as getUuid from 'uuid-by-string'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @Input() modal = false;
  public name: string = "";
  public phonenumber: string = "";
  public username: string = "";
  public password: String = "";
  public repeatpassword: String = "";
  public hide: string;
  public uuid: string;
  public action: number = 1;

  // logo="../../../assets/icon/job99.png"

  constructor(private rout: Router,
    private profile: ProfileService,
    private load: LoadingController,
    private alt: AlertController,
    private modalCtrl: ModalController,
    private auth: AuthService) { }

  ngOnInit() {
  }

  next(){
    let x = this.phonenumber;

    if((x.charAt(0)=='2' && x.charAt(1) !='0') || x.charAt(0)=='5' || x.charAt(0)=='7' || x.charAt(0)=='6'
    || x.charAt(0)=='9'){
      this.action = 2
    }
  }
  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;

    if (charCode == 32 || (48 <= charCode && charCode <= 57)) { //backspace and number only
      return true;
    } else {
      return false;
    }
  }
  getcolor(){
    if(this.phonenumber.length < 8){
      return 'medium'
    }else{
      return 'primary'
    }
  }
  OTP: any =  {
    first: '',
    second: '',
    third: '',
    forth: '',
    fifth: '',
    sixth: ''
  };

  async otpController(event,next,prev, index){

    if(index==1){
      this.OTP.first=event.target.value;
    }else if(index==2){
      this.OTP.second=event.target.value;
    }else if(index==3){
      this.OTP.third=event.target.value;
    }else if(index==4){
      this.OTP.forth=event.target.value;
    }else if(index==5){
      this.OTP.fifth=event.target.value;
    }else if(index==6){
      this.OTP.sixth=event.target.value;
    }

      if(index == 6 && this.OTP.first && this.OTP.second && this.OTP.third && this.OTP.forth && this.OTP.fifth && this.OTP.sixth) {
        console.log("submit",this.OTP);
        localStorage.setItem('token','11111');
        if (this.modal == false) {
          this.rout.navigateByUrl('tabs');

        }else{
          const alert = await this.alt.create({
            header: 'ສະຖານະ',
            message: 'ເຂົ້າສູ່ລະບົບສຳເລັດ',
            buttons: ['OK']
          });

          await alert.present();
          this.dismiss();
        }
        
      }
      if(event.target.value.length < 1 && prev){
        prev.setFocus()
      }
      else if(next && event.target.value.length>0){
        next.setFocus();
      }
      else {
       return 0;
      } 
   }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true,
    });
  }

  sign() {
    this.cancel()
    return this.action = 2
  }

  async login() {
    if (!this.username || !this.password) {
      const alert = await this.alt.create({
        header: 'ຜິດພາດ !!',
        message: 'ກະລຸນາປ້ອມຂໍ້ມູນໃຫ້ຄົບ',
        buttons: ['OK']
      });

      await alert.present();
      // localStorage.removeItem('token');
      // localStorage.removeItem('ownerUuid');
    } else {
      const loader = await this.load.create({
        message: 'Please wait...',

      });
      loader.present();

      let data = {
        object: "authorize",
        method: "login",
        data: {
          username: this.username,
          password: this.password,
        }
      }
      this.auth.login(data).subscribe(async res => {
        if (res.status == 1) {
          console.log('login success!!!!!!!!!!!!!', res);
          loader.dismiss()

          let token = res.data.user.username.trim() + res.data.user.phoneNumber.toString().trim()

          // const uuidV5Hash = getUuid(token, 5)

          // if (uuidV5Hash) {
          //   localStorage.setItem('token', uuidV5Hash);

          //   this.create_profile();
          //   // 2139be9e-33b4-556d-ab9d-d91560421906
          // }

        } else {
          console.log('cant login', res);


          loader.dismiss()
          const alert = await this.alt.create({
            header: 'ຜິດພາດ !!',
            message: 'ກະລຸນາກວດສອບ ຊື່ ແລະ ລະຫັດຜ່ານຄືນໃໝ່',
            buttons: ['OK']
          });

          await alert.present();

        }
      }, error => {
        console.log('errror', error);
        loader.dismiss()
      })
    }
  }

  async signup() {
    if (!this.username || !this.password || !this.phonenumber || !this.name || !this.repeatpassword) {
      const alert = await this.alt.create({
        header: 'ຜິດພາດ !!',
        message: 'ກະລຸນາປ້ອມຂໍ້ມູນໃຫ້ຄົບ',
        buttons: ['OK']
      });

      await alert.present();

    } else if (this.password != this.repeatpassword) {
      const alert = await this.alt.create({
        header: 'ຜິດພາດ !!',
        message: 'ລະຫັດທີ່ປ້ອນຄືນບໍ່ຕົງກັນ !',
        buttons: ['OK']
      });

      await alert.present();
    } else {

      let data = {
        object: "user",
        method: "register",
        data: {
          name: this.name,
          phoneNumber: this.phonenumber.toString(),
          username: this.username,
          password: this.password,
          service: "chat"
        }
      }

      const loader = await this.load.create({
        message: 'Please wait...',

      });
      loader.present();

      this.auth.register(data).subscribe(async res => {
        if (res.status == 1) {
          console.log('register success!!!!!!!!!!!!!', res);
          loader.dismiss()
        
          const alert = await this.alt.create({
            header: 'ສະຖານະ',
            message: 'ການລົງທະບຽນສຳເລັດແລ້ວ',
            buttons: ['OK']
          });

          await alert.present();

          this.action = 1

          this.cancel()


        } else {
          console.log('cant register', res);
          loader.dismiss()
        }
      }, error => {
        console.log('errror', error);
        loader.dismiss()
      })
    }
  }

  async create_profile() {
    console.log("test");

    let data = {
      name: this.username,
    }

    this.profile.new_profile(data).subscribe(async res => {
      if (res.status == 1) {
        console.log('create profile success!!!!!!!!!!!!!', res);
        
        if (this.modal == false) {
          this.rout.navigate(['/tabs/home'])

        }else{
          const alert = await this.alt.create({
            header: 'ສະຖານະ',
            message: 'ເຂົ້າສູ່ລະບົບສຳເລັດ',
            buttons: ['OK']
          });

          await alert.present();
          this.dismiss();
        }

      } else {
        console.log('cant cerate profile', res);

        if (this.modal == false) {
          this.rout.navigate(['/tabs/home'])

        }else{
          const alert = await this.alt.create({
            header: 'ສະຖານະ',
            message: 'ເຂົ້າສູ່ລະບົບສຳເລັດ',
            buttons: ['OK']
          });

          await alert.present();
          this.dismiss();

        }
      }
    }, error => {
      console.log('errror', error);
    })
  }

  cancel() {
    this.name = "";
    this.phonenumber = "";
    this.username = "";
    this.password = "";
    this.repeatpassword = ""
  }
}
