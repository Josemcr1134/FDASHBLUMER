import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../../services/Globals/globals.service';
import { ApiRegisterService } from '../../services/api-register/api-register-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit {
  public  first_name: string = this.global.name
  public last_name: string =  this.global.last_Name
  public email: string = this.global.email
  public user_id: string = this.global.id
  durationInSeconds = 5;

  constructor(private global: GlobalsService, private apiRegister: ApiRegisterService ,
              private route: Router, private _snackBar: MatSnackBar,
     ) { }

  ngOnInit(): void {
  }

  chooseFile(event){
    let file = (<HTMLInputElement>event.targuet).files[0];
  }
  changePassword(){
    let data = {
      first_name: this.first_name,
      last_name:  this.last_name,
      email: this.email,
      user_id : this.user_id
/*       app_token: this.messagingService.token
 */    };
<<<<<<< HEAD
    this.apiRegister.EditUser(this, data, this.ChangeSucces, this.errorHandler);
  
=======
    this.apiRegister.ChangeAdminInfo(this, data, this.ChangeSucces, this.errorHandler);

>>>>>>> 4aab86cb39ecdf872f56c5ed317e95675d13ec4b
  }
  openSnackBar(message: string, action: string, ) {
    this._snackBar.open(message, action,);

  }

  ChangeSucces(_this, data ) {
    console.log(data.user.first_name);
      _this.global.name = data.user.first_name;
      _this.global.last_Name = data.user.last_name;
      _this.global.email = data.user.email;


    _this.global.setToken(data.token);
  }

  errorHandler(_this, data) {
    //console.log("error " + data.error.errors[0]);
    _this.openSnackBar("Error", data.error.errors[0]);
  }
  
}
