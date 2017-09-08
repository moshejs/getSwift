import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { DroneService } from './drone.service';

import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';
import { CoordinateDistanceService } from './coordinate-distance.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MdCardModule, MdDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FlexLayoutModule,
    MdDialogModule,
    MdCardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB23nPayRbQyZpxzi693mhjfrJo3Frx5fc'
    })
  ],
  providers: [
    ApiService,
    DroneService,
    CoordinateDistanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
