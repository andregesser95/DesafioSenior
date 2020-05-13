import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoModule } from '@po-ui/ng-components';
import { HomeComponent } from './home/home.component';
import { LocalStorageModule } from "angular-2-local-storage";
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItensService } from './shared/services/itens.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PoModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LocalStorageModule.forRoot({
      storageType: 'localStorage'
    }),
    SharedModule.forRoot()
  ],
  providers: [
    ItensService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
