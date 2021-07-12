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
      listUsers: '/dash/api/v1/user/users',
      transactionsList: '/dash/api/v1/user/transactions',
      CamapaignsList: '/dash/api/v1/ads/pending_ads',
      MarketPlaceList: '/dash/api/v1/products/pending_products',
      adminPasswordUrl: '/dash/api/v1/user/edit_user',
      sugeredUrl: '/dash/api/v1/user/suggested',
      changePasswordAdminUrl: '/dash/api/v1/user/change_password',
      changePasswordUserUrl: '/dash/api/v1/user/change_user_password',
      sendPointsUrl: '/dash/api/v1/user/send_points',
      uploadPhotourl: '/dash/api/v1/user/upload_photo',
      approveProductUrl: '/dash/api/v1/products/change_product_status',
      usersBlockeds: '/dash/api/v1/user/blocked_users',
      suggestedUserUrl: '/dash/api/v1/user/suggested',
      editUser: '/dash/api/v1/user/edit_user',
      approveCampaignUrl: '/dash/api/v1/ads/change_ad_status',

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
    GetUsersFilter = ( _this, args, successHandler, errorHandler) => {
      this.apiBase.doGet(_this,this.urls.listUsers, args, successHandler, errorHandler,false);
    }
    GetTransactions = ( _this, url, transaccionesObtenidas, errorHandler) => {
      this.apiBase.doGet(_this,this.urls.transactionsList,null, transaccionesObtenidas, errorHandler,false);
    }
    GetTransactionsFiltre = ( _this, args, transaccionesObtenidas, errorHandler) => {
      this.apiBase.doGet(_this,this.urls.transactionsList,args, transaccionesObtenidas, errorHandler,false);
    }
    GetCampaign = ( _this, url, CamapanasObtenidas, errorHandler) => {
      this.apiBase.doGet(_this,this.urls.CamapaignsList,null, CamapanasObtenidas, errorHandler,false);
    }
    GetMarketPlace = ( _this, url, ProductosObtenidos, errorHandler) => {
      this.apiBase.doGet(_this,this.urls.MarketPlaceList,null, ProductosObtenidos, errorHandler,false);
    }
    ChangeAdminInfo = (_this, data, ChangeSucces, errorHandler) =>{
      this.apiBase.put(_this,this.urls.adminPasswordUrl, data, ChangeSucces, errorHandler)
    }
    EditUser = (_this, data, ChangeSucces, errorHandler) =>{
    this.apiBase.put(_this,this.urls.editUser, data, ChangeSucces, errorHandler)
    }
    UploadFile = (_this, data, ChangeSucces, errorHandler) =>{
      const form = new FormData();
      form.append('data',"{\"user_id\": \""+ data +"\"}");
      form.append('file', _this.edtitPhoto);
      this.apiBase.postUploadFile(_this,this.urls.uploadPhotourl, form, ChangeSucces, errorHandler);
    }

    SuggestedUser = (_this, data, SuggestedSucces, errorHandler ) => {
      this.apiBase.put(_this, this.urls.sugeredUrl, data , SuggestedSucces, errorHandler)
    }
    ChangePasswordAdmin = (_this, data, changeSucces, ErrorChange) => {
      this.apiBase.post(_this,this.urls.changePasswordAdminUrl, data, changeSucces, ErrorChange)

    }
    ChangePasswordUser = (_this, data, changeSucces, ErrorChange) => {
      this.apiBase.post(_this,this.urls.changePasswordUserUrl, data, changeSucces, ErrorChange)

    }
    SendPoints = (_this, data, changeSucces, ErrorChange) => {
      this.apiBase.post(_this,this.urls.sendPointsUrl, data, changeSucces, ErrorChange);
    }
    ChangeStatusProduct = (_this, data, SuggestedSucces, errorHandler ) => {
      this.apiBase.put(_this, this.urls.approveProductUrl, data , SuggestedSucces, errorHandler)
    }

    ChangeStatusCampaign = (_this, data, SuggestedSucces, errorHandler ) => {
    this.apiBase.put(_this, this.urls.approveCampaignUrl, data , SuggestedSucces, errorHandler)
    }
    //https://blumer.app/dash/api/v1/user/blocked_users?page=1&q=cuetoadolfo
    GuetUsersBlockeds = ( _this, args, successHandler, errorHandler) => {
      this.apiBase.doGet(_this,this.urls.usersBlockeds, args, successHandler, errorHandler,false);
    }
    SuggestUser = (_this, data, SuggestedSucces, errorHandler ) => {
      this.apiBase.put(_this, this.urls.suggestedUserUrl, data , SuggestedSucces, errorHandler)
    }
  }


