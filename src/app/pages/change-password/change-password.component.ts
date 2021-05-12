import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiRegisterService } from 'src/app/services/api-register/api-register-service.service';
import { GlobalsService } from '../../services/Globals/globals.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
 public actual_password: null
 public new_password
  hide = true;
  Twohide =  true
  constructor(private global: GlobalsService,private route: Router,
    private apiRegister: ApiRegisterService,
     private _snackBar: MatSnackBar,) { }

  ngOnInit(): void {
  }
  ChangePassword() {
    //this.confirm.set_phone(this.phone);
    let data = {
      actual_password: this.actual_password,
      new_password:   this.new_password,
/*       app_token: this.messagingService.token
 */    };
    this.apiRegister.ChangePasswordAdmin(this, data, this.changeSucces, this.ErrorChange);
  
  }
  openSnackBar(message: string, action: string, ) {
    this._snackBar.open(message, action,);
    
  }
  changeSucces(_this, data){
    _this.route.navigate(['/Pages'])
    _this.openSnackBar("Logrado", data.message[0]);

  }
  
  ErrorChange(_this, data) {
    //console.log("error " + data.error.errors[0]);
    _this.openSnackBar("Error", data.error.errors[0]);
  }
}
