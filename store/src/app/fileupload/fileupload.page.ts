import { Component, OnInit } from '@angular/core';

import { PaginationService } from '../pagination.service';
import { FileuploadService } from '../fileupload.service';
import * as uuid from 'uuid';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.page.html',
  styleUrls: ['./fileupload.page.scss'],
})
export class FileuploadPage implements OnInit {

  constructor(private api: FileuploadService,private pagination: PaginationService,private modalCtrl: ModalController
  ,private alt:AlertController) { }

  Url:string='';
  fileName = '';
  fileArr: Array<FileModel> = Array<FileModel>();
  btns: any;
  progress: number = 0;


  dismiss() {
    this.modalCtrl.dismiss({
      "dismiss": true,
    })
  }

  // maxUpload = 5 * 1024 * 1024;
  // selectFile_Edit(e) {
  //   this.isLoad = false;
  //   console.log(this.isLoad);
  //   if (e.target.files) {
  //     if (e.target.files[0].size > this.maxUpload) {
  //       this.toastController.create({
  //         message: 'File is too large, 5MB max ~' + e.target.files[0].size / 1024 / 1024 + 'MB',
  //         duration: 3000
  //       }).then(r => {
  //         r.present();
  //       })
  //       return;
  //     }
  //     var reader = new FileReader();
  //     reader.readAsDataURL(e.target.files[0]);

  //     reader.onload = (e: any) => {
  //       this.myUpload = e.target.result
  //       // console.log(e.total); 
  //       console.log("one select file", this.myUpload);
  //     }
  //   }
  // }
  // selectFile_Add(e) {
  //   this.isLoad = false;
  //   console.log(this.isLoad);
  //   if (e.target.files) {
  //     if (e.target.files[0].size > this.maxUpload) {
  //       this.toastController.create({
  //         message: 'File is too large, 5MB max ~' + e.target.files[0].size / 1024 / 1024 + 'MB',
  //         duration: 3000
  //       }).then(r => {
  //         r.present();
  //       })
  //       return;
  //     }
  //     var reader = new FileReader();
  //     reader.readAsDataURL(e.target.files[0]);

  //     reader.onload = (e: any) => {
  //       this.Addimg = e.target.result
  //       // console.log(e.total); 
  //       console.log("one add select file", this.Addimg);
  //     }
  //   }
  // }


  Addimg='../../assets/cart.png';
  async savepic(){
    if (this.Addimg == "../../../assets/icon/pic.jpg") {
      const alert = await this.alt.create({
        cssClass: 'my-custom-class',
        header: 'ແຈ້ງເຕືອນ',
        message: 'ກາລຸນາເລືອກຮູບ',
        buttons: [

          {
            text: "ok",
            role: 'cancel'
          }
        ]
      })
      await alert.present();
    }

    // let picname = (parseInt(this.maxID) + 1).toString()+JSON.parse(localStorage.getItem('data1')).profileUuid
    //     let data = {
    //       picname: picname,
    //       ownerUuid: JSON.parse(localStorage.getItem('data1')).profileUuid,
    //       memberName: this.memberName,
    //       productName: this.productName,
    //       startAt: this.realstartAt,
    //       qty: this.qty,
    //       expectDate: this.realexpectDate,
    //       expectQty: this.expectQty,
    //       price: this.price,
    //       image: [this.Addimg],
    //       more: { begin_qty: this.begin_qty, expectQty_To: this.expectQty_To, realQty_To: this.realQty_To, comment: this.comment, province:this.pr_name, district:this.dr_name,average:this.average,phoneNumber:this.phoneNumber},
    //     }
  }
//===============================================================================
  ngOnInit(): void {
    this.Url= this.api.url+'file/download/';    
    this.selectMany(1);
  }
  formData = new FormData();

