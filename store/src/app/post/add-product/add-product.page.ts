import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { ProfileService } from 'src/service/profile.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  public primary_code='';

  constructor(private alrt:AlertController,private nav:NavController,private load:LoadingController,
    private profile:ProfileService,private modal:ModalController) { }

  ngOnInit() {

    if(this.action=='secondary'){

      this.primary_code=localStorage.getItem('primary_code');
      this.loadProductByProductCode();
    }else{

      this.loadProduct();
    }
      

    if(this.action=='addon'){

      this.productuuids=JSON.parse(JSON.stringify(this.addon_id));
      
    }else{
      this.productuuids=JSON.parse(JSON.stringify(this.secondary_id));
    }
    this.proName=this.primary_id;

    console.log(this.primary_id);
    

    // if(this.action=='primary'){
    //   this.action='primary'
    // }else{
    //   this.action='secondary'
    // }
  }

  @Input() user_data:any;
  public product_list=Array<any>();
  @Input() action='';
  public proName='';
  @Input() secondary_id:any=[];
  @Input() addon_id:any=[];
  @Input() primary_id:string="";
  public productuuids: Array<any> = []
  public primaryProduct:any=[];

  checkprInsec(id:string){

    if(id==this.primary_id){
      return false;
    }

    return true;
  }
  dismiss() {

    this.modal.dismiss({
      'dismissed': true
    });
  }

  getprodata(data:any){

    this.primaryProduct=data;
    this.primary_code=data.productCode;
    localStorage.setItem('primary_code',this.primary_code);
    console.log(this.primary_code);
    
  }

  send(){

    if(this.action=='primary'){
      this.modal.dismiss({
        'dismissed': true,
        'primary':this.primaryProduct
      });
    }else if(this.action=='secondary'){
      this.modal.dismiss({
        'dismissed': true,
        'secondary':this.productuuids
      });
    }else{
      this.modal.dismiss({
        'dismissed': true,
        'addon':this.productuuids
      });
    }
  }  
 
  
  async loadProduct(){

    const loading = await this.load.create({
      message: 'ກະລຸນາລໍຖ້າ...',
      spinner: 'bubbles',
    });
    await loading.present();

    let data={
      storeType:this.user_data.storeType,
      storeUuid:this.user_data.uuid,
    }

    this.profile.Selectmany_active(data).subscribe((response: any) => {

      // this.data = response.data;
      this.product_list = response.data;
      console.log(response.data);

      // localStorage.setItem('item_3product',JSON.stringify(this.product_list));

      loading.dismiss();

    }, async error => {
      console.log('errror', error);
      loading.dismiss()

      this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

    })
  }
  async loadProductByProductCode(){

    const loading = await this.load.create({
      message: 'ກະລຸນາລໍຖ້າ...',
      spinner: 'bubbles',
    });
    await loading.present();

    let data={
      storeType:this.user_data.storeType,
      storeUuid:this.user_data.uuid,
      productCode:this.primary_code
    }

    this.profile.Selectmany_active_byProductCode(data).subscribe((response: any) => {

      // this.data = response.data;
      this.product_list = response.data;
      console.log(response.data);

      // localStorage.setItem('item_3product',JSON.stringify(this.product_list));

      loading.dismiss();

    }, async error => {
      console.log('errror', error);
      loading.dismiss()

      this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

    })
  }

  getcolor_size(i:any){
    if(!i.moreDetail){
      return ''
    }
    if(!i.moreDetail.prop){
      return ''
    }
    
    if(i.moreDetail.prop.length ==1){

      let prop1=i.moreDetail.prop[0];

      if(prop1=='colors'){
        prop1='ສີ';
      }
      if(prop1=='sizes'){
        prop1='ຂະໜາດ';

      }
      return prop1+" : "+i.moreDetail.data

    }else if(i.moreDetail.prop.length ==2){ 

      let prop1=i.moreDetail.prop[0];
      let prop2=i.moreDetail.prop[1];

      if(prop1=='colors'){
        prop1='ສີ';
      }
      if(prop2=='sizes'){
        prop2='ຂະໜາດ';

      }
      return prop1+" : "+i.moreDetail.data[0]+" , "+prop2+" : "+i.moreDetail.data[1]

    }else{
      return ''
    }
  }
  getcheck(uuid: string) {


    if (this.productuuids.length == 0) {
      return false
    } else {

      try {
        return this.productuuids.includes(uuid);
      } catch (error) {
        return false;
      }
    }
  }
  async selectCheckBox(e, i: string) {
    e = e || window.event;
    const el = e.srcElement as HTMLIonCheckboxElement;
    if (el.checked) {
      // if (this.selectArray.length == 3) {
      //   const alert = await this.alrt.create({
      //     header: 'ແຈ້ງເຕືອນ !!',
      //     message: 'ເພີ່ມໄດ້ສູງສຸດ 3 ປະເພດ !',
      //     buttons: ['OK']
      //   });

      //   await alert.present();
      //   return el.checked = false;
      // }
      this.productuuids.push(i);
    } else {

      const index = this.productuuids.findIndex(v => v == i);
      if (index > -1) this.productuuids.splice(index, 1);
      // console.log('INDEX',index);

      if (this.productuuids.length == 0) {
        console.log("yes");

      }
    }
    console.log(this.productuuids);

  }

  async alert(text: string) {
    const alert = await this.alrt.create({
      header: 'ແຈ້ງເຕືອນ',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }
}
