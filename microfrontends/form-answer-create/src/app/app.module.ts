import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ToastComponent} from './features/common/toast/toast.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SurveyModule} from "survey-angular-ui";
import {FormLoaderComponent} from "./features/form-loader/form-loader.component";

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    FormLoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SurveyModule,
    NgbModule,
  ],
  providers: [

  ]
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, {injector: this.injector});
    // @ts-ignore
    customElements.define('form-amswer-create', el as any);
  }
}
