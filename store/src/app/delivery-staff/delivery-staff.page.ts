import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-delivery-staff',
  templateUrl: './delivery-staff.page.html',
  styleUrls: ['./delivery-staff.page.scss'],
})
export class DeliveryStaffPage implements OnInit {

  public my_biker: Array<any> = [];

  public biker: any;

  data = [{ name: 'a' }, { name: 'b' }, { name: 'c' },];

  constructor(private alrt: AlertController) { }

  ngOnInit() {
    this.my_biker = this.data.map(v => v.name);
  }

  add() {
    if (!this.biker) {
      return;
    }
    this.my_biker = this.my_biker.concat(this.biker)
    console.log("biker", this.my_biker);
  }

  async delete(i: any) {

    const alert = await this.alrt.create({
      message: 'Are you sure ?',
      buttons: [
        {
          text: 'No',
          handler: () => {

          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.my_biker.splice(this.my_biker.indexOf(i), 1)
            console.log("biker", this.my_biker);
          }
        }
      ]
    });

    await alert.present();




  }
}
