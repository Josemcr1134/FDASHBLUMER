import {  Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { ApiBaseService } from './api-base-service.service';
@Injectable({
  providedIn: 'root'
})
export class ApiRegisterService {

  constructor(public apiBase: ApiBaseService) { }

  public urls = {
    urlSendCode:'/api/v1/register-person/sendcode_phone/',
    tipoServicio: '/api/v1/services/list-service-types/',
    loginServicio:'/dash/api/v1/auth/login/',
  }

  sendCodePhone = (_this, data , successHandler, errorHandler) =>{
    this.apiBase.postLogin(_this, this.urls.urlSendCode, data, successHandler, errorHandler);
  }
  tipo = ( _this, url, successHandler, errorHandler) => {
    this.apiBase.get(_this,this.urls.tipoServicio, successHandler, errorHandler);
  }
  login(_this, data, ThenSendCode, errorHanndler){
    this.apiBase.post(_this,this.urls.loginServicio, data, ThenSendCode, errorHanndler)
  }
}
