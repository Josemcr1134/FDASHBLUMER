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
  public photo: string = this.global.photo
  durationInSeconds = 5;
  edtitPhoto: File ;
  srcPhoto;

  constructor(public global: GlobalsService, private apiRegister: ApiRegisterService ,
              private route: Router, private _snackBar: MatSnackBar,
     ) { }

  ngOnInit(): void {
  }

  choosePhoto(event): void
  {
    const file = event.target.files[0];
    //this.edtitPhoto = file;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => this.srcPhoto = reader.result;
    this.edtitPhoto = file;
  }
  changePassword(){
    let data = {
      first_name: this.first_name,
      last_name:  this.last_name,
      email: this.email,
      user_id : this.user_id,
      photo: this.photo
/*       app_token: this.messagingService.token
 */    };
    this.apiRegister.EditUser(this, data, this.ChangeSucces, this.errorHandler);
  
  }
  openSnackBar(message: string, action: string, ) {
    this._snackBar.open(message, action,);

  }

  ChangeSucces(_this, data ) {
    if(_this.edtitPhoto!=null){
      _this.apiRegister.UploadFile(_this, _this.global.id,function (_this,data){
        _this.global.photo = data.data;
        alert("Se guardaron los cambios");
        console.log("exito");
      },function (_this,data){
        console.log("error"+ data.error);
        alert("Error al cargar photo");
      });
    }
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
