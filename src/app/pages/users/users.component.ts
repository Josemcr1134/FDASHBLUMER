import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections'
import { MatTableDataSource } from '@angular/material/table';
import { GlobalsService } from 'src/app/services/Globals/globals.service';
import { ApiBaseService } from 'src/app/services/api-base/api-base-service.service';
import { Router, UrlTree } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiRegisterService } from 'src/app/services/api-register/api-register-service.service';
export interface PeriodicElement {
  user_id: string,
  photo: string,
  first_name: string,
  last_name: string,
  wallet: string,
  tipo: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  servicios: any[] = [];
  total: number;
  size: number;
  page = 0;


   displayedColumns: string[] = [ 'select', 'user_id', 'photo', 'first_name', 'last_name', 'wallet','menu'];
   dataSource = new MatTableDataSource(this.servicios);
   selection = new SelectionModel(true, []);

  constructor(public globals: GlobalsService, 
              public apiRegister: ApiRegisterService, router: Router, matDialog: MatDialog) { }

  ngOnInit(
  ): void {
    this.listar();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.user_id + 1}`;
  }

  listar() {
    //this.confirm.set_phone(this.phone);
    let filters = '';
    filters += '?page=' + (this.page + 1);
    filters += '&q=' + 'cuetoadolfo';

    let path = this.apiRegister.urls.listUsers + filters;
    console.log(path);

    this.apiRegister.GetUsers(this, path, this.UsuariosObtenidos, this.errorHanndler);
  }

  UsuariosObtenidos(_this, data) {
    _this.servicios = data;
    _this.dataSource = data;
    _this.total = data.length;
    _this.size = data.length;
  }

  errorHanndler(_this, data) {
    console.log("error " + data.error.message);
  }
}

