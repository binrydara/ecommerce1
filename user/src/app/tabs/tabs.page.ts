import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  selectTab:any;
  @ViewChild('tabs') tabs: IonTabs;
  
  constructor(private rout:Router) {}
  gohome(){
    this.rout.navigate(['/tabs/home'])
  }
  setCurrentTab(){
    this.selectTab= this.tabs.getSelected();
  }
}
