import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiRegisterService } from 'src/app/services/api-register/api-register-service.service';
import { GlobalsService } from 'src/app/services/Globals/globals.service';
import { PeriodicElement } from '../edit-information/edit-information.component';

export interface transactions_type {
  id: string,
  from_user: string,
  to_user: string,
  created_at: string,
  amount: number
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  servicios: any[] = [];
  total: number;
  size: number;
  page = 0;
  filter = "";
  search = "";
  items:any[]=[{}];

  displayedColumns: string[] = [ 'select', 'id', 'from_user', 'to_user', 'created_at','amount' ,'menu'];
   dataSource = new MatTableDataSource<transactions_type>(this.servicios);
   selection = new SelectionModel<transactions_type>(true, []);

   constructor(public globals: GlobalsService,
    public apiRegister: ApiRegisterService, router: Router, matDialog: MatDialog) { }

  ngOnInit(): void {
    this.listar();
  }
  selectItem(item):void{
    this.filter = item.username;
    this.globals.showFilter = false;
    this.listar();
  }
  showSearchsItems(event):void{
    this.globals.showFilter = true;
    this.queryFilterUser();
    event.preventDefault();
    event.stopPropagation();
  }
  queryFilterUser(){
    let args = [{name:"page",value:1},{name:"q",value:this.search}];
    this.apiRegister.GetUsersFilter(this,args,this.usuariosFiltrados,this.errorHanndler);
  }
  usuariosFiltrados(_this,data){
    _this.items = data;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.queryFilterUser();
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
  checkboxLabel(row?: transactions_type): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  listar() {
    //this.confirm.set_phone(this.phone);
    let args = [{name:"page",value:1},{name:"q",value:this.filter}];
    this.apiRegister.GetTransactionsFiltre(this, args, this.transaccionesObtenidas, this.errorHanndler);
  }

  transaccionesObtenidas(_this, data) {
    _this.servicios = data;
    _this.dataSource = data;
    _this.total = data.length;
    _this.size = data.length;
  }

  errorHanndler(_this, data) {
    console.log("error " + data.error.message);
  }
}
