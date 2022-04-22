import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private rout:Router) {}

  test=[
    {name:'sdsdasdasfsdfsdfsdfdsfsdfsdf',price:'500.000'},
    {name:'sdsdasdasfsdfsdfsdfdsfsdfsdf',price:'500.000'},
    {name:'sdsdasdasfsdfsdfsdfdsfsdfsdf',price:'500.000'}
  ]
  detail(){
    this.rout.navigateByUrl('product-detail');
  }
}
