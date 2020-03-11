import { Component, OnInit } from '@angular/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { AutService } from '../services/aut.service';
import  * as app from "tns-core-modules/application";


@Component({
  selector: 'ns-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private autService: AutService) { 

  }

  ngOnInit() {
  }

  onDrawerButtonTap(): void{ 
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

}
