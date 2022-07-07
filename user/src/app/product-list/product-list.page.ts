import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ProfileService } from 'src/service/profile.service';
import { IProductPost } from '../model.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  public title: string = ""
  user_data: any;
  PostArray = Array<IProductPost>();


  constructor(private activeRoute: ActivatedRoute, private rout: Router, private load: LoadingController,
    private alrt: AlertController, private nav: NavController, private profile: ProfileService) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(r => {

      this.title = r.title;
    })
    this.loadpost()
  }

  public img: string = "../../assets/icon/";

  data = [{ name: 'ເສື້ອຜ້າແຟຊັ່ນຜູ້ຊາຍ', pic: this.img + 'male.jpg' }, { name: 'ເສື້ອຜ້າແຟຊັ່ນຜູ້ຍິງ', pic: this.img + 'female.jpg' }, { name: 'ໂທລະສັບແລະອຸປະກອນເສີມ', pic: this.img + 'phone.jpg' }, { name: 'ຄວາມງາມແລະຂອງໃຊ້ສ່ວນຕົວ', pic: this.img + 'makeup.jpg' }
    , { name: 'ອາຫານເສີມແລະຜະລິດຕະພັນສຸຂະພາບ', pic: this.img + 'help.jpg' }, { name: 'ຂອງຫຼິ້ນສິນຄ້າແມ່ແລະເດັກ', pic: this.img + 'toys.jpg' }, { name: 'ໂມງແລະແວ່ນຕາ', pic: this.img + 'watch.jpg' }, { name: "ເຄື່ອງໃຊ້ໃນບ້ານ", pic: this.img + 'house.jpg' }, { name: "ເກີບຜູ້ຊາຍ", pic: this.img + 'shoe_male.jpg' }, { name: "ເກີບຜູ້ຍິງ", pic: this.img + 'shoe_female.jpg' }
    , { name: "ອາຫານແລະເຄື່ອງດື່ມ", pic: this.img + 'food.jpg' }, { name: "ເຄື່ອງປະດັບ", pic: this.img + 'jew.jpg' }, { name: "ເຄື່ອງໃຊ້ໄຟຟ້າໃນບ້ານ", pic: this.img + 'electric.jpg' }, { name: "ອຸປະກອນການຮຽນ", pic: this.img + 'learn.jpg' }, { name: "ອຸປະກອນກິລາ", pic: this.img + 'sport.jpg' }
    , { name: "ອຸປະກອນການຊ່າງ", pic: this.img + 'fix.png' }]

  detail(data: any) {

    this.rout.navigate(['product-detail'], { queryParams: { data: JSON.stringify(data) } })
    // this.rout.navigate(['product-detail'],{queryParams:{name:data.name,pic:data.pic}})
  }

  async alert(text: string) {
    const alert = await this.alrt.create({
      header: 'ແຈ້ງເຕືອນ',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }




  async loadpost() {

    localStorage.setItem('skip','0');

    const loading = await this.load.create({
      message: 'ກະລຸນາລໍຖ້າ...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.profile.loadpost('ຂາຍເຄື່ອງໃຊ້ທົ່ວໄປ').subscribe(res => {
    // this.profile.loadpost('ຂາຍຜົນຜະລິດກະສິກຳ').subscribe(res => {

      console.log("post", res);

      if (res.status == 1) {

        this.PostArray = res.data.rows;

        // this.loadProductPosts()

      }
      loading.dismiss();

    }, error => {
      console.log('errror', error);
      loading.dismiss();

      this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

    })

  }
  getminmax(data: any) {
    if (data.min == data.max) {
      return "₭" + data.min;
    }
    return "₭" + data.min + " - " + "₭" + data.max;
  }
}