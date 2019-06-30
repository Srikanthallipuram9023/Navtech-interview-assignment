import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { CommonModule } from '@angular/common';
import { CommonServices } from './common.services';
import { HttpClientModule } from '@angular/common/http';

// ng-boostrap import
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { AuthServiceService } from './auth-service.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    ModalModule.forRoot()
  ],
  providers: [
    CommonServices,
    AuthServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
