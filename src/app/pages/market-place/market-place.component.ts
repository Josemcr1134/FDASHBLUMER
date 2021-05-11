import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiRegisterService } from 'src/app/services/api-register/api-register-service.service';
import { GlobalsService } from 'src/app/services/Globals/globals.service';
export interface MarketPlace_Type {
  id: string,
  name: string,
  seller_name: string,
  price: number,
}

@Component({
  selector: 'app-marketplace',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.scss']
})
export class MarketplaceComponent implements OnInit {
  servicios: any[] = [];
  total: number;
  size: number;
  page = 0;
  constructor(public globals: GlobalsService, 
    public apiRegister: ApiRegisterService, router: Router, matDialog: MatDialog) { }
  ngOnInit(): void {
    this.listar()
  }
  displayedColumns: string[] = [ 'select', 'id', 'name',  'seller_name','price', 'menu'];
  dataSource = new MatTableDataSource<MarketPlace_Type>(this.servicios);
  selection = new SelectionModel<MarketPlace_Type>(true, []);

 
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
 checkboxLabel(row?: MarketPlace_Type): string {
   if (!row) {
     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
   }
   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
 }
 listar() {
  //this.confirm.set_phone(this.phone);
  let path = this.apiRegister.urls.MarketPlaceList;
  console.log(path);

  this.apiRegister.GetMarketPlace(this, path, this.ProductosObtenidos, this.errorHanndler);
}

ProductosObtenidos(_this, data) {
  _this.servicios = data;
  _this.dataSource = data;
  _this.total = data.length;
  _this.size = data.length;
}

errorHanndler(_this, data) {
  console.log("error " + data.error.message);
}
}
