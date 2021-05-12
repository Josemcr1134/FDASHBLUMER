
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiRegisterService } from 'src/app/services/api-register/api-register-service.service';
import { GlobalsService } from 'src/app/services/Globals/globals.service';
export interface Campaign_Type {
  ad_id: string,
  description: string,
  interactions: number,
  created_at: string,
  status: number;

}

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {
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
  displayedColumns: string[] = [ 'select', 'ad_id', 'description', 'interactions', 'created_at', 'status','menu'];
   dataSource = new MatTableDataSource<Campaign_Type>(this.servicios);
   selection = new SelectionModel<Campaign_Type>(true, []);
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
    this.apiRegister.GetCampaign(this,null,this.successFullFilter,this.errorHanndler);
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
  checkboxLabel(row?: Campaign_Type): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ad_id + 1}`;
  }
  listar() {
    //this.confirm.set_phone(this.phone);
    let path = this.apiRegister.urls.CamapaignsList;
    console.log(path);

    this.apiRegister.GetCampaign(this ,path, this.CamapanasObtenidas, this.errorHanndler);
  }

  CamapanasObtenidas(_this, data) {
    _this.servicios = data;
    _this.dataSource = data;
    _this.total = data.length;
    _this.size = data.length;
  }

  errorHanndler(_this, data) {
    console.log("error " + data.error.message);
  }
}
