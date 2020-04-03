import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "nativescript-angular";

import { MapRoutingModule } from "./map-routing.module";
import { MapComponent } from "./map.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        MapRoutingModule
    ],
    declarations: [
        MapComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MapModule { }
