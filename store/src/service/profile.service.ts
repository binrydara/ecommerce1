import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { IResStock } from 'src/app/model.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends ApiService{
  public url: string = this.getBaseUrl();
  public url_onlineinventory: string = this.getBaseUrl_inventory();
  //  public token ='';

  // search(param:string):Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.get(this.url + 'gstore/find?q='+param,{headers:header});
  // }
  selmany():Observable<any> {
    const header = this.headerBase();
    return this.http.get(this.url + 'gstore_3apps/selmany',{headers:header});
  }
  new_profile(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url + 'gstore_3apps/new/',param,{headers:header});
  }
  update_profile(param:any,id:string):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url + 'gstore_3apps/edit/'+id,param,{headers:header});
  }
  SelectOneWithProfileUuid(id:string):Observable<any> {
    const header = this.headerBase();
    return this.http.get(this.url + 'gstore_3apps/SelectOneWithProfileUuid/'+id,{headers:header});
  }

  //================== product =========================
  
  SelectAll(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url_onlineinventory + 'product/SelectAll/',param,{headers:header});
  }
  Selectmany_active(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url_onlineinventory + 'product/Selectmany_active/',param,{headers:header});
  }
  Selectmany_active_byProductCode(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url_onlineinventory + 'product/Selectmany_active_byProductCode/',param,{headers:header});
  }
  new_product(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url_onlineinventory + 'product/new/',param,{headers:header});
  }
  edit_product(param:any,id:string):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url_onlineinventory + 'product/edit/'+id,param,{headers:header});
  }
  manage_stock(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url_onlineinventory + 'product/manage_stock/',param,{headers:header});
  }
  loadStock(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url_onlineinventory + 'stock/FindLatestByProductUuids/',param,{headers:header});
  }
  newMany_product(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url_onlineinventory + 'product/newMany/',param,{headers:header});
  }
  loadQtyFromStock(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url_onlineinventory + 'product/loadQtyFromStock/',param,{headers:header});
  }
  changeStatus(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url_onlineinventory + 'product/changeStatus/',param,{headers:header});
  }

  //================== post =========================

  getinventory(param:any){
    const header = this.headerBase();
    return this.http.post<IResStock>(this.url_onlineinventory + 'stock/getinventory/',param,{headers:header});
  }
  loadpost(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url + 'post_3apps/selmypost/',param,{headers:header});
  }
  new_post(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url + 'post_3apps/new/',param,{headers:header});
  }


  //================== Catecory ======================

  cat_selmany():Observable<any> {
    const header = this.headerBase();
    return this.http.get(this.url_onlineinventory + 'gproducttype/selmany/',{headers:header});
  }
  cat_search(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.get(this.url_onlineinventory + 'gproducttype/find?q='+param,{headers:header});
  }

   //================== Tags ======================

  // tag_selmany():Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.get(this.url_onlineinventory + 'tag/selmany/',{headers:header});
  // }
  // tag_search(param:string):Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.get(this.url_onlineinventory + 'tag/find?q='+param,{headers:header});
  // }

    //============ paymentmethodfee and shipmentmethodfee ===================
    loadpayment():Observable<any> {
      const header = this.headerBase();
      return this.http.get(this.url + 'paymentmethodfee/selmany/',{headers:header});
    }
    payment_search(param:any):Observable<any> {
      const header = this.headerBase();
      return this.http.get(this.url + 'paymentmethodfee/find?q='+param,{headers:header});
    }
    loadshipment():Observable<any> {
      const header = this.headerBase();
      return this.http.get(this.url + 'shipmentmethodfee/selmany/',{headers:header});
    }
    shipment_search(param:any):Observable<any> {
      const header = this.headerBase();
      return this.http.get(this.url + 'shipmentmethodfee/find?q='+param,{headers:header});
    }


  //============ Post ===================

  loadseconproduct(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url_onlineinventory + 'product/LoadManyProductByOwnerUuidAndUUIDs/',param,{headers:header});
  }

  //=========== gstore ==========

  loadstore(storeuuid:string):Observable<any> {
    const header = this.headerBase();
    return this.http.get(this.url + 'gstore_3apps/find_by_uuid/'+storeuuid,{headers:header});
  }
  
  // GetOwnerUuidByProfileUuid(param:any):Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.post(this.url + 'profile/GetOwnerUuidByProfileUuid',param,{headers:header});
  // }
  // GetProfileUuidByOwnerUuid(param:any):Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.post(this.url + 'profile/GetProfileUuidByOwnerUuid',param,{headers:header});
  // }
  // LoadGStoreByTags(param:any):Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.post(this.url + 'gstore/LoadGStoreByTags',param,{headers:header});
  // }

  //================ Address ===================
  // LoadAddress():Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.get(this.url + 'address/selmany',{headers:header});
  // }
  // new_address(param:any):Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.post(this.url + 'address/new',param,{headers:header});
  // }
  // update_address(param:any,id:string):Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.post(this.url + 'address/edit/'+id,param,{headers:header});
  // }
  // LoadAddressByOwnerUuid(param:any):Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.post(this.url + 'address/LoadAddressByOwnerUuid', param,{headers:header});
  // }
  // LoadStoreByProfileUuid(param:any):Observable<any>{
  //   const header = this.headerBase();
  //   return this.http.post(this.url + 'gstore/getbyprofileuuid?q='+param, {},{headers:header});
  // }
}
