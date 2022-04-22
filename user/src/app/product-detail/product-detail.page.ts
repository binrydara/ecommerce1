import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  public pic:string="";
  public name:string="";

  constructor(private activeRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(r=>{

      let data=JSON.parse(r.data);

      this.name = data.name;
      this.pic = data.pic;
      // console.log(r);
      // console.log(data);
    })
  }

}
