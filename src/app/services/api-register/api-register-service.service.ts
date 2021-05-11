import {  Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { ApiBaseService } from '../api-base/api-base-service.service';
@Injectable({
  providedIn: 'root'
})


  export class ApiRegisterService {

    constructor(public apiBase: ApiBaseService) { }
  
    public urls = {
      urlSendCode:'/api/v1/register-person/sendcode_phone/',
      tipoServicio: '/api/v1/services/list-service-types/',
      loginServicio:'/dash/api/v1/auth/login',
      listUsers: '/dash/api/v1/user/users'
    }
  
    sendCodePhone = (_this, data , successHandler, errorHandler) =>{
      this.apiBase.postLogin(_this, this.urls.urlSendCode, data, successHandler, errorHandler);
    }
    tipo = ( _this, url, successHandler, errorHandler) => {
      this.apiBase.get(_this,this.urls.tipoServicio, successHandler, errorHandler);
    }
    login(_this, data, loginSuccess, loginError){
      this.apiBase.post(_this,this.urls.loginServicio, data, loginSuccess, loginError)
    }
    GetUsers = ( _this, url, successHandler, errorHandler) => {
      this.apiBase.doGet(_this,this.urls.listUsers,null, successHandler, errorHandler,false);
    }
  }
  