  uploadFile(event) {
    console.log("event: ", event.target.files);
    const file: File = event.target.files[0];

    if (file) {
      this.formData = new FormData();
      this.fileName = file.name;
      this.formData.append("docs", file, file.name);
      this.formData.append("uuid", uuid.v4())
      console.log("::: ", this.formData.getAll('docs'));
    }
  }

  saveFile() {
    let cFile = document.getElementById("fileId") as HTMLInputElement;
    let chkFile =this.formData.getAll('docs')
    console.log("::: ", this.formData.getAll('docs'));
    
    if (chkFile.length == 0) {
      this.alert('ຍັງບໍ່ມີໄຟລ','ກະລຸນາເລືອກໄຟລຂອງທ່ານ...!');
      return;
    }

    this.api.uploadFile(this.formData).subscribe(r => {
      console.log('FILE UPLOADED', r);
      if (r.status == 1) {
        
        this.selectMany(1);
        this.alert('ແຈ້ງເຕືອນ','ໄຟລຂອງທ່ານຖືກອັບໂຫລດສຳເລັດແລ້ວ');
        cFile.value = null;
        chkFile.length=0;
      }

    })
  }
  // 1f691bd0-b49d-11ec-bf9d-afad68c4e9bf
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNpZ25hdHVyZSI6IjA0ZGNlM2FiZTZhM2I0ODU0MTUzZjhkNThlY2M3NTMxOGM4MzNlZTViMDNkNjM0M2M5Mzc3M2FkMThiYzAzODM3OTVhODkwMjEyMGEzYjk3MWMzMzU3ZDMxOTBjNjI2ZWNhMzc3NDgzMjVkZjJjNjYyNzE3YTcxY2E0NjNjYzlkYTciLCJwaG9uZU51bWJlciI6Iis4NTYyMDk2MjE4NDIyIiwidXVpZCI6ImIzYTYwYTEwLWI0YmItMTFlYy05YzZiLTViYjI1YTdhMTZmOCIsImlwIjoiMTI3LjAuMC4xIiwibWFjaGluZSI6IndpbmRvd3MiLCJvdGhlcmluZm8iOiJsYW9hcHAuY29tIiwibG9jYXRpb24iOiJ2aWVudGlhbmUifSwiaWF0IjoxNjU0NzY0MDExLCJleHAiOjM2MDAwMDAxNjU0NzY0MDEyfQ.c5LyqBrwfXAe3mMDrVSpxQod9wok-FGALcDn3wZPru8
  selectMany(page:number) {
    const data: any = { page: page, limit: 5 };

    this.api.selectmany(data).subscribe(respone => {
      console.log(respone);      
      if (respone.status == 1) {
        this.fileArr = respone.data.rows;
        this.btns = this.pagination.paginate(page, Math.ceil(parseFloat(respone.data.count) / 5));
      }
    })
  }
  async deleteFile(id: string) {
    const alert = await this.alt.create({
      header: 'ທ່ານຕ້ອງການລຶບແທ້ບໍ່ ?',
      message: 'ເມື່ອລຶບແລ້ວຈະບໍ່ສາມາດກູ້ຄືນໄດ້',
      buttons: [{
        text: 'ຍົກເລີກ',
        handler: () => {

        }
      },
      {
        text: 'ຕົກລົງ',
        handler: () => {
          
          this.api.deleteFile(id).subscribe(response => {
            console.log(response);
            if (response.status == 1) {
              this.selectMany(1);
              this.alert('ແຈ້ງເຕືອນ','ໄຟລຂອງທ່ານຖືກລຶບຮຽບຮ້ອຍແລ້ວ');
            }
  
          })


        }
      }]
    });

    await alert.present();
  }



  humanFileSize(bytes, si=false, dp=1) {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
      return bytes + ' bytes';
    }
    const units = si 
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
      : ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    const r = 10**dp;
    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
    return bytes.toFixed(dp) + ' ' + units[u];
  }


  async alert(title:string,text: string) {
    const alert = await this.alt.create({
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