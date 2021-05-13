import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {GlobalsService} from "../../services/Globals/globals.service";
import {Router} from "@angular/router";
import {ApiRegisterService} from "../../services/api-register/api-register-service.service";
export interface PeriodicElement {
  ID: number,
  Photo: string,
  Name: string,
  lastName: string,
  CARBONPAY: number,
  tipo: string;
}
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
  filteredOptions: Observable<string[]>;
  password = new FormControl('', [Validators.required, Validators.email]);
  password1 = new FormControl('', [Validators.required, Validators.email]);
  valor:number = this.globals.userToEdit.wallet;
    hide = true;
    contador = 1
    cantidad = 3;
    sexo = "1";
  sumar = function () {
<<<<<<< HEAD
    this.contador + this.cantidad;
    console.log('sumar')
=======
    this.contador += this.cantidad;
    this.valor = +this.globals.userToEdit.wallet;
    this.globals.userToEdit.wallet = ( this.cantidad + this.valor);
    console.log('sumar');
>>>>>>> 4aab86cb39ecdf872f56c5ed317e95675d13ec4b

  }
  restar = function () {
<<<<<<< HEAD
    this.contador - this.cantidad;
    console.log('restar')
  } 
  constructor( ) { 
    
=======
    this.contador -= this.cantidad;
    this.globals.userToEdit.wallet=this.globals.userToEdit.wallet-this.cantidad;
    console.log('restar');
  }
  constructor( public globals:GlobalsService,private router:Router, public apiRegister:ApiRegisterService) {

>>>>>>> 4aab86cb39ecdf872f56c5ed317e95675d13ec4b
    }


  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  getErrorMessage() {
    if (this.password1.value === this.password.value) {
      return 'Contraseñas coinciden';
    } else {
     return 'Las contraseñas no coinciden';
    }

  }
  save(){
    this.apiRegister.ChangeAdminInfo(this,this.globals.userToEdit,this.successfullSaved,this.errorHandler);
  }
  successfullSaved(_this,data){
    alert("Se guardaron los cambios");
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
      new_password: this.password.value

    };
    this.apiRegister.ChangePasswordUser(this,data,this.successfullSaved,this.errorHandler);
  }

  sendPoints(){
    let data = {
      to: this.globals.userToEdit.user_id,
      amount: this.contador
    }
    this.apiRegister.SendPoints(this,data,this.successfullSaved,this.errorHandler);
  }

}
