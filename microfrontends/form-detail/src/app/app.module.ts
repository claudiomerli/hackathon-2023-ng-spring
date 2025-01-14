import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { FormDetailComponent } from './form-detail/form-detail.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormDetailsServices} from "./services/form-details.services";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {SurveyCreatorModule} from "survey-creator-angular";

@NgModule({
  declarations: [
    AppComponent,
    FormDetailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterTestingModule,
    NgbModule,
    SurveyCreatorModule,
    NgbTooltipModule
  ],
  providers: [
    FormDetailsServices,
    HttpClient
  ]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('form-detail', el);
  }
}
