import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

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
  // login(username:string):Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.get(this.url + 'profile/find?q='+username,{headers:header});
  // }
  // selmany():Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.get(this.url + 'gstore/selmany',{headers:header});
  // }
  // new_profile(param:any):Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.post(this.url + 'profile/new/',param,{headers:header});
  // }
  // update_store(param:any,id:string):Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.post(this.url + 'store/Update_freelance/'+id,param,{headers:header});
  // }
  // selectOne_store():Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.get(this.url + 'store/getMyStore/',{headers:header});
  // }
  // selectOne_gstore(id:string):Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.get(this.url + 'gstore/selone/'+id,{headers:header});
  // }
  // selectOne_profile(id:string):Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.get(this.url + 'profile/selone/'+id,{headers:header});
  // }
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
  LoadAddress():Observable<any> {
    const header = this.headerBase();
    return this.http.get(this.url + 'address/selall',{headers:header});
  }
  new_address(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url + 'address/new',param,{headers:header});
  }
  update_address(param:any,id:string):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url + 'address/edit/'+id,param,{headers:header});
  }
  ChangeLocation(id:string):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url + 'address/changeLocation/'+id,{},{headers:header});
  }
  delete_address(id:string):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url + 'address/del/'+id,{},{headers:header});
  }

  //============ Post ===================
  loadpost(type:string):Observable<any> {
    const header = this.headerBase();
    return this.http.get(this.url + 'post_3apps/selmany_by_storetype/'+type,{headers:header});
  }
  loadseconproduct(param:any):Observable<any> {
    const header = this.headerBase();
    return this.http.post(this.url_onlineinventory + 'product/LoadManyProductByOwnerUuidAndUUIDs/',param,{headers:header});
  }

  //=========== gstore ==========

  loadstore(storeuuid:string):Observable<any> {
    const header = this.headerBase();
    return this.http.get(this.url + 'gstore_3apps/find_by_uuid/'+storeuuid,{headers:header});
  }


  // LoadAddressByOwnerUuid(param:any):Observable<any> {
  //   const header = this.headerBase();
  //   return this.http.post(this.url + 'address/LoadAddressByOwnerUuid', param,{headers:header});
  // }
  // LoadStoreByProfileUuid(param:any):Observable<any>{
  //   const header = this.headerBase();
  //   return this.http.post(this.url + 'gstore/getbyprofileuuid?q='+param, {},{headers:header});
  // }
}
