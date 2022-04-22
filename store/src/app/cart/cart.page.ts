import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  image="../../assets/icon/favicon.png"
  constructor() { }

  public test=[
    {name:'ເກີບ1',pic:'https://media.wired.com/photos/5e320d1dce1d970008fbe79a/3:2/w_1280%2Cc_limit/Gear-Books-100032_188_L_Hyperion_Elite.jpg',price:'500.000'},
    {name:'ເກີບ2',pic:'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/57/319977/1.jpg?5403',price:'500.000'}
  ]
  ngOnInit() {
  }

}
