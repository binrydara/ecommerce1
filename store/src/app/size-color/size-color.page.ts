import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-size-color',
  templateUrl: './size-color.page.html',
  styleUrls: ['./size-color.page.scss'],
})
export class SizeColorPage implements OnInit {

  // @Input() selectArray=[];
  @Input() item: Array<any> = []
  @Input() item_size: Array<any> = []
  public selectArray: Array<any> = []
  @Input() action:number=0;
  color_list=['ແດງ','ດຳ','ຂາວ','ເຫລືອງ','ຟ້າ','ບົວ']
  size_list=['XXL','XL','L','M','S',]

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    // this.selectArray=this.item  this not work
    if(this.action==1){
      this.selectArray=JSON.parse(JSON.stringify(this.item)); //set new item on memmory it work
    }else{
      this.selectArray=JSON.parse(JSON.stringify(this.item_size)); //set new item on memmory it work
    }
    
  }

  async selectCheckBox(e, i: string) {
    e = e || window.event;
    const el = e.srcElement as HTMLIonCheckboxElement;
    if (el.checked) {
      this.selectArray.push(i);
    } else {

      const index = this.selectArray.findIndex(v => v == i);
      if (index > -1) this.selectArray.splice(index, 1);
      
    }
    console.log(this.selectArray);

  }

  getcheck(name: string) {


    if (this.item.length == 0) {
      return false
    } else {

      try {
        return this.item.includes(name);
      } catch (error) {
        return false;
      }
    }

  }

  getcheck_size(name: string) {


    if (this.item_size.length == 0) {
      return false
    } else {

      try {
        return this.item_size.includes(name);
      } catch (error) {
        return false;
      }
    }

  }

  dismiss() {
   
    this.modalCtrl.dismiss({
      'dismissed': true,
      "Isnull":true
    });
  }

  send_color() {

    this.modalCtrl.dismiss({
      'dismissed': true,
      'color': this.selectArray
    });

  }
  send_size() {

    this.modalCtrl.dismiss({
      'dismissed': true,
      'size': this.selectArray
    });

  }
}
