import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Injector} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: []
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, {injector: this.injector});
    customElements.define('answer-list', el);
  }
}
