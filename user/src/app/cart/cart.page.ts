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
    {name:'ເສື້ອເຊີດຜູ້ຊາຍສີຂາວ',pic:'../../assets/icon/male.jpg',price:'500.000'},
    {name:'ເກີບຜ້າສີຂາວລາຍດຳ',pic:'../../assets/icon/shoe.jpg',price:'500.000'}
  ]
  ngOnInit() {
  }

}
