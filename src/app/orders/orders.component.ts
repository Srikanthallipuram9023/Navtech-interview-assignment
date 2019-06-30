import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServices } from '../common.services';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  // Current login userdata
  Loginuserdata: any;
  // No data error
  NodataError: any;
  // Orders data for displaying table view part 
  OrderData: any;

  // form submitted handle error
  submitted: boolean = false;

  // orders formgroup name declare
  Ordersform: FormGroup;

  // Update orderid set
  Update_Orderid: String;

  // new  and edit order popup open function
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }


  constructor(
    private modalService: BsModalService,
    private router: Router,
    private Commonservice: CommonServices,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // Loginuser data get in session storage data
    this.Loginuserdata = JSON.parse(localStorage.getItem('Loginuserdata'));

    // Orders get for table view
    this.Ordersdataget();

    // formgroup set controles
    this.Ordersform = this.formBuilder.group({
      Ordernumber: new FormControl('', [Validators.required]),
      Duedate: new FormControl('', [Validators.required]),
      Customername: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      Mobile: new FormControl('', [Validators.required]),
      Total: new FormControl('', [Validators.required])
    });
  }





  /*======================================= New Orders create update =======================================*/

  // handling add and update in single form
  // Success message save
  AlertSucess: any;
  // update success
  UpdateAlertSucess: any;

  get f() {
    return this.Ordersform.controls;
  }

  OrdersFormsave() {
    if (this.Ordersform.invalid) {
      this.submitted = true;
    } else {
      let Ordersaformdata = {
        "USERID": this.Loginuserdata.USERID,
        "ORDERSID": this.Update_Orderid,
        "Ordernumber": this.f.Ordernumber.value,
        "Duedate": this.f.Duedate.value,
        "Customername": this.f.Customername.value,
        "Address": this.f.Address.value,
        "Mobile": this.f.Mobile.value,
        "Total": this.f.Total.value
      }

      if (this.Update_Orderid == null) {
        // add api call controller 
        this.Commonservice.OrdersAdd(Ordersaformdata).pipe(first())
          .subscribe(data => {
            var apiData: any = [];
            apiData = data;
            if (apiData.Success) {
              // if navigate to another page we can use this
              //session Or localStorage
              /* localStorage.setItem('Orederadd_Success', JSON.stringify(apiData.Extra.Message));
              this.router.navigate(['/OrdersList']); */
              // now iam using this method
              this.modalRef.hide();
              this.Ordersdataget();
              if (apiData.Extra.Message == 6) {
                this.AlertSucess = apiData.Extra.Message;
              }
            } else {
              //this.Errormessage = apiData.Extra.Message;
              console.log(apiData.Extra.Message);
            }
          }),
          error => {
            console.log(error);
          }
      } else {
        // update order api call controller
        this.Commonservice.OrdersUpdate(Ordersaformdata).pipe(first())
          .subscribe(data => {
            var apiData: any = [];
            apiData = data;
            if (apiData.Success) {
              this.modalRef.hide();
              this.Ordersdataget();
              if (apiData.Extra.Message == 9) {
                this.UpdateAlertSucess = apiData.Extra.Message;
              }
            } else {
              console.log(apiData.Extra.Message);
            }
          }),
          error => {
            console.log(error);
          }
      }
    }
  }

  // close success alert 
  closeAlert(){
    this.AlertSucess = false;
    this.UpdateAlertSucess = false;
  }





  /* ================================ Order Update data get ======================================== */

  UpdateOrder(ORDERSID, template) {
    // popup open
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    let OrderUpdatedataget = {
      "ORDERSID": ORDERSID
    };
    this.Commonservice.OrdersUpdateDataget(OrderUpdatedataget).pipe(first())
      .subscribe(data => {
        var apiData: any = [];
        apiData = data;
      console.log(apiData);
        if (apiData.Success) {
          this.Update_Orderid = apiData.Extra.Data.ORDERSID;
          this.Ordersform.setValue({
            Ordernumber: apiData.Extra.Data.Ordernumber,
            Duedate:  apiData.Extra.Data.Duedate,
            Customername: apiData.Extra.Data.Customername,
            Address: apiData.Extra.Data.Address,
            Mobile: apiData.Extra.Data.Mobile,
            Total: apiData.Extra.Data.Total
          })
        } else {
          this.NodataError = apiData.Extra.Message;
        }
      }),
      error => {
        console.log(error);
      }
  }







  /* ====================================== Order delete ============================================= */
  DeleteAlertSucess: any;
  // customer name
  DeleteCustomername: string;
  // get Delete Orderid
  Delete_Orderid: String;
  // Cancel delete popup confirm alert
  decline(){
    this.modalRef.hide();
  }
  // click on delete button 
  ConfirmopenModal(ORDERSID, Customername, Confirmtemplate: TemplateRef<any>) {
    this.DeleteCustomername = Customername;
    this.Delete_Orderid = ORDERSID;
    this.modalRef = this.modalService.show(Confirmtemplate, { class: 'modal-md' });
  }
  // Click confirm button
  Deleteconfirm() {
    let DeleteOrderid_query = {
      "ORDERSID": this.Delete_Orderid
    }
    // api Call or Controller
    this.Commonservice.OrdersDelete(DeleteOrderid_query).pipe(first())
      .subscribe(data => {
        var apiData: any = [];
        apiData = data;
        if (apiData.Success) {
          this.modalRef.hide();
          this.Ordersdataget();
          if( apiData.Extra.Message == 10 ) {
            this.DeleteAlertSucess = apiData.Extra.Message;
          } 
        } else {
          console.log(apiData.Extra.Message)
        }
      }),
      error => {
        console.log(error);
      };
  }


  /* ===================================== Orders data get ================================================= */

  Ordersdataget() {
    // api calss
    this.Commonservice.Orders().pipe(first())
      .subscribe(data => {
        var apiData: any = [];
        apiData = data;
        if (apiData.Success) {
          this.OrderData = apiData.Extra.Data;
        } else {
          this.NodataError = apiData.Extra.Message;
        }
      }),
      error => {
        console.log(error);
      }
  }



  /* ======================================== Logout controller ======================================== */
  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/Login']);
  }

}
