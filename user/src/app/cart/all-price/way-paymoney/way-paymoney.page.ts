import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { DeliveryStoreService } from 'src/app/services/delivery-store.service';

@Component({
  selector: 'app-way-paymoney',
  templateUrl: './way-paymoney.page.html',
  styleUrls: ['./way-paymoney.page.scss'],
})
export class WayPaymoneyPage implements OnInit {

  public deli:any
  @Input() action=''

  // ,private delivery:DeliveryStoreService
  constructor(private madal:ModalController) { 
      // this.deli = this.delivery.delivery;
      }
  close(){
    this.madal.dismiss();
  }
  onClick(item){
    console.log(item);   
    this.action = '3'
  }

  ngOnInit() {
  
  }

}
