import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import html2canvas from 'html2canvas';
import * as QRScan from 'qr-scanner';
import * as QRCode from 'qrcode';

import * as html2pdf from 'html2pdf.js'
import jsPDF from 'jspdf';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private toastController: ToastController,
    private alertController:AlertController) { }
  ngOnInit(): void {
    // this.genQR("hello");
  }
  qr="";
   file: File;
  arr: any[] = [];
  qrscanner:QRScan.default;
  // selectfile(event) {
  //   var ref = this;
  //   var file = event.target.files[0];
  //   var size = (0.000001 * parseInt(file.size)).toFixed
  //     (1).toString();
  //   var filename = file.name;
  //   var type = file.type; 
  //   var reader = new FileReader();
  //   reader.onloadend = function () {
  //     var base64 = reader.result.toString();
  //     ref.arr.push({
  //       size: size, filename: filename,
  //       type: type, base64: base64
  //     });

  //   }
  //   reader.readAsDataURL(file);
  // }


  // downloadPdf() {
  //   const div = document.getElementById("div1");
  //   var options = {
  //     margin: 1,
  //     filename: Date.now().toString() + ".pdf"
  //   }
  //   html2pdf().from(div).set(options).save();
  // }


  


  jsPDFSave() {
    const input: any = document.getElementById("div1");
    html2canvas(input).then((canvas) => {
      var imgData = canvas.toDataURL("image/png");
      /*
        Here are the numbers (paper width and height) that I found to work.
        It still creates a little overlap part between the pages, but good enough for me.
        if you can find an official number from jsPDF, use them.
        */
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      var doc = new jsPDF("p", "mm");
      var position = 0;

      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      const fname = "ExportPDF_" + new Date().getTime() + ".pdf";
      doc.save(fname);
    })
  }






  myQRCode = '';
//  async genQR(hashM: string) {
 async genQR() {
   let hashM=this.qr;
    if (hashM) {
      QRCode.toDataURL(hashM).then(async r => {
        this.myQRCode = r;
alert(r);
        const alertCtr = await this.alertController.create({
          cssClass: 'transfer-qrcode-alert',
          header: 'QR Code...!',
          // subHeader:'qrcode',
          message: `<img src="${this.myQRCode}" alt="g-maps" class="silver" style="border-radius: 50% !important; width: 10px; height: 10px;">`,
          buttons: ['OK']
        })
        await alertCtr.present();

      }).catch(e => {
        console.log(e);
      })
    }else{
      const toast = await this.toastController.create({
        header: "No Qrcode",
        duration: 2000
      })
      await toast.present();
    }
  }

  scanQRFromCamera() {

    this.qrscanner = new QRScan.default(document.getElementById('videoQr') as HTMLVideoElement, r => {
      this.qrscanner.stop();
  
      alert(r);
    },e=>{console.log(e);
    });
    this.qrscanner.start();
  
   }

   stopcamera(){
    this.qrscanner.stop();
   }
  
  
  
  
  
    scanQRFromImage(files: FileList) {
  
  
      QRScan.default.scanImage(files[0]).then(r => {
  
      alert(r);
        this.qrscanner.stop();
  
      }).catch( async e => {
  
  
        const toast = await this.toastController.create({
          header:'Error',
          message: 'No Qrcode'+e,
          duration: 1000
        });
        await toast.present();
  
  
      });
  
  
    }
}
