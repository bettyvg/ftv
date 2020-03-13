import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptFormsModule } from "nativescript-angular";

import { DialogRoutingModule } from "./dialog-routing.module";
import { DialogComponent } from "../dialog/dialog.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        DialogRoutingModule
    ],
    declarations: [
        DialogComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DialogModule { }
