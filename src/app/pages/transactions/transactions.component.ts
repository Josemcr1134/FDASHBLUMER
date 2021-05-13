import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiRegisterService } from 'src/app/services/api-register/api-register-service.service';
import { GlobalsService } from 'src/app/services/Globals/globals.service';
import { MatPaginator } from '@angular/material/paginator';

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
export class TransactionsComponent implements OnInit, AfterViewInit{
  servicios: any[] = [];
  total: number;
  size: number;
  page = 0;

  displayedColumns: string[] = [ 'select', 'id', 'from_user', 'to_user', 'created_at','amount' ,'menu'];
   dataSource = new MatTableDataSource<transactions_type>(this.servicios);
   selection = new SelectionModel<transactions_type>(true, []);
   ngOnInit(): void {
    this.listar()
  }
   @ViewChild(MatPaginator) paginator: MatPaginator;
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
   constructor(public globals: GlobalsService, 
    public apiRegister: ApiRegisterService, router: Router, matDialog: MatDialog) { }

  
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
  checkboxLabel(row?: transactions_type): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  listar() {
    //this.confirm.set_phone(this.phone);
    let filters = '';
    filters += '?page=' + (this.page + 1);
    filters += '&q=' + 'cuetoadolfo';

    let path = this.apiRegister.urls.transactionsList + filters;
    console.log(path);

    this.apiRegister.GetTransactions(this, path, this.transaccionesObtenidas, this.errorHanndler);
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
