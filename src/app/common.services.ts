import { Injectable, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from './data';
import { map } from 'rxjs/operators';



const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable({
    providedIn: "root"
})

export class CommonServices {

    TaskData = new EventEmitter<any>();
    value = new EventEmitter<Data>();
    handleError(data: any) {
        const newData = new Data(data);
        this.value.emit(newData);
    }
    response: Response;

    constructor(
        private router: Router,
        private http: HttpClient
    ) { }
    

    // Baseurl
    apiBaseurl = "http://localhost:8080";

    // Login 
    Login(User): Observable<any> {
        return this.http.post(this.apiBaseurl + '/userApi/login', User);
    }
    // Orders get
    Orders(): Observable<any>{
        return this.http.get(this.apiBaseurl + '/ordersApi/Orders');
    }
    // New Orders add 
    OrdersAdd(Orders):Observable<any>{
        return this.http.post(this.apiBaseurl + '/ordersApi/Ordersadd', Orders);
    }
    // Update data get
    OrdersUpdateDataget(Ordersid):Observable<any>{
        return this.http.post(this.apiBaseurl + '/ordersApi/Ordersupdateget', Ordersid);
    }
    // Orders update
    OrdersUpdate(OrdersUpdate):Observable<any>{
        return this.http.post(this.apiBaseurl + '/ordersApi/Ordersupdate', OrdersUpdate);
    }
    // Orders delete
    OrdersDelete(OrdersDelete):Observable<any>{
        return this.http.post(this.apiBaseurl + '/ordersApi/Ordersdelete', OrdersDelete);
    }
    
    
}