import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-confirmcode',
  templateUrl: './confirmcode.page.html',
  styleUrls: ['./confirmcode.page.scss'],
})
export class ConfirmcodePage implements OnInit {

  OTP: any = {
    first: '',
    second: '',
    third: '',
    forth: '',
    fifth: '',
    sixth: ''
  };

  public Code:string;
  @Input() phonenumber: number;


  constructor(private modal:ModalController,private alt:AlertController) { }

  ngOnInit() {
  }

  async otpController(event, next, prev, index) {

    if (index == 1) {
      this.OTP.first = event.target.value;
    } else if (index == 2) {
      this.OTP.second = event.target.value;
    } else if (index == 3) {
      this.OTP.third = event.target.value;
    } else if (index == 4) {
      this.OTP.forth = event.target.value;
    } else if (index == 5) {
      this.OTP.fifth = event.target.value;
    } else if (index == 6) {
      this.OTP.sixth = event.target.value;
    }

    if (index == 6 && this.OTP.first && this.OTP.second && this.OTP.third && this.OTP.forth && this.OTP.fifth && this.OTP.sixth) {
      console.log("submit", this.OTP);
      this.Code=(this.OTP.first + this.OTP.second + this.OTP.third + this.OTP.forth + this.OTP.fifth + this.OTP.sixth).trim();

      this.dismiss();

    }
    if (event.target.value.length < 1 && prev) {
      prev.setFocus()
    }
    else if (next && event.target.value.length > 0) {
      next.setFocus();
    }
    else {
      return 0;
    }
  }

  button_sendOTP(){
    if(this.OTP.first && this.OTP.second && this.OTP.third && this.OTP.forth && this.OTP.fifth && this.OTP.sixth){
      
      this.Code=(this.OTP.first + this.OTP.second + this.OTP.third + this.OTP.forth + this.OTP.fifth + this.OTP.sixth).trim();

      this.dismiss();
    }else{
      this.alert('ກະລຸນາໃສ່ລະຫັດໃຫ້ຄົບ');
    }
  }

  dismiss() {
    if(this.Code){
      this.modal.dismiss({
        'code': this.Code
      });
    }else{

    }
  
  }

  async alert(text: string) {
    const alert = await this.alt.create({
      header: 'ແຈ້ງເຕືອນ',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }

  backToSignUp() {

    this.modal.dismiss({
      'dismiss': true
    });
    
  }
  // backToSignUp() {
  //   this.human=false;
  //   this.OTP= {
  //     first: '',
  //     second: '',
  //     third: '',
  //     forth: '',
  //     fifth: '',
  //     sixth: ''
  //   };
  //   this.action = 2
  //   setTimeout(() => {
  //     this.getAuthOTP();
  //   }, 500);
  // }

}
