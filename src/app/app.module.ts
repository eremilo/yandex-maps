import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularYandexMapsModule, YaConfig } from 'angular8-yandex-maps';
const mapConfig: YaConfig = {
  apikey: '69893404-4a37-4423-bde6-79fb80684c2a',
  lang: 'en_US',
};
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularYandexMapsModule.forRoot(mapConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
