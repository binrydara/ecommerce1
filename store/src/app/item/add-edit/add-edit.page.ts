import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { AddOnPage } from 'src/app/add-on/add-on.page';
import { CategoryPage } from 'src/app/category/category.page';
import { ProfileService } from 'src/service/profile.service';
import { browserRefresh } from '../../app.component';
import * as uuid from 'uuid';
import { FileuploadService } from 'src/app/fileupload.service';
import { PaginationService } from 'src/app/pagination.service';
import { ApiService } from 'src/service/api.service';


declare var window;
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.page.html',
  styleUrls: ['./add-edit.page.scss'],
})
export class AddEditPage implements OnInit {

  getImage:(img:string)=>string;

  code:string='';


  add: string = "true";
  data_forUpdate: any = [];
  user_data: any = [];
  browserRefresh: boolean;
  public catName: string = "";
  public proname: string = "";
  public categoryUuid: string = "";
  public description: string = "";
  public mrp: string = "";
  public price: string = "";
  public qty: number = 0;
  public color_list = Array<string>();
  public size_list = Array<string>();
  public block_price: boolean = false;

  public weight: number = 0;
  public wide: number = 0;
  public high: number = 0;
  public long: number = 0;
  public action = '1';

  public qtyStock: number = 0;
  public BDirection: string = '';
  public Direction: string = '';
  public manage_qty: number = 0;
  public stock_description: string = '';
  public stock_list: any = [];

  filemanagerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNpZ25hdHVyZSI6IjA0ZWQxZTZlNDRiZjlkMTg4ZDc2MDkwYzU4YjIwNGQ0MDhhNGE5YWFhMTkxNzU1YjRkMjlmZmI0N2EzMjNkMTdiYjE0MmIwN2Q3NGZjZGZmNzUyMmU3MWM2NTRjZDVjZjNmYTViZDY5YTlmOWIzNzllYWZhYmJkZDVkMzg0NzNhZTMiLCJwaG9uZU51bWJlciI6Iis4NTYyMDU1NTE2MzIxIiwidXVpZCI6IjExMDg5MGEwLTcyYWYtMTFlYy05NzdiLTRmNTk1YzcxNTYyYSIsImlwIjoiMTI3LjAuMC4xIiwibWFjaGluZSI6IndpbmRvd3MiLCJvdGhlcmluZm8iOiJsYW9hcHAuY29tIiwibG9jYXRpb24iOiJ2aWVudGlhbmUifSwiaWF0IjoxNjU1Njk0MDQ5LCJleHAiOjM2MDAwMDAxNjU1Njk0MDUwfQ.mSFw_W0PBctartPVVRI2KjPOdVC4aFL6SdWX4RBv-0o';

  storeToken = ''

