import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { LoginComponent } from './login/login.component';
import { AuthServiceService } from './auth-service.service';

const routes: Routes = [
  {
    path: "", 
    redirectTo: "Login",
    pathMatch: "full"
  },
  {
    path: "Login",
    component: LoginComponent,
    data: {
      title: "Home page"
    }
  },
  {
    path: "Orders",
    component: OrdersComponent,
    canActivate: [AuthServiceService],
    data: {
      title: "User Orders"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
