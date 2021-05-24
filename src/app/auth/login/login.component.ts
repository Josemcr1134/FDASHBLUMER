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
  // tslint:disable-next-line:variable-name
  public user_name: null;
  public password: null;
  durationInSeconds = 5;
  hide = true;
  constructor(private route: Router,
              // tslint:disable-next-line:variable-name
              private apiRegister: ApiRegisterService,
              // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar,
              // tslint:disable-next-line:variable-name
              private _Globals: GlobalsService ) { }
  ngOnInit(): void { }
  // tslint:disable-next-line:typedef
  login() {
    const data = {
      username: this.user_name,
      password:   this.password,
/*       app_token: this.messagingService.token
 */    };
    this.apiRegister.login(this, data, this.LoginSuccess, this.loginError);
  }
  // tslint:disable-next-line:typedef
  openSnackBar(message: string, action: string, ) {
    this._snackBar.open(message, action,);
  }

  // tslint:disable-next-line:typedef variable-name
  LoginSuccess(_this, data ) {
    console.log(data.user.first_name);
    _this._Globals.name = data.user.first_name;
    _this._Globals.last_Name = data.user.last_name;
    _this._Globals.id = data.user.admin_id;
    _this._Globals.email = data.user.email;
    _this._Globals.photo = data.user.photo;
    _this._Globals.setToken(data.token);
    _this.route.navigate(['/Pages']);
  }

  // tslint:disable-next-line:typedef variable-name
  loginError(_this, data) {
    _this.openSnackBar('Error', data.error.errors[0]);
  }
}
