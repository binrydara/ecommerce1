import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  constructor(private rout:Router) { }

  ngOnInit() {
  }


  public img:string="../../assets/icon/";

  data=[{name:'ເສື້ອຜ້າແຟຊັ່ນຜູ້ຊາຍ',pic:this.img+'male.jpg'},{name:'ເສື້ອຜ້າແຟຊັ່ນຜູ້ຍິງ',pic:this.img+'female.jpg'},{name:'ໂທລະສັບແລະອຸປະກອນເສີມ',pic:this.img+'phone.jpg'},{name:'ຄວາມງາມແລະຂອງໃຊ້ສ່ວນຕົວ',pic:this.img+'makeup.jpg'}
 ,{name:'ອາຫານເສີມແລະຜະລິດຕະພັນສຸຂະພາບ',pic:this.img+'help.jpg'},{name:'ຂອງຫຼິ້ນສິນຄ້າແມ່ແລະເດັກ',pic:this.img+'toys.jpg'},{name:'ໂມງແລະແວ່ນຕາ',pic:this.img+'watch.jpg'},{name:"ເຄື່ອງໃຊ້ໃນບ້ານ",pic:this.img+'house.jpg'},{name:"ເກີບຜູ້ຊາຍ",pic:this.img+'shoe_male.jpg'},{name:"ເກີບຜູ້ຍິງ",pic:this.img+'shoe_female.jpg'}
 ,{name:"ອາຫານແລະເຄື່ອງດື່ມ",pic:this.img+'food.jpg'},{name:"ເຄື່ອງປະດັບ",pic:this.img+'jew.jpg'},{name:"ເຄື່ອງໃຊ້ໄຟຟ້າໃນບ້ານ",pic:this.img+'electric.jpg'},{name:"ອຸປະກອນການຮຽນ",pic:this.img+'learn.jpg'},{name:"ອຸປະກອນກິລາ",pic:this.img+'sport.jpg'}
 ,{name:"ອຸປະກອນການຊ່າງ",pic:this.img+'fix.png'}]



 see(title){
  this.rout.navigate(['product-list'],{queryParams:{title:title}})
}
}
