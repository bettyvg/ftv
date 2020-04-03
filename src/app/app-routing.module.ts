import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/map", pathMatch: "full" },
    { path: "login", loadChildren: () => import("~/app/login/login.module").then((m) => m.LoginModule) },
    { path: "account", loadChildren: () => import("~/app/account/account.module").then((m) => m.AccountModule) },
    { path: "register", loadChildren: () => import("~/app/register/register.module").then((m) => m.RegisterModule)},
    { path: "dialog", loadChildren: () => import("~/app/dialog/dialog.module").then((m) => m.DialogModule)},
    { path: "home", loadChildren: () => import("~/app/home/home.module").then((m) => m.HomeModule) },
    { path: "browse", loadChildren: () => import("~/app/browse/browse.module").then((m) => m.BrowseModule) },
    { path: "search", loadChildren: () => import("~/app/search/search.module").then((m) => m.SearchModule) },
    { path: "featured", loadChildren: () => import("~/app/featured/featured.module").then((m) => m.FeaturedModule) },
    { path: "settings", loadChildren: () => import("~/app/settings/settings.module").then((m) => m.SettingsModule) },
    { path: "map", loadChildren: () => import("~/app/map/map.module").then((m) => m.MapModule) },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
