import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRegisterService } from '../../services/api-register/api-register-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { GlobalsService } from 'src/app/services/Globals/globals.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user_name : null;
  public password: null;
  durationInSeconds = 5;
  hide = true;
  constructor(private route: Router,
               private apiRegister: ApiRegisterService,
                private _snackBar: MatSnackBar,
                private _Globals: GlobalsService ) { }
  ngOnInit(): void { }
  login() {
    //this.confirm.set_phone(this.phone);
    let data = {
      username: this.user_name,
      password:   this.password,
/*       app_token: this.messagingService.token
 */    };
    this.apiRegister.login(this, data, this.LoginSuccess, this.loginError);
  
  }
  openSnackBar(message: string, action: string, ) {
    this._snackBar.open(message, action,);
    
  }
  

  LoginSuccess(_this, data ) {
    console.log(data.user.first_name);
      _this._Globals.name = data.user.first_name;
      _this._Globals.last_Name = data.user.last_name;
      _this._Globals.id = data.user.admin_id;
      _this._Globals.email = data.user.email;
      _this._Globals.photo = data.user.photo;
    
    _this._Globals.setToken(data.access);
    _this.route.navigate(['/Pages'])
  }
  
  loginError(_this, data) {
    //console.log("error " + data.error.errors[0]);
    _this.openSnackBar("Error", data.error.errors[0]);
  }
  
}
