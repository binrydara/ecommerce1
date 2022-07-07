import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ProfileService } from 'src/service/profile.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  @Input() item: string="";
  public tag_list: Array<any> = [];
  public proName:string="";
  public count: string = "0";
  public uuid:string="";

  constructor(private modalCtrl: ModalController,
    private load: LoadingController,
    private tag:ProfileService) { }


  ngOnInit() {
    this.loadtags()

        this.proName=this.item

    console.log(this.proName);

  }

  getuuid(uuid:string){
    this.uuid=uuid;
  }

  getcheck(name: string) {


    if (!this.item) {
      return false
    } else {

      try {
        return this.item.includes(name);
      } catch (error) {
        return false;
      }
    }
  }

   async loadtags() {
    localStorage.setItem('skip_tag', '0')

    const loader = await this.load.create({
      message: 'ກຳລັງໂຫລດຂໍ້ມູນ...',

    });
    loader.present();
    
      this.tag.cat_selmany().subscribe(res => {
        console.log('res', res);


        this.tag_list = res.data.rows
        this.count = res.data.count

        loader.dismiss();
        console.log(this.tag_list);

      }, errr => {
        loader.dismiss();

        console.log('load tag error', errr);
      })
  }


  async selectCheckBox(e, i: string) {
    e = e || window.event;
    const el = e.srcElement as HTMLIonCheckboxElement;
    if (el.checked) {
      
        // return el.checked = false;
      this.proName=i

    } else {

      console.log("false");

      this.proName=""
    }
    console.log(this.proName);

  }


  dismiss() {
   
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  send() {

    this.modalCtrl.dismiss({
      'dismissed': true,
      'tag': [this.proName,this.uuid]
    });

  }


  async doInfinite(event) {
    // event.target.disabled = false;
    const loader = await this.load.create({
      message: 'Please wait...',

    });
    console.log('doInfinite'
    );

    loader.present();
    console.log(localStorage.getItem('skip_tag'));

    if (localStorage.getItem('skip_tag') == null) {
      localStorage.setItem('skip_tag', '0')
    }
    let skiptag = parseInt(localStorage.getItem('skip_tag'))
    skiptag = skiptag + 1
    localStorage.setItem('skip_tag', skiptag.toString())

    if(this.search_tag ==""){
      this.tag.cat_selmany().subscribe(
        res => {
          try {
  
            if (res.data.rows.length) {
              console.log('if', res.data);
              this.tag_list = this.tag_list.concat(res.data.rows);
              event.target.complete();
              // event.target.disabled = false;
            } else {
              console.log('else');
              event.target.complete();
              // event.target.disabled = true;
            }
  
          } catch (error) {
            console.log("ffffffffff");
  
            event.target.complete();
            // event.target.disabled = true;
          }
          loader.dismiss();
        }, err => {
          loader.dismiss();
        }
      )
    }else{
      this.tag.cat_search(this.search_tag).subscribe(res => {
        try {

          if (res.data.rows.length) {
            this.tag_list = this.tag_list.concat(res.data.rows);
            event.target.complete();
          } else {
            console.log('else');
            event.target.complete();
          }

        } catch (error) {
          console.log("ffffffffff");

          event.target.complete();
        }
        loader.dismiss();
      }, err => {
        loader.dismiss();
      }
    )
    }


  }


  search_tag: string = ""
  async search(e: any) {

    localStorage.setItem('skip_tag', '0')

    this.search_tag = (e.target as HTMLInputElement).value

    if (this.search_tag == "") {
      this.loadtags();
      return;
    }

    const loader = await this.load.create({
      message: 'Please wait...',

    });
    loader.present();

    this.tag.cat_search(this.search_tag).subscribe(res => {
      console.log('res of sarch', res);

      this.tag_list = res.data.rows
      this.count = res.data.count
      loader.dismiss()

    }), errr => {
      console.log('error', errr);
      loader.dismiss()
    };
  }

  Autosearch(e: any) {
    this.search_tag = (e.target as HTMLInputElement).value

    if (this.search_tag == "") {
      this.loadtags();

    }
  }

}
