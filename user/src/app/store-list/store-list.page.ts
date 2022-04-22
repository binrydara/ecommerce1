import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.page.html',
  styleUrls: ['./store-list.page.scss'],
})
export class StoreListPage implements OnInit {

  constructor(private rout:Router) { }

  ngOnInit() {
  }



  goto_detail(){
    this.rout.navigate(['/store-detail'])
  }
}
