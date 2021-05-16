import { SelectionModel } from '@angular/cdk/collections';
import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiRegisterService } from 'src/app/services/api-register/api-register-service.service';
import { GlobalsService } from 'src/app/services/Globals/globals.service';
import {MatPaginator} from '@angular/material/paginator';
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
  filter = "";
  search = "";
  items:any[]=[{}];
  constructor(public globals: GlobalsService,
    public apiRegister: ApiRegisterService, router: Router, matDialog: MatDialog) { }
  ngOnInit(): void {
    this.listar();
  }
  displayedColumns: string[] = [ 'select', 'id', 'name',  'seller_name','price', 'menu'];
  dataSource = new MatTableDataSource<MarketPlace_Type>(this.servicios);
  selection = new SelectionModel<MarketPlace_Type>(true, []);

  @ViewChild('paginator') set paginator(content: MatPaginator) {
    if (content) {
      this.dataSource.paginator = content;
    }
  }

  approveProduct(product){
    var data = {product_id:product.id,status:6,cancel_reason:"Producto aprobado"};
    this.apiRegister.ChangeStatusProduct(this,data,this.successApproveProduct,this.errorHandlerApproveProduct);
  }
  successApproveProduct(_this, data){
    alert("El producto fue "+data.message);
    _this.listar();
  }
  errorHandlerApproveProduct(_this,data){
    alert("Error, no se pudo aprobar el producto");
    console.log(data.message);
  }

  selectItem(item):void{
    this.filter = item.username;
    this.globals.showFilter = false;
    this.listar();
  }
  showSearchsItems(event):void{
    this.globals.showFilter = true;
    this.queryFilter();
    event.preventDefault();
    event.stopPropagation();
  }
  queryFilter(){
    //let args = [{name:"page",value:1},{name:"q",value:this.search}];
    this.apiRegister.GetMarketPlace(this,null,this.successFullFilter,this.errorHanndler);
  }
  successFullFilter(_this,data){
    _this.items = data;
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
