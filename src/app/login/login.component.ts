import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validator, FormControl, Validators } from '@angular/forms';
import { CommonServices } from '../common.services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // login formgroup name
  @Input() Loginform: FormGroup;
  // form submit check
  submitted: boolean = false;
  // submit api controller error
  SubmitapiErrors: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private Commonservices: CommonServices
  ) { }


  ngOnInit() {

    // set login formgruop controles
    this.Loginform = this.formBuilder.group({
      Email: new FormControl('', [Validators.required, Validators.email]),
      Password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

  }


  /* ==================================== login form submit controller ==============================*/


  // set controller for formgroup
  get f() {
    return this.Loginform.controls;
  }

  Loginformsubmit() {
    if (this.Loginform.invalid) {
      this.submitted = true;
    } else {
      console.log(this.Loginform.value);
      let Loginformdata = {
        "Email": this.f.Email.value,
        "Password": this.f.Password.value
      };
      // api call
      this.Commonservices.Login(Loginformdata).pipe(first())
      .subscribe(data => {
        var apiData: any = [];
        apiData = data;
        if(apiData.Success) {
          //console.log(apiData.Extra.Data);
          localStorage.setItem('Loginuserdata', JSON.stringify(apiData.Extra.Data));
          this.router.navigate(['/Orders']);
          // Or
          //this.router.navigateUrl('/Orders');
        } else {
          this.SubmitapiErrors = apiData.Extra.Message;
        }
      }),
      error => {
        console.log(error)
      }

    }

  }

}
