import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { GlobalsService } from '../../services/Globals/globals.service';
import {Router} from "@angular/router";
import {ApiRegisterService} from "../../services/api-register/api-register-service.service";
import { ApiBaseService } from 'src/app/services/api-base/api-base-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { ThrowStmt } from '@angular/compiler';
import { User } from '../../models/User';
export interface PeriodicElement {
  ID: number,
  Photo: string,
  Name: string,
  lastName: string,
  CARBONPAY: number,
  tipo: string;
}

@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.component.html',
  styleUrls: ['./edit-information.component.scss']
})
export class EditInformationComponent implements OnInit {
   
  myControl = new FormControl();
  options: string[] = ['Masculino', 'Femenino', 'Otro'];
  filteredOptions: Observable<string[]>;
  password = new FormControl('', [Validators.required, Validators.email]);
  password1 = new FormControl('', [Validators.required, Validators.email]);
  valor:number = this.globals.userToEdit.wallet;
  hide = true;
  contador = 0
  cantidad = 1;
   public user_id ;
   public archivos: any = [];
   public preview: File;

   sumar = function () {
   this.contador += this.cantidad;
   this.valor =+ this.globals.userToEdit.wallet;
    this.globals.userToEdit.wallet = ( this.cantidad + this.valor);
    console.log('sumar');

  }
  restar = function () {
    this.contador =- this.cantidad;
    this.valor =+ this.globals.userToEdit.wallet;

    this.globals.userToEdit.wallet = (  this.valor - this.cantidad);

     console.log('restar');
  } 
  constructor( public globals: GlobalsService, 
                private apiRegister: ApiRegisterService,
                private router: Router, 
                private apiBase: ApiBaseService ,
                private sanitizer: DomSanitizer,
                private http: HttpClient ) { 
    
    }
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
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
  capturarFile(event){
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.preview =  imagen.base;
      console.log(imagen)
    })
    this.archivos.push(archivoCapturado)
  }
  subirArchivo():any {
    try {
      const formularioDeDatos = new FormData()
      this.user_id = this.globals.userToEdit.user_id
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('file', archivo)
      });
      this.apiRegister.uploadPhoto(this.user_id, new FormData, this.SubidaFallida, this.SubidaCompletada)
    }
    catch{
      alert('error')
    }

  }
  
  SubidaCompletada(_this,data){
    alert('La foto ha sido actualizada')
  }
  SubidaFallida(_this,data){
    alert('ERROR' + data)
  }
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })
 
}
