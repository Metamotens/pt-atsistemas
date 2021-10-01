import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { reducers } from "./store/app.states";
import { EffectsModule } from "@ngrx/effects";
import { MovieEffect } from "./store/movies/movie.effects";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([MovieEffect]),
    StoreDevtoolsModule.instrument({
      logOnly: !environment.production
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
