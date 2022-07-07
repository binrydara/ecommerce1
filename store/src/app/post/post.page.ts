import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../../service/profile.service'
import { ICart, IProduct, IProductDetails, IProductDetailsCompact, IProductPost, IStock } from '../model.service';
import { AddProductPage } from './add-product/add-product.page';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {


  post_list = Array<any>();
  tags_list = Array<any>();
  action = 'list';
  title = '';
  user_data: any;
  description: string = '';
  pro_id: any = [];
  primary_product: any = [];
  secondary_product: any = [];
  addon_product: any = [];


  PostArray = Array<IProductPost>();
  productArray = Array<IProduct>();
  inventory = Array<IStock>();
  selectedProduct: ICart = {} as ICart;
  selectedProductAddon: ICart;
  cart = Array<ICart>();
  ownerUuid = ''
  minMax = '';
  url='';

  add = '';
  addTags() {
    this.tags_list.push(this.add);
    this.add = "";
  }

  getImagePath(im: string) {

    if (im) {
      return this.url + im;
    }

    return '../../assets/cart.png'

  }

  constructor(private alrt: AlertController, private profile: ProfileService,
    private load: LoadingController, private nav: NavController, private modal: ModalController) { }

  ngOnInit() {
    this.url = environment.serverFile + 'file/download/';


    let a = localStorage.getItem('user_3apps');

    if (a == undefined || a == null || !a || a == 'null') {
      this.alert("ເກີດຂໍ້ຜິດພາດບາງຢ່າງ ກະລຸນາກົດເຂົ້າລະບົບໃໝ່ອີກຄັ້ງ");
      this.nav.navigateRoot('/welcome');
      return;
    } else {
      this.user_data = JSON.parse(a);
      this.loadpost()
    }

    console.log("post", this.PostArray);
  }

  async alert(text: string) {
    const alert = await this.alrt.create({
      header: 'ແຈ້ງເຕືອນ',
      message: text,
      buttons: ['OK']
    });

    await alert.present();
  }

  go_add() {
    this.title = 'add';
    this.action = 'add-update';
  }
  go_edit(data) {
    this.title = 'edit';
    this.action = 'add-update';

  }

  //============================== Modal add product ===========================
  getsecon() {
    if (this.primary_product?.moreDetail?.prop) {
      return true;
    }
    this.secondary_product = [];
    return false;
  }
  async addProduct(action: string) {


    // if(action=='secondary'){

    //   if(!this.primary_product.moreDetail.prop){

    //     this.alert("no");
    //     this.secondary_product = [];
    //   }
    // }
    const m = await this.modal.create({
      component: AddProductPage,
      componentProps: {
        'user_data': this.user_data,
        'action': action,
        'primary_id': this.primary_product.id,
        'secondary_id': this.secondary_product,
        'addon_id': this.addon_product
      }
    });

    m.onDidDismiss().then(
      res => {
        console.log(res);
        console.log(this.secondary_product);


        if (res.data.primary) {
          this.primary_product = [];
          this.primary_product = res.data.primary;
        }
        if (res.data.secondary) {
          this.secondary_product = [];
          this.secondary_product = res.data.secondary;
        }
        if (res.data.addon) {
          this.addon_product = [];
          this.addon_product = res.data.addon;
        }
        console.log(this.primary_product);
        console.log(this.secondary_product);
        console.log(this.addon_product);

      })

    return await m.present();
  }
  //============================================================================

  allStock = new Array<IStock>();
  new_post() {

    console.log(this.secondary_product);
    console.log(this.addon_product);
    // return;

    let post: IProductPost

    if (this.primary_product.length == 0) {
      this.alert("null"); return;
    }

    //load inventory
    // let data = {
    //   primaryProduct: this.primary_product,
    //   secondaryProducts: this.secondary_product,
    //   addon:this.addon_product
    // }
    let data = { storeUuid: '', uuid: new Array<string>() };
    data.uuid.push(this.primary_product.uuid)
    data.uuid.push(...this.secondary_product)
    data.uuid.push(...this.addon_product)

    data.storeUuid=this.primary_product.storeUuid;
    console.log(data);

    const pri_stock = new Array<IStock>();
    const sec_stock  = new Array<IStock>();
    const add_stock  = new Array<IStock>();
    this.profile.getinventory(data).subscribe(r => {

      console.log("get inventory", r);

      if (r.status) {
        sec_stock.push(...r.data.rows.filter(v=>this.secondary_product.includes(v.productUuid)))
        pri_stock.push(...r.data.rows.filter(v=>this.primary_product.uuid==v.productUuid))
        add_stock.push(...r.data.rows.filter(v=>this.addon_product.includes(v.productUuid)))
        this.allStock.push(...sec_stock);
        this.allStock.push(...pri_stock);
        this.allStock.sort((a, b) => a.value - b.value)

        const primaryProduct = { inventory:pri_stock[0], product: this.primary_product } as IProductDetails;

        const secondaryProducts = sec_stock.map(v => {
          return {
            inventUuid: v.uuid,
            productUuid: v.productUuid
          }
        });

        const addons = [] as Array<IProductDetailsCompact>;
        addons.push(...add_stock.map(v=>{return{inventUuid:v.uuid,productUuid:v.productUuid}}))

        post = {
          ownerUuid: this.user_data.uuid,
          primaryProduct,
          secondaryProducts,
          addons,
          productType: this.primary_product.productTypes,
          tags: this.tags_list,
          prices: [pri_stock[0].value],
          min: this.allStock[0].value,
          max: this.allStock[this.allStock.length - 1].value,
          average: this.allStock.reduce((a, b) => a + b.value, 0) / this.allStock.length,
          expiry_date: new Date,
          saleCode: '',
          description: this.description,
          district: this.user_data.more_detail.district,
          province: this.user_data.more_detail.province,
          storeType: this.user_data.storeType
        }

        console.log(post);

        this.profile.new_post(post).subscribe(rx => {

          console.log("add new post", rx);


        }, error => {
          console.log('errror', error);
          // loading.dismiss();

          this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

        })

      }


    }, error => {
      console.log('errror', error);
      // loading.dismiss();

      this.alert('ເກີດຂໍ້ຜິດພາດບາງຢ່າງ');

    })
  }

  add_tags() {
    this.action = 'add_tag';
  }
  showprimary() {
    try {
      // console.log(this.primary_product);

      if (this.primary_product.length != 0) {

        if (!this.primary_product.moreDetail) {
          return this.primary_product.name
        }
        if (this.primary_product.moreDetail.data) {
          return this.primary_product.name + " ( " + this.primary_product.moreDetail.data + " )";
        }

        return this.primary_product.name

      }
      return ''
    } catch (error) {
      console.log(error);

    }
  }
  showaddon() {
    try {

      if (this.addon_product.length) {

        return "ມີ " + this.addon_product.length + " ລາຍການ";

      }
      return '';

    } catch (error) {
      console.log(error);

    }
  }
  showsecondary() {
    try {

      if (this.secondary_product.length) {

        return "ມີ " + this.secondary_product.length + " ລາຍການ";

      }
      return '';

    } catch (error) {
      console.log(error);

    }
  }

  async loadpost() {

    const loading = await this.load.create({
      message: 'ກະລຸນາລໍຖ້າ...',
      spinner: 'bubbles',
    });
    await loading.present();

    let data = {
      ownerUuid: this.user_data.uuid,
      storeType: this.user_data.storeType
    }

    this.profile.loadpost(data).subscribe(res => {

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





  detail(data: any) {
console.log(data);

    localStorage.setItem('post_detail',JSON.stringify(data));
    this.nav.navigateForward('post/post-detail');
  }
}