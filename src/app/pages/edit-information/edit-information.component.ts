import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {GlobalsService} from "../../services/Globals/globals.service";
import {Router} from "@angular/router";
import {ApiRegisterService} from "../../services/api-register/api-register-service.service";
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from "@angular/material/snack-bar";
export interface PeriodicElement {
  ID: number,
  Photo: string,
  Name: string,
  lastName: string,
  CARBONPAY: number,
  tipo: string;
}
function equalsValidator(otherControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const value: any = control.value;
    const otherValue: any = otherControl.value;
    return otherValue === value ? null : { 'notEquals': { value, otherValue } };
  };
}

export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

export const CustomValidators = {
  equals: equalsValidator
};
const ELEMENT_DATA: PeriodicElement[] = [
  {ID: 1, Photo: '', Name: 'Pedro', lastName: 'Perez', CARBONPAY:1567, tipo: 'NORMAL' },
  {ID: 2, Photo: '', Name: 'Jose', lastName: 'Cuello', CARBONPAY:4345, tipo: 'INFLUENCER'},
  {ID: 3, Photo: '', Name: 'Juan', lastName: 'Royo', CARBONPAY:987, tipo: 'EMPRENDIMIENTO'},
  {ID: 4, Photo: '', Name: 'Ricardo', lastName: 'Lopez', CARBONPAY:7812, tipo: 'NORMAL'},
  {ID: 5, Photo: '', Name: 'Ernesto', lastName: 'Ruiz', CARBONPAY:5432, tipo: 'EMPRENDIMIENTO'},
  {ID: 6, Photo: '', Name: 'Carlos', lastName: 'Rodriguez', CARBONPAY:3098, tipo: 'NORMAL'},
  {ID: 7, Photo: '', Name: 'Maria', lastName: 'Viera', CARBONPAY:3022, tipo: 'INFLUENCER'},
  {ID: 8, Photo: '', Name: 'Annie', lastName: 'Jimeno', CARBONPAY:2309, tipo: 'EMPRESA'},

];
@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.component.html',
  styleUrls: ['./edit-information.component.scss']
})
export class EditInformationComponent implements OnInit {
   displayedColumns: string[] = [ 'select', 'ID', 'Category', 'Title', 'Location','Price', 'Date', 'Status','menu'];
   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  myControl = new FormControl();
  options: string[] = ['Masculino', 'Femenino', 'Otro'];
  listGenders: Genero[] = [{code:1, name: 'Masculino'},{code: 2, name: 'Femenino'},{code: 3, name: 'Otro'}];
  filteredOptions: Observable<string[]>;
  password = new FormControl('', [Validators.required]);
  password1 = new FormControl('', [Validators.required, Validators.minLength(6)]);
  valor: number = this.globals.userToEdit.wallet;
    hide = true;
    contador = 0;
    cantidad = 1;
    sexo = '1';
  edtitPhoto: File ;
  srcPhoto;
  valido = false;

  formGroup: FormGroup | null = null;


  sumar = function () {
    this.contador += this.cantidad;
    this.valor = +this.globals.userToEdit.wallet;
    console.log('sumar');

  }
  restar = function () {
    this.contador -= this.cantidad;
    if(this.contado<0) this.contador = this.cantidad;
    console.log('restar');
  }
  constructor( public globals:GlobalsService,private router:Router,
               public apiRegister:ApiRegisterService,
               private _snackBar: MatSnackBar,
               private fb: FormBuilder) {
    /*this.formGroup = this.fb.group({
      password: this.password,
      password1: this.password1
    });*/

    /*this.formGroup.get('password1').setValidators(
      CustomValidators.equals(this.formGroup.get('password'))
    );*/
    this.formGroup = fb.group({
      password: ['', [Validators.required]],
      password1: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'password1')
    });

    }


  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.initUserEdit();
    this.edtitPhoto = null;

  }
  initUserEdit(){
    if(this.globals.userToEdit.user_id == null){
      this.globals.getUserEdit();
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  private sertSrcPhoto(data){

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  getErrorMessage() {
    console.log(this.password.invalid);
    if ((this.formGroup.get('password').value as string)===(this.formGroup.get('password1').value as string)) {
      return 'Contrase??as coinciden';
    } else {
     return 'Las contrase??as no coinciden';
    }

  }
  validate(){
    if((this.formGroup.get('password').value as string)===(this.formGroup.get('password1').value as string)){
      this.valido = true;
    }else{
      this.valido = false;
    }
  }
  save(){
    if(this.globals.userToEdit.suggested != this.globals.getEditSuggsted()){
      let data = {user_id:this.globals.userToEdit.user_id,suggested:this.globals.userToEdit.suggested};
      this.apiRegister.SuggestUser(this, data, this.successfullSuggestUser,this.errorHandlerSuggestUser);
    }else{
      this.apiRegister.ChangeAdminInfo(this,this.globals.userToEdit,this.successfullSaved,this.errorHandler);
    }

  }

  successfullSuggestUser(_this, data){
    _this.apiRegister.ChangeAdminInfo(_this,_this.globals.userToEdit,_this.successfullSaved,_this.errorHandler);
  }

  errorHandlerSuggestUser(_this, data){
    alert("Error al sugerir usuario");
  }

  successfullSaved(_this,data){

    if(_this.edtitPhoto!=null){
      //var formData =  FormtData();
      //formtdata.append('data',{user_id:_this.globals.userToEdit.user_id});
      //formtdata.append('file', _this.file);
      _this.apiRegister.UploadFile(_this, _this.globals.userToEdit.user_id,function (_this,data){
        _this.globals.userToEdit.photo = data.data;
        _this.globals.setEditPhoto(data.data);
        alert("Se guardaron los cambios");
        console.log("exito");
      },function (_this,data){
        console.log("error"+ data.error);
        alert("Error al cargar photo");
      });
    }else{
      alert("Se guardaron los cambios");
    }
  }
  successSendEnpoints(_this,data){
    alert("Se guardaron los cambios");
    _this.globals.userToEdit.wallet = (+_this.globals.userToEdit.wallet)+_this.contador;
    _this.globals.setEditWallet(_this.globals.userToEdit.wallet);
  }
  errorHandler(_this,data){
    alert("Error");
    console.log("Error "+data);
  }
  cancel(){
    this.router.navigate(['/Pages/']);
  }

  savePasword(){
    let errors = this.password.errors;
    if(errors!=null){
      console.log(errors);
    }
    let  data = {
      user_id: this.globals.userToEdit.user_id,
      new_password: (this.formGroup.get('password').value as string)

    };
    this.apiRegister.ChangePasswordUser(this,data,function (_this,data){
      alert("Se cambio la contrase??a con exito");
    },this.errorHandler);
  }

  sendPoints(){
    let data = {
      to: this.globals.userToEdit.user_id,
      amount: this.contador
    }
    this.apiRegister.SendPoints(this,data,this.successSendEnpoints,this.errorHandler);
  }

}
export class Genero{
  code:number;
  name:string;
}
