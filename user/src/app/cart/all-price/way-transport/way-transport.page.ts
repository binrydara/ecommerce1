import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { DeliveryStoreService } from 'src/app/services/delivery-store.service';

@Component({
  selector: 'app-way-transport',
  templateUrl: './way-transport.page.html',
  styleUrls: ['./way-transport.page.scss'],
})
export class WayTransportPage implements OnInit {

  public deli:any
  @Input() action=''

  // ,private delivery:DeliveryStoreService
  constructor(private madal1:ModalController) { 
      // this.deli = this.delivery.delivery;
      }
  close(){
    this.madal1.dismiss();
  }
  onClick(item){
    console.log(item);   
    this.action = '3'
  }

  ngOnInit() {
  
  }

}
