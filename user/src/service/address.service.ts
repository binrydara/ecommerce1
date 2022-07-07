import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends ApiService{
  public url: string = this.getBaseUrl_vdp();

  initAddresses(force:boolean=false) {
    if(!force&&localStorage.getItem('ProvArray')&&localStorage.getItem('DisArray')&&localStorage.getItem('VilArray')){
      this.dataPassService.province_array = JSON.parse(localStorage.getItem('ProvArray'));
      this.dataPassService.distirct_array = JSON.parse(localStorage.getItem('DisArray'));
      this.dataPassService.village_array = JSON.parse(localStorage.getItem('VilArray'));
    }else{
      /// later it needs to sync !!!!!
      this.updateAllAdresses();
    }

  }



  saveAddress() {
    localStorage.setItem('ProvArray', JSON.stringify(this.dataPassService.province_array))
    localStorage.setItem('DisArray', JSON.stringify(this.dataPassService.distirct_array))
    localStorage.setItem('VilArray', JSON.stringify(this.dataPassService.village_array))
  }
  async updateAllAdresses() {
    console.log('loading province');

    const loader = await this.load.create({
      message: 'ກຳລັງໂຫລດຂໍ້ມູນເລີ່ມຕົ້ນ...',

    });
    loader.present();
    
    this.listAllprovince().subscribe(o => {
      console.log('province data',o.data.length);
      this.dataPassService.province_array = o.data;
      localStorage.setItem('ProvArray', JSON.stringify(this.dataPassService.province_array))
      
      console.log('loading district');
      this.listAlldistrict().subscribe(r=>{
        console.log('district data',r.data.length);
        this.dataPassService.distirct_array.push(...r.data);
        localStorage.setItem('DisArray', JSON.stringify(this.dataPassService.distirct_array))

        console.log('loading village');
        this.listAllvillage().subscribe(x=>{
          console.log('village data',x.data.length);
          this.dataPassService.village_array.push(...x.data);
          localStorage.setItem('VilArray', JSON.stringify(this.dataPassService.village_array))

          loader.dismiss();
          this.alert('ໂຫລດຂໍ້ມູນເລີ່ມຕົ້ນສຳເລັດແລ້ວ');
        })
      })
    }, error => {
      console.log('errror', error);
      loader.dismiss();
      this.alert('ເກີດຂໍ້ຜິດພາດ ກະລຸນາອອກຈາກແອັບແລ້ວເຂົ້າໃໝ່ອີກຄັ້ງ');
    })
  }
  listAllprovince(): Observable<any> {
    const header = this.headerBase();
    return this.http.get(this.url + 'listAllprovince', { headers: header });
  }

  //=============== District ==============

  getDistrict_by_provinceID(param: any): Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url + 'getDistrict_by_provinceID', param, { headers: header });
  }

  //============== Village ===============

  getVillage_by_districtID(param: any): Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url + 'getVillage_by_districtID', param, { headers: header });
  }

  listAlldistrict(): Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url + 'listAlldistrict', {}, { headers: header });
  }
  listAllvillage(): Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url + 'listAllvillage', {}, { headers: header });
  }
}
