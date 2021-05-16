import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {User} from "../../models/User";
export interface Confirmar{
  payMethod: number;
  coupon: string;
}

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {
  private router: Router;
  public phone: string = null;
  public documento: string = null;
  public sms_code : number = null;
  public photo: string = null;
  public secret_phone: number = null;
  public name: string = null;
  public id: string = null;
  public email: string = null;
  public tipo_documento: string = null;
  public ciudad: string = null;
  public cod_referido: string = null ;
  public tipo_registro: number = null;
  public access: string = null;
  public nombre_empresa : string = null;
  public latitud = 0;
  public  longitud = 0;
  public direccion = "";
public distancia=0;
  public  latitud2 = 0;
  public  logitud2 = 0;
  public direccion2 = "";
  public time = 0;
  public descuento = 0;
  public valor = 0;
  public metodo =0;
  public markerChange: EventEmitter<any> = new EventEmitter<any>();
  public onCargaMasiva: EventEmitter<any> = new EventEmitter<any>();
  public nombreGoogle='';
  public correoGoogle='';
  public hasNotification = false;
  public last_Name : string;
  public showFilter = false;
  public userToEdit: User = new User();
  setToken(token: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('name', this.name);
    localStorage.setItem('id', this.id);
    localStorage.setItem('last_Name', this.last_Name);
    localStorage.setItem('photo', this.photo);
    localStorage.setItem('email', this.email);

    localStorage.setItem('phone', this.phone);
    localStorage.setItem('documento', this.documento);
    localStorage.setItem('tipo_documento', this.tipo_documento);
    localStorage.setItem('ciudad', this.ciudad);
    localStorage.setItem('cod_referido', this.cod_referido);


    this.access = token;
  }
  loadProfile(){
    //localStorage.setItem('token', token);
    this.name = localStorage.getItem('name');
    this.id = localStorage.getItem('id');
    this.last_Name = localStorage.getItem('last_Name');
    this.photo = localStorage.getItem('photo');
    this.email = localStorage.getItem('email');
    this.phone = localStorage.getItem('phone');
    this.documento = localStorage.getItem('documento');
    this.tipo_documento = localStorage.getItem('tipo_documento');
    this.ciudad = localStorage.getItem('ciudad');
    this.cod_referido = localStorage.getItem('cod_referido');
  }
  setUserEdit( user: User ){
    localStorage.setItem('edi_user_id', user.user_id);
    localStorage.setItem('edi_wallet', '' + user.wallet);
    localStorage.setItem('edi_suggested', '' + user.suggested);
    localStorage.setItem('edi_business', '' + user.business);
    localStorage.setItem('edi_entrepreneur', '' + user.entrepreneur);
    localStorage.setItem('edi_influencer', '' + user.influencer);
    localStorage.setItem('edi_gender', '' + user.gender);
    localStorage.setItem('edi_photo', user.photo);
    localStorage.setItem('edi_last_name', user.last_name);
    localStorage.setItem('edi_first_name', user.first_name);
    localStorage.setItem('edi_username', user.username);
    localStorage.setItem('edi_birthday', user.birthday);
    localStorage.setItem('edi_is_active', '' + user.is_active);
    this.userToEdit = user;
  }
  setEditWallet(data){
    localStorage.setItem('edi_wallet', '' + data);
  }
  setEditPhoto(data){
    localStorage.setItem('edi_photo', data);
  }
  getUserEdit(){
    let userEdit = new User();
    userEdit.user_id = localStorage.getItem('edi_user_id');
    userEdit.wallet = this.stringToNumber(localStorage.getItem('edi_wallet'));
    userEdit.suggested = this.stringToBoolean(localStorage.getItem('edi_suggested'));
    userEdit.business = this.stringToBoolean(localStorage.getItem('edi_business'));
    userEdit.entrepreneur = this.stringToBoolean(localStorage.getItem('edi_entrepreneur'));
    userEdit.influencer = this.stringToBoolean(localStorage.getItem('edi_influencer'));
    userEdit.gender = this.stringToNumber(localStorage.getItem('edi_gender'));
    userEdit.photo = localStorage.getItem('edi_photo');
    userEdit.last_name = localStorage.getItem('edi_last_name');
    userEdit.first_name = localStorage.getItem('edi_first_name');
    userEdit.username = localStorage.getItem('edi_username');
    userEdit.is_active = this.stringToBoolean(localStorage.getItem('edi_is_active'));
    userEdit.birthday = localStorage.getItem('edi_birthday');
    this.userToEdit = userEdit;
  }
  cleraruserEdit(){
    localStorage.removeItem('edi_user_id');
    localStorage.removeItem('edi_wallet');
    localStorage.removeItem('edi_suggested');
    localStorage.removeItem('edi_business');
    localStorage.removeItem('edi_entrepreneur');
    localStorage.removeItem('edi_influencer');
    localStorage.removeItem('edi_gender');
    localStorage.removeItem('edi_photo');
    localStorage.removeItem('edi_last_name');
    localStorage.removeItem('edi_first_name');
    localStorage.removeItem('edi_username');
    localStorage.removeItem('edi_birthday');
    localStorage.removeItem('edi_is_active');
  }
  stringToBoolean(data:String): Boolean{
    try{
      return (data=='true');
    }catch (e) {
      return false;
    }
  }
  stringToNumber(data: String): number
  {
    try{
      return  Number(data);
    }catch (e){
      return 0;
    }
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token ? token : '';
  }

  getId(): string {
    this.id = localStorage.getItem('id');
    return this.id;
  }
  getLastName(): string {
    this.last_Name = localStorage.getItem('last_Name');
    return this.id;
  }

  getPhoto(): string {
    this.photo = localStorage.getItem('document1');
    return this.photo;
  }
  getUser(): string{
    this.name = localStorage.getItem('username');
    return this.name;
  }
  getPhone(): string{
    this.phone = localStorage.getItem('phone');
    return this.phone;
  }
  getEmail(): string{
    this.email = localStorage.getItem('email');
    return this.email;
  }
  getDocumento(): string{
    this.documento = localStorage.getItem('documento');
    return this.documento;
  }
  getTipoDocumento(): string{
    this.tipo_documento = localStorage.getItem('tipo_documento');
    return this.tipo_documento;
  }
  getCodigoReferido(): string{
    this.cod_referido = localStorage.getItem('cod_referido');
    return this.cod_referido;
  }
  getCiudad(): string{
    this.ciudad = localStorage.getItem('ciudad');
    return this.ciudad;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('documento');
    localStorage.removeItem('tipo_documento');
    localStorage.removeItem('ciudad');
    localStorage.removeItem('last_Name');
    localStorage.removeItem('photo');
  }
  coloseFilter(){
    this.showFilter = false;
  }

}
