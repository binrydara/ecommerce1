import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/service/auth.service';
// import { v4 } from 'uuid';
// import * as getUuid from 'uuid-by-string'

import { initializeApp } from 'firebase/app';
import { FBConfig } from 'src/environments/environment';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { ConfirmcodePage } from 'src/app/confirmcode/confirmcode.page';

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

  fake = 'a7b5f065-61a9-4f4f-919b-c88c033f848e';

  // phone is 95264424
  // pwd is 123456

  public inputName: string = "";
  public inputUsername: string = "";
  public verifyer: RecaptchaVerifier;
  public auth: any
  public human: boolean = false;
  app = initializeApp(FBConfig);

  constructor(private rout: Router,
    private load: LoadingController,
    private alt: AlertController,
    private modalCtrl: ModalController,
    private authService: AuthService) { }

  // this.human=false;
  // setTimeout(() => {
  //   this.getAuthOTP();
  // }, 500);
  ngOnInit() {

  }
  ngAfterViewInit() {
    // this.getAuthOTP();
  }

  // if (this.modal == false) {
  //   // this.rout.navigateByUrl('tabs');

  //   // check OTP
  //   this.send_code();
  //   // get signup on server....
  //   // alert signup fail of pass

  //   // this.action = 1



  // } else {
  //   this.alert('ເຂົ້າສູ່ລະບົບສຳເລັດ');
  //   this.dismiss();
  // }

  async getAuthOTP() {
    try {

      const loader = await this.load.create({
        message: 'ກະລຸນາລໍຖ້າ...',

      });
      loader.present();


      this.auth = getAuth(this.app);
      // console.log(this.auth);
      this.auth.languageCode = 'lo';

      this.verifyer = new RecaptchaVerifier('recaptcha',
        {
          'size': 'normal',
          'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log(response);
            this.human = true;
          }
        },
        this.auth);
      this.verifyer.render().then(r => {
        loader.dismiss();
        console.log(r);

      }).catch(e => {
        console.log(e);
        this.alert('ກະລຸນາກວດສອບສັນຍານອິນເຕີເນັດຂອງທ່ານ ແລ້ວລອງໃໝ່ອີກຄັ້ງ');
        loader.dismiss();
        this.action = 1;


      })
    } catch (error) {
      console.error(error);
      this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ ກະລຸນາລອງໃໝ່ອີກຄັ້ງ');
      this.action = 1;

    }


  }
  async comfrim(phonenumber: string): Promise<any> {

    const modal = await this.modalCtrl.create({
      component: ConfirmcodePage,
      cssClass: 'my-custom-class',
      componentProps: {
        'phonenumber': phonenumber,
      }
    });
    await modal.present();

    return new Promise((resolve, reject) => {

      modal.onWillDismiss().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })


    });


  }
  send_code() {
    let that = this

    console.log(this.auth + ".." + this.phonenumber + ".." + this.verifyer);

    signInWithPhoneNumber(this.auth, "+85620" + this.phonenumber, this.verifyer)
      .then(async (confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // window.confirmationResult = confirmationResult;
        console.log('s', confirmationResult);

        // const code: string = (this.OTP.first + this.OTP.second + this.OTP.third + this.OTP.forth + this.OTP.fifth + this.OTP.sixth).trim();


        // console.log(code);

        const code = await this.comfrim("+85620" + this.phonenumber)
        console.log(code.data.code);
        if (!code.data.code) {
          console.log("not");

          this.human = false;
          return;
        }


        console.log("pass");


        confirmationResult.confirm(code.data.code).then(r => {
          r.user.getIdToken().then(res => {
            that.register(res);
            console.log('res', res);

          }, errr => {
            console.log('err', errr);

          })

        }, err => {
          // this.presentAlert(' ລະຫັດຢັງຢືນຕົວຕົນບໍ່ຖືກຕ້ອງ ')
          console.log('err', err);
          this.alert('ລະຫັດຢັງຢືນຕົວຕົນບໍ່ຖືກຕ້ອງ');
          this.human = false;

        })


      }).catch((error) => {
        // Error; SMS not sent
        // ...too-many-requests
        console.log('erer', error);
        this.alert('ບໍ່ມີເບີໂທ +85620' + this.phonenumber + ' ' + 'ໃນລະບົບ');
        // this.get_signup();
        this.human = false;



      });
  }
  async register(googleToken: string) {

    const data = {
      name: "+85620" + this.phonenumber,
      phoneNumber: "+85620" + this.phonenumber,
      username: "+85620" + this.phonenumber,
      password: this.password,
      googleToken: googleToken
    }


    const loading = await this.load.create({
      cssClass: 'my-custom-class',
      message: 'ກະລຸນາລໍຖ້າ...',
    });
    await loading.present();


    this.authService.register(data).subscribe(async res => {
      console.log(res);

      if (res.status == 1) {
        console.log('register success!!!!!!!!!!!!!', res);
        loading.dismiss()

        this.alert('ການລົງທະບຽນສຳເລັດແລ້ວ');

        this.action = 1

        this.cancel()


      } else {
        console.log('cant register', res);
        loading.dismiss()

        this.alert('ການລົງທະບຽນບໍ່ສຳເລັດ');
      }
    }, async error => {
      console.log('errror', error);

      this.alert('ເກີດບັນຫາບາງຢ່າງ');

      loading.dismiss()
    })

  }
  async login() {

    if (!this.phonenumber || !this.password) {
      this.alert('ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ');

    } else {
      const loader = await this.load.create({
        message: 'ກະລຸນາລໍຖ້າ...',

      });
      loader.present();

      let data = {
        phonenumber: '+85620' + this.phonenumber + '',
        password: this.password
      }
      this.authService.login(data).subscribe(async res => {
        if (res.status == 1) {
          console.log('login success!!!!!!!!!!!!!', res);
          loader.dismiss()


          this.alert('ເຂົ້າສູ່ລະບົບສຳເລັດ');

          console.log("login success", res);


          // localStorage.setItem('token', res.data.uuid);

          if (this.modal == false) {
            localStorage.setItem('token', res.data.uuid);
            this.get_login();
          } else {
            localStorage.setItem('token', res.data.uuid);
            this.reload();
          }


        } else {
          console.log('cant login', res);


          loader.dismiss()
          this.alert('ກະລຸນາກວດສອບ ຊື່ ແລະ ລະຫັດຜ່ານຄືນໃໝ່');

        }
      }, async error => {
        console.log('errror', error);
        loader.dismiss()

        this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

      })
    }
  }

  get_login() {
    this.rout.navigateByUrl('home');
  }
  get_signup() {
    this.action = 2;
    console.log("sdsd");

    setTimeout(() => {
      this.getAuthOTP();
    }, 100);

    console.log("dsds");

  }
  signup() {

    console.log(this.human);

    let x = this.phonenumber;

    if (!this.phonenumber || !this.password || !this.repeatpassword) {
      this.alert('ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ !');
      return;
    }

    if (this.password != this.repeatpassword) {
      this.alert('ລະຫັດທີ່ປ້ອນບໍ່ຕົງກັນ !');
      return;
    }

    if (this.human == false) {
      this.alert('ກະລຸນຢືນຢັນຕົວຕົນກ່ອນ !');
      return;
    }

    if ((x.charAt(0) == '2' && x.charAt(1) != '0') || x.charAt(0) == '5' || x.charAt(0) == '7' || x.charAt(0) == '6'
      || x.charAt(0) == '9') {
      // this.action = 3
      this.send_code();
    } else {
      this.alert('ເບີໂທບໍ່ຖືກຕ້ອງ !');
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
  getcolor() {
    if (this.phonenumber.length < 8) {
      return 'medium'
    } else {
      return 'primary'
    }
  }
  back() {
    this.cancel();
    this.action = 1
  }



  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true,
    });
  }
  reload() {
    this.modalCtrl.dismiss({
      'reload': true,
    });
  }



  cancel() {
    this.name = "";
    this.phonenumber = "";
    this.username = "";
    this.password = "";
    this.repeatpassword = ""
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
