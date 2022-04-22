import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    // slideOptscategory = {
  //   freeMod: true,
  //   slidesOffsetBefore: 1,
  //   spaceBetween: -15,
  //   loop: false,
  // };
  // slideOptscategory = {
  //   initialSlide:3,
  //   spaceBetween:0,
  //   slidesPerView:0,
  //   slidesOffsetBefore:5
  // };
  // slideOptitem = {
  //   freeMode: true,
  //   slidesPerView: 4,
  //   slidesOffsetBefore: 1,
  //   spaceBetween: -15,
  //   slideShadows: true,

  // }

  public img:string="../../assets/icon/";

  data=[{name:'ເສື້ອຜ້າແຟຊັ່ນຜູ້ຊາຍ',pic:this.img+'male.jpg'},{name:'ເສື້ອຜ້າແຟຊັ່ນຜູ້ຍິງ',pic:this.img+'female.jpg'},{name:'ໂທລະສັບແລະອຸປະກອນເສີມ',pic:this.img+'phone.jpg'},{name:'ຄວາມງາມແລະຂອງໃຊ້ສ່ວນຕົວ',pic:this.img+'makeup.jpg'}
 ,{name:'ອາຫານເສີມແລະຜະລິດຕະພັນສຸຂະພາບ',pic:this.img+'help.jpg'},{name:'ຂອງຫຼິ້ນສິນຄ້າແມ່ແລະເດັກ',pic:this.img+'toys.jpg'},{name:'ໂມງແລະແວ່ນຕາ',pic:this.img+'watch.jpg'},{name:"ເຄື່ອງໃຊ້ໃນບ້ານ",pic:this.img+'house.jpg'},{name:"ເກີບຜູ້ຊາຍ",pic:this.img+'shoe_male.jpg'},{name:"ເກີບຜູ້ຍິງ",pic:this.img+'shoe_female.jpg'}
 ,{name:"ອາຫານແລະເຄື່ອງດື່ມ",pic:this.img+'food.jpg'},{name:"ເຄື່ອງປະດັບ",pic:this.img+'jew.jpg'},{name:"ເຄື່ອງໃຊ້ໄຟຟ້າໃນບ້ານ",pic:this.img+'electric.jpg'},{name:"ອຸປະກອນການຮຽນ",pic:this.img+'learn.jpg'},{name:"ອຸປະກອນກິລາ",pic:this.img+'sport.jpg'}
 ,{name:"ອຸປະກອນການຊ່າງ",pic:this.img+'fix.png'}]


//  slideOptscategory = {
//    initialSlide: 1,
//    speed: 400,
//    slidesPerView: 3,
//  };

// checkScreen(){
//   if(window.innerWidth>360){
//     console.log("yy",window.innerWidth.toString());

//       return 4;
      
//   }else{
//     console.log("na",window.innerWidth.toString());

//       return 3;
//   }
// }

checkScreen() {
  let innerWidth = window.innerWidth;
  switch (true) {
    case 0 <= innerWidth && innerWidth <= 230:
      return 1;
    case 231 <= innerWidth && innerWidth <= 300:
      return 2;
    case 301 <= innerWidth && innerWidth <= 430:
      return 3;
    case 431 <= innerWidth && innerWidth <= 550:
      return 4;
    case 551 <= innerWidth && innerWidth <= 700:
      return 5;
    case 701 <= innerWidth && innerWidth <= 827:
      return 6;
    case 828 <= innerWidth:
      return 8;
  }
}


  constructor(private rout:Router,private platform: Platform) { 
    
    this.platform.resize.subscribe(async () => {
      this.slideOptscategory = {
          initialSlide: 1,
          slidesPerView: this.checkScreen(),
          speed: 600,
          slideShadows: true,
          // spaceBetween: this.spaceBetween
        };
      
      });
    }
  

    slideOptscategory = {
        initialSlide: 1,
        slidesPerView: this.checkScreen(),
        speed: 600,
        slideShadows: true,
        // spaceBetween: this.spaceBetween
      };
    
  counterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }
  
  ngOnInit() {
  }

  detail(data:any){
  
    this.rout.navigate(['product-detail'],{queryParams:{data:JSON.stringify(data)}})
    // this.rout.navigate(['product-detail'],{queryParams:{name:data.name,pic:data.pic}})
  }
  search(){
    this.rout.navigateByUrl('search');
  }
  see(title){
    this.rout.navigate(['product-list'],{queryParams:{title:title}})
  }
  see_all(){
    this.rout.navigate(['category'])
  }
}
