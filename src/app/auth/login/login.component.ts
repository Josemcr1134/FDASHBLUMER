import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRegisterService } from '../../services/api-register-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UsersComponent } from 'src/app/pages/users/users.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user_name : null;
  public password: null;
  hide = true;
  constructor(private route: Router, private apiRegister: ApiRegisterService, private _snackBar: MatSnackBar ) { }
  durationInSeconds = 5;

  ngOnInit(): void {
  }
  login() {
    //this.confirm.set_phone(this.phone);
    let data = {
      username: this.user_name,
      password:   this.password,
/*       app_token: this.messagingService.token
 */    };
    this.apiRegister.login(this, data, this.ThenSendCode, this.errorHanndler);
  
  }
  openSnackBar(message: string, action: string, ) {
    this._snackBar.open(message, action,);
    
  }
  

  ThenSendCode(_this, data) {
    console.log(data.person.name);
    _this.globals.name = data.person.name;
    _this.globals.id = data.person.id;
    _this.globals.phone = data.person.phone;
    _this.globals.email = data.person.email;
    _this.globals.documento = data.person.number_document;
    _this.globals.tipo_documento = data.person.doc_type;
    _this.globals.ciudad = data.person.city;
    _this.globals.cod_referido = data.person.code_refer;
    _this.globals.photo = data.person.photo;
  
    _this.globals.setToken(data.access);
    _this.router.navigate(['/Pages'])
  }
  
  errorHanndler(_this, data) {
    console.log("error " + data);
    _this.openSnackBar("Error", "Usuario o contraseña incorrectos");
  }
  
}
