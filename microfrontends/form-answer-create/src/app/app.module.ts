import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { FormLoaderComponent } from './features/form-loader/form-loader.component';
import {FormioAppConfig, FormioModule} from "@formio/angular";
import {HttpClientModule} from "@angular/common/http";
import {AppConfig} from "./config/formio-config";


@NgModule({
  declarations: [
    AppComponent,
    FormLoaderComponent
  ],
  imports: [
    BrowserModule,
    FormioModule,
    HttpClientModule,
  ],
  providers: [
    {provide: FormioAppConfig, useValue: AppConfig}


  ]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, { injector: this.injector });
    // @ts-ignore
    customElements.define('form-amswer-create', el as any);
  }
}
