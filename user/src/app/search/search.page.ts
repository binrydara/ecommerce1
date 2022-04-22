import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  public gettag=false;

  constructor(private rout:Router) { }

  ngOnInit() {
  }

  detail(){
    this.rout.navigateByUrl('product-detail');
  }
}