  slideOptscategory = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 2,
    pagination: false
  };
  a2 = [];
  onClick() {




    this.a2.push(1);
  }
  removepic(i: number) {
    this.image_list.splice(i, 1);
  }

  formData = new FormData();
  fileName = '';
  fileArr: Array<FileModel> = Array<FileModel>();
  btns: any;
  Url = '';

  uploadFile(event) {

    console.log("event: ", event.target.files);
    const file: File = event.target.files[0];

    if (file) {
      this.formData = new FormData();
      this.fileName = file.name;
      this.formData.append("docs", file, file.name);
      this.formData.append("uuid", uuid.v4())
      console.log("::: ", this.formData.getAll('docs'));
      this.saveFile();
    }
  }

  // image_list=["2014100285197e3f36dda9a8183cf553","f83308b14d4d43172d16b68464caa804","5f376febd17a280e8a27234fdf2e9204"];
  image_list = [];

  async saveFile() {
    let chkFile = document.getElementById("fileId") as HTMLInputElement;
    if (chkFile.files.length == 0) {
      this.alert2('ຍັງບໍ່ມີໄຟລ', 'ກະລຸນາເລືອກໄຟລຂອງທ່ານ...!');
      return;
    }

    this.storeToken = localStorage.getItem('token');
    localStorage.setItem('token', this.filemanagerToken);


    const loading = await this.load.create({
      message: 'ກະລຸນາລໍຖ້າ...',
      spinner: 'bubbles',
    });
    await loading.present();

    this.api.uploadFile(this.formData).subscribe(r => {
      console.log('FILE UPLOADED', r);
      if (r.status == 1) {
        loading.dismiss();
        this.image_list.unshift(r.data[0].info.fileUrl);
        // this.selectMany(1);
        // this.alert2('ແຈ້ງເຕືອນ','ໄຟລຂອງທ່ານຖືກອັບໂຫລດສຳເລັດແລ້ວ');
        chkFile.value = null;
      } else {
        loading.dismiss();

        this.alert2('ຜິດພາດ', 'ກະລຸນາລອງໃໝ່ອີກຄັ້ງ');
      }

      localStorage.setItem('token', this.storeToken);


    }, error => {
      localStorage.setItem('token', this.storeToken);
      loading.dismiss();

    })
  }
  selectMany(page: number) {
    const data: any = { page: page, limit: 5 };

    this.api.selectmany(data).subscribe(respone => {
      console.log(respone);
      if (respone.status == 1) {
        this.fileArr = respone.data.rows;
        this.btns = this.pagination.paginate(page, Math.ceil(parseFloat(respone.data.count) / 5));
      }
    })
  }

  //  slideOptscategory = {
  //   initialSlide: 1,
  //   slidesPerView:3,
  //   speed: 600,
  //   slideShadows: true,
  //   // spaceBetween: this.spaceBetween
  // };

  constructor(private pagination: PaginationService, private api: FileuploadService, private alrt: AlertController, private nav: NavController, private load: LoadingController,
    private activeRoute: ActivatedRoute, private modalCtrl: ModalController, private profile: ProfileService
    ,public apiService:ApiService) {
      this.getImage = this.apiService.getImage.bind(this.apiService);

     }

  ngOnInit() {

    this.Url = this.api.url + 'file/download/';
    this.browserRefresh = browserRefresh;

    if (this.browserRefresh) {
      this.nav.navigateBack('item');
    }
    console.log('refreshed?:', browserRefresh);

    if (!localStorage.getItem('user_3apps') || localStorage.getItem('user_3apps') == 'null') {
      this.alert("ເກີດຂໍ້ຜິດພາດບາງຢ່າງ ກະລຸນາກົດເຂົ້າລະບົບໃໝ່ອີກຄັ້ງ");
      this.nav.navigateRoot('/welcome');
    }
    else {
      this.user_data = JSON.parse(localStorage.getItem('user_3apps'));
    }


    this.activeRoute.queryParams.subscribe(r => {
      console.log(r);

      this.add = r.isadd;
      if (r.isadd == "false") {
        this.data_forUpdate = JSON.parse(r.data_forUpdate);
        this.description = this.data_forUpdate.description;
        this.mrp = this.data_forUpdate.mrp;
        this.qty = this.data_forUpdate.moreDetail.qtty;

        if (this.data_forUpdate.spec) {
          this.high = this.data_forUpdate.spec.high;
          this.weight = this.data_forUpdate.spec.weight;
          this.wide = this.data_forUpdate.spec.wide;
          this.long = this.data_forUpdate.spec.long;
        }

        // if (this.user_data.storeType != 'ຂາຍອາຫານແລະເຄື່ອງດື່ມ') {

            this.loadqty_fromStock();
        // }
      }

      console.log(this.data_forUpdate);


    })

  }

  async loadqty_fromStock() {

    const loading = await this.load.create({
      message: 'ກະລຸນາລໍຖ້າ...',
      spinner: 'bubbles',
    });
    await loading.present();

    let data = {
      puuid: this.data_forUpdate.uuid,
      owneruuid: this.user_data.uuid,
    }

    this.profile.loadQtyFromStock(data).subscribe(res => {

      console.log(res);

      if (res.status == 1) {
        this.qtyStock = res.data.qtt
      }

      loading.dismiss();
    }, error => {
      console.log(error);
    });
  }

  getprop1() {
    if (this.data_forUpdate?.moreDetail?.prop) {

      return true;
    }
    return false;
  }
  getprop2() {
    if (this.data_forUpdate?.moreDetail?.prop) {

      if (this.data_forUpdate?.moreDetail?.prop.length == 2) {
        return true;
      } else {

        return false;
      }
    }
    return false;
  }

  readyProducts = [];
  a = []
  async more_detail(id: any) {
    const modal = await this.modalCtrl.create({
      component: AddOnPage,
      componentProps: {
        'item': this.a,
        'getproimg': this.image_list
      }
    });

    modal.onDidDismiss().then(res => {
      try {
        if (res.data.reload) {

          // this.color_list=res.data.reload[0];
          // this.size_list=res.data.reload[1];
          // console.log(this.color_list);
          // console.log(this.size_list);

          this.readyProducts = res.data.reload;
          console.log(this.readyProducts);

          if (this.readyProducts.length == 1) {
            this.block_price = false;

            this.price = this.readyProducts[0].moreDetail.price;
            this.qty = Number(this.readyProducts[0].moreDetail.qtty);
            console.log(this.price);
            console.log(this.qty);

          } else if (this.readyProducts.length > 1) {
            let a = [];

            this.block_price = true;

            // a=this.readyProducts.map(v=>Number(v.moreDetail.price));

            for (let index = 0; index < this.readyProducts.length; index++) {
              const e = this.readyProducts[index];
              a.push(Number(e.moreDetail.price));
            }

            a.sort(function (a, b) {
              return a - b
            });

            this.qty = this.readyProducts.map(v => Number(v.moreDetail.qtty)).reduce((prev, curr) => prev + curr, 0);;

            if (a[0] == a[a.length - 1]) {

              this.price = a[0]
            } else {

              this.price = a[0] + ' - ' + a[a.length - 1];
            }
            console.log("a:", a);
            console.log("price:", this.price);
            console.log("qty:", this.qty);
          } else {
            this.block_price = false;
          }

        }
      } catch (error) {

      }
    })
    return await modal.present();
  }

  async addcat() {
    const modal = await this.modalCtrl.create({
      component: CategoryPage,
      componentProps: {
        'item': this.catName,
      }
    });

    modal.onDidDismiss().then(res => {
      try {
        if (res.data.tag) {

          this.catName = res.data.tag[0];
          this.categoryUuid = res.data.tag[1];
          console.log("this tag", this.catName + "<=>" + this.categoryUuid);

        }
      } catch (error) {

      }
    })
    return await modal.present();
  }

  showaddon() {
    try {
      if (this.readyProducts.length == 1) {

        return this.readyProducts[0].moreDetail.data;

      } else if (this.readyProducts.length > 1) {

        return this.readyProducts.map(v => v.moreDetail.data);
      }
    } catch (error) {
      console.log(error);

    }
  }
  showShippingCost() {
    try {
      if (!this.weight || !this.wide || !this.high || !this.long) {

        return '';
      }
      return this.weight + "," + this.wide + "," + this.high + "," + this.long

    } catch (error) {
      console.log(error);

    }
  }



  async new_product() {



    if (!this.proname || !this.categoryUuid || !this.price || !this.qty){

      this.alert('ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ');
      return;
    }

    // if (this.user_data.storeType != 'ຂາຍອາຫານແລະເຄື່ອງດື່ມ') {

    //   if (!this.qty) {
    //     this.alert('ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ');
    //     return;
    //   }
    // }


    const loading = await this.load.create({
      message: 'ກະລຸນາລໍຖ້າ...',
      spinner: 'bubbles',
    });
    await loading.present();




    console.log(this.readyProducts.length);

    if (this.readyProducts.length == 0) {

      console.log("insert");

      // if (this.user_data.storeType != 'ຂາຍອາຫານແລະເຄື່ອງດື່ມ') {

        if (!this.weight || !this.wide || !this.high || !this.long) {
          this.alert('ກະລຸນາປ້ອນຂໍ້ມູນຄ່າຈັດສົ່ງໃຫ້ຄົບ');
          loading.dismiss();
          return;
        }
      // }


      let data = {
        name: this.proname,
        description: this.description,
        productTypes: this.categoryUuid,
        moreDetail: { price: this.price, qtty: this.qty.toString() },
        mrp: this.mrp,
        storeType: (this.user_data.storeType)+''.trim(),
        storeUuid: this.user_data.uuid,
        spec: { weight: this.weight, wide: this.wide, high: this.high, long: this.long },
        image: this.image_list
        // productCode
      }

      this.profile.new_product(data).subscribe((response: any) => {

        // this.data = response.data;

        if (response.status == 1) {

          // let data =JSON.parse(localStorage.getItem('item_3product'));

          // console.log(data.find(v=>v.id==response.data.id));

          window.item.loadData();
          this.nav.navigateBack('item');

        } else {
          this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');
        }
        console.log(response);

        // localStorage.setItem('item_product',JSON.stringify(this.data));

        loading.dismiss();

      }, async error => {
        console.log('errror', error);
        loading.dismiss()

        this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

      })


    } else {

      const code =uuid.v4(); // gen product code
      
      for (let index = 0; index < this.readyProducts.length; index++) {
        const e = this.readyProducts[index];
        e.name = this.proname;
        e.description = this.description;
        e.productTypes = this.categoryUuid;
        e.mrp = this.mrp;
        e.storeType = (this.user_data.storeType)+''.trim();
        e.storeUuid = this.user_data.uuid;
        e.productCode=code;
      }

      console.log("yes", this.readyProducts);

      this.profile.newMany_product(this.readyProducts).subscribe((response: any) => {

        console.log(response);


        if (response.status == 1) {

          // let data =JSON.parse(localStorage.getItem('item_3product'));

          // console.log(data.find(v=>v.id==response.data.id));

          window.item.loadData();
          this.nav.navigateBack('item');

        }
        console.log(response);

        // localStorage.setItem('item_product',JSON.stringify(this.data));

        loading.dismiss();

      }, async error => {
        console.log('errror', error);
        loading.dismiss()

        this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

      })
    }
  }

  async update() {

    if (this.user_data.storeType != 'ຂາຍອາຫານແລະເຄື່ອງດື່ມ') {

      if (!this.weight || !this.wide || !this.high || !this.long || !this.code) {
        this.alert('ກະລຸນາປ້ອນຂໍ້ມູນໃນຊ່ອງທີ່ມີເຄື່ອງໝາຍ * ໃຫ້ຄົບ');
        return;
      }
    }



    const loading = await this.load.create({
      message: 'ກະລຸນາລໍຖ້າ...',
      spinner: 'bubbles',
    });
    await loading.present();

    let data = {
      description: this.description,
      mrp: this.mrp,
      spec: { weight: this.weight, wide: this.wide, high: this.high, long: this.long },
      storeUuid: this.user_data.uuid,
      // image:,
      productCode:this.code
    }

    this.profile.edit_product(data, this.data_forUpdate.id).subscribe((response: any) => {

      if (response.status == 1) {

        this.alert('ແກ້ໄຂຂໍ້ມູນສຳເລັດແລ້ວ');
        window.item.loadData();
        this.nav.navigateBack('item');
      } else {
        this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');
      }
      console.log(response);

      loading.dismiss();

    }, async error => {
      console.log('errror', error);
      loading.dismiss()

      this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

    })
  }

  gomanage() {
    this.action = '3';
    this.loadStock();
    this.BDirection = '';
    this.Direction = '';
    this.manage_qty = 0;
    this.stock_description = '';
  }
  getdirection(d: string) {
    if (d == 'sell') {
      return 'ຂາຍ';
    }
    if (d == 'defective') {
      return 'ເຄື່ອງເພ';

    }
    if (d == 'expired') {
      return 'ຫມົດອາຍຸ';

    }
    if (d == 'lost') {
      return 'ເຄື່ອງເສຍ';

    }
    if (d == 'stolen') {
      return 'ຖືກລັກ';

    }
    if (d == 'warranty') {
      return 'ສົ່ງອອກໄປຮັບປະກັນ';

    }
    if (d == 'transfer') {
      return 'ຍ້າຍອອກ';

    }
    if (d == 'others') {
      return 'ອື່ນໆ';

    }
    if (d == 'purchase') {
      return 'ຊື້ເຂົ້າ';

    }
    if (d == 'reimport') {
      return '';

    }
  }

  async loadStock() {

    const loading = await this.load.create({
      message: 'ກະລຸນາລໍຖ້າ...',
      spinner: 'bubbles',
    });
    await loading.present();

    let data = {
      puuid: this.data_forUpdate.uuid,
      storeuuid: this.user_data.uuid,
    }
    this.profile.loadStock(data).subscribe(res => {

      console.log(res);

      if (res.status == 1) {
        this.stock_list = res.data.rows;

        this.qtyStock = res.data.rows[0].qtt;
      }
      loading.dismiss();
    }, error => {
      console.log(error);

    })

  }

  async manage_stock() {

    if (!this.Direction) {
      this.alert('ກະລຸນາປ້ອນຂໍ້ມູນໃນຊ່ອງທີ່ມີເຄື່ອງໝາຍ * ໃຫ້ຄົບ');
      return;
    }
    if (!this.manage_qty) {
      this.alert('ຈຳນວນທີ່ປ້ອນຕ້ອງຫຼາຍກວ່າ 0');
      return;
    }

    if (this.BDirection == 'out') {

      if (this.qtyStock < this.manage_qty) {
        this.alert('ຈຳນວນສິນຄ້າທີ່ມີ ບໍ່ພຽງພໍທີ່ຈະນຳອອກ');
        return;
      }
      this.manage_qty = this.manage_qty - (this.manage_qty * 2);


    }
    console.log(this.manage_qty);



    const loading = await this.load.create({
      message: 'ກະລຸນາລໍຖ້າ...',
      spinner: 'bubbles',
    });
    await loading.present();

    let data = {
      description: this.stock_description,
      direction: this.Direction,
      qtt: this.manage_qty,
      storeUuid: this.user_data.uuid,
      puuid: this.data_forUpdate.uuid
      // productCode
    }

    this.profile.manage_stock(data).subscribe((response: any) => {


      if (response.status == 1) {

        this.alert('ການດຳເນີນງານສຳເລັດ');
        this.loadStock();

      } else {
        this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');
      }
      console.log(response);


      loading.dismiss();

    }, async error => {
      console.log('errror', error);
      loading.dismiss()

      this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

    })
  }


  async alert(text: string) {
    const alert = await this.alrt.create({
      header: 'ແຈ້ງເຕືອນ',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }
  async alert2(title: string, text: string) {
    const alert = await this.alrt.create({
      header: title,
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }
}

export interface FileModel {
  id: number;
  fileName: string;
  description: string;
  fileExtendsion: string;
  fileIcon: string;
  filePath: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  isActive: boolean;
  parent: string;
  createdAt: string;
  updatedAt: string;
  uuid: string;
}