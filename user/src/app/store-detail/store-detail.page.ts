import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.page.html',
  styleUrls: ['./store-detail.page.scss'],
})
export class StoreDetailPage implements OnInit {

  public selectTabs:string="seg1";
  public sortBy:string="ໃໝ່ລ່າສຸດ";
  public fill1:string="clear";
  public fill2:string="solid";
  public fill3:string="clear";
  public searh:string="";
  
  // checkScreen() {
  //   let innerWidth = window.innerWidth;
  //   switch (true) {
  //     case 0 <= innerWidth && innerWidth <= 350:
  //       return 1;
  //     case 351 <= innerWidth && innerWidth <= 534:
  //       return 2;
  //     case 535 <= innerWidth && innerWidth <= 724:
  //       return 3;
  //     case 725 <= innerWidth && innerWidth <= 939:
  //       return 4;
  //     case 940 <= innerWidth && innerWidth <= 1234:
  //       return 4;
  //     case 1235 <= innerWidth:
  //       return 5;
  //   }
  // }
  
  
    constructor(private rout:Router,private platform: Platform,private actionsheet:ActionSheetController) { 
      
      // this.platform.resize.subscribe(async () => {
      //   this.slideOptscategory = {
      //       initialSlide: 1,
      //       slidesPerView: this.checkScreen(),
      //       speed: 600,
      //       slideShadows: true,
      //       // spaceBetween: this.spaceBetween
      //     };
        
      //   });
      }
    
  
      // slideOptscategory = {
      //     initialSlide: 1,
      //     slidesPerView: this.checkScreen(),
      //     speed: 600,
      //     slideShadows: true,
      //     // spaceBetween: this.spaceBetween
      //   };

      slideOptscategory = {
          freeMode: true,
          slidesPerView: 2,
          slidesOffsetBefore: 1,
          freeModeSticky: true,
          spaceBetween: 5,
          breakpoints:{
            0:{
              slidesPerView:1,
             spaceBetween:5,
            },
            351:{
              slidesPerView:2,
             spaceBetween:5,
            },
            500:{
              slidesPerView:2,
             spaceBetween:-100,
            },
            535:{
            slidesPerView:3,
           spaceBetween:5,
          },
          720:{
            slidesPerView:4,
           spaceBetween:5,
          },
          930:{
            slidesPerView:5,
           spaceBetween:5,
          },
          992:{
            slidesPerView:4,
           spaceBetween:5,
          },
          1250:{
            slidesPerView:5,
           spaceBetween:5,
          }
          ,
          1570:{
            slidesPerView:6,
           spaceBetween:5,
          }
          ,
          1770:{
            slidesPerView:7,
           spaceBetween:5,
          }
          },
        }
  ngOnInit() {
  }

  public img:string="../../assets/icon/";

  data=[{name:'ເສື້ອຜ້າແຟຊັ່ນຜູ້ຊາຍ',pic:this.img+'male.jpg'},{name:'ເສື້ອຜ້າແຟຊັ່ນຜູ້ຍິງ',pic:this.img+'female.jpg'},{name:'ໂທລະສັບແລະອຸປະກອນເສີມ',pic:this.img+'phone.jpg'},{name:'ຄວາມງາມແລະຂອງໃຊ້ສ່ວນຕົວ',pic:this.img+'makeup.jpg'}
 ,{name:'ອາຫານເສີມແລະຜະລິດຕະພັນສຸຂະພາບ',pic:this.img+'help.jpg'},{name:'ຂອງຫຼິ້ນສິນຄ້າແມ່ແລະເດັກ',pic:this.img+'toys.jpg'},{name:'ໂມງແລະແວ່ນຕາ',pic:this.img+'watch.jpg'},{name:"ເຄື່ອງໃຊ້ໃນບ້ານ",pic:this.img+'house.jpg'},{name:"ເກີບຜູ້ຊາຍ",pic:this.img+'shoe_male.jpg'},{name:"ເກີບຜູ້ຍິງ",pic:this.img+'shoe_female.jpg'}
 ,{name:"ອາຫານແລະເຄື່ອງດື່ມ",pic:this.img+'food.jpg'},{name:"ເຄື່ອງປະດັບ",pic:this.img+'jew.jpg'},{name:"ເຄື່ອງໃຊ້ໄຟຟ້າໃນບ້ານ",pic:this.img+'electric.jpg'},{name:"ອຸປະກອນການຮຽນ",pic:this.img+'learn.jpg'},{name:"ອຸປະກອນກິລາ",pic:this.img+'sport.jpg'}
 ,{name:"ອຸປະກອນການຊ່າງ",pic:this.img+'fix.png'}]
 
 detail(data:any){
  
  this.rout.navigate(['product-detail'],{queryParams:{data:JSON.stringify(data)}})
  // this.rout.navigate(['product-detail'],{queryParams:{name:data.name,pic:data.pic}})
}

  see_all(name:string){
    this.searh=name;
    this.selectTabs='seg2';
  }
  sort(action:number,price:number){
    if(action ==1){
      this.sortBy='ຄວາມນິຍົມສູງ';
      this.fill1='solid'
      this.fill2='clear'
      this.fill3='clear'
    }else if(action ==2){
      this.sortBy='ໃໝ່ລ່າສຸດ';
      this.fill1='clear'
      this.fill2='solid'
      this.fill3='clear'
    }else if(action==3){
      if(price==1){
        this.sortBy='ລາຄາ ຫຼາຍ ຫາ ໜ້ອຍ';
      }else{
        this.sortBy='ລາຄາ ໜ້ອຍ ຫາ ຫຼາຍ';
      }
      this.fill1='clear'
      this.fill2='clear'
      this.fill3='solid'
    }
  }
  async action_price(){
    const action=await this.actionsheet.create({
      header:'ຕາມລາຄາ ?',
      buttons:[{
        text:'ຫຼາຍ ຫາ ໜ້ອຍ',
        handler:()=>{
          this.sort(3,1);
        }
      },
      {
        text:'ໜ້ອຍ ຫາ ຫຼາຍ',
        handler:()=>{
          this.sort(3,2);
        }
      }
    ]
    });
    await action.present();
  }

}
