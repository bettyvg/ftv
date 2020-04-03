import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ScannerComponent } from './scanner/scanner.component';

import * as platform from "tns-core-modules/platform";
import { MapComponent } from './map/map.component';
declare var GMSServices: any;

if (platform.isIOS) { 
    GMSServices.provideAPIKey("AIzaSyD0AXJg6YZxmReZ4PiZwBbzKILCX8sEBuc");
}


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        ScannerComponent,
        MapComponent,
    
        
        
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
