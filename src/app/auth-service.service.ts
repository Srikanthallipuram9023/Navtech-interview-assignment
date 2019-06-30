import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

@Injectable()
export class AuthServiceService implements CanActivate {
    constructor(private router: Router) { }
    canActivate() {
        if (localStorage.getItem("Loginuserdata") != null) {
            return true;
        } else {
            this.router.navigate(['/Login']);
            return false;
        }
    }
} 