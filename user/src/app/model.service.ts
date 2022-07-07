import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  constructor() {}

}

export interface ICart {
  storeUuid: string;
  product: IProduct
  isAddon: boolean
  qtty:number;
  value:number;
  ttqtty:number;
  ttvalue:number;
}

export interface IBase {
  id?: number;
  uuid?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  // deletedAt?:Date;
}
export interface IProductPost {
  ownerUuid: string;
  primaryProduct: IProductDetails;
  secondaryProducts: Array<IProductDetailsCompact>;
  addons: Array<IProductDetailsCompact>;
  productType: string;
  tags: Array<string>;
  prices: Array<number>;
  min: number;
  max: number;
  average: number;
  expiry_date: Date;
  saleCode: string;
  description: string;
  district: string;
  province: string;
  storeType: string;
}
export interface IProductDetails {
  inventory: IStock, product: IProduct
}
export interface IProductStocks {
  stock: Array<IStock>, product:Array<IProduct>
}
export interface IProductDetailsCompact {
  inventUuid: string, productUuid: string
}
export interface IProduct extends IBase {
  productTypes: string;
  productCode: string;
  productSN: string;
  manufacturer: string;
  weight: string;
  name: string;
  image: string;//path[]
  description: string;
  brand: string;
  unit: string;
  sku: string;
  tags: Array<string>;
  storeType: string;
  storeUuid: string;
  moreDetail: any;
  mrp: string;
}
export interface ISpec {
  color: string;
  dimensionPackage: string;
  dimensionNet: string;
  size: string;
  weight: string
}


export interface IStock extends IBase {
  productUuid: string;
  qtt: number;
  ttqtty: number;
  value: number;
  ttvalue: number;
  description: string;
  bywhom: string;
  direction: EDirection;
  expired: Date | undefined;
  ref: string;
}

export enum EDirection {
  sell = 'sell',
  defective = 'defective',
  expired = 'expired',
  lost = 'lost',
  stolen = 'stolen',
  warranty = 'warranty',
  others = 'others',


  purchase = 'purchase',
  reimport = 'reimport',
  transfer = 'transfer'
}
export interface IInventoryPS {
  primary: IStock,
  secondary: Array<IStock>
}
export interface IResponse {
  // data:any;
  message: string,
  code: string,
  status: number
}
export interface IResponseInventory extends IResponse {
  data: IInventoryPS;

}

