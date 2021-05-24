import {Component, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalsService } from 'src/app/services/Globals/globals.service';
import { ApiBaseService } from 'src/app/services/api-base/api-base-service.service';
import { Router, UrlTree } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ApiRegisterService } from 'src/app/services/api-register/api-register-service.service';
import {MatPaginator} from '@angular/material/paginator';
import {defaultTargetBuilders} from '@angular/cdk/schematics';
import {User} from '../../models/User';
export interface PeriodicElement {
  user_id: string;
  photo: string;
  first_name: string;
  last_name: string;
  wallet: string;
  tipo: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  servicios: User[] = [];
  usersBlocked: User[] = [];
  total: number;
  size: number;
  page = 0;
  filter = '';
  search = '';
  items: any[] = [{}];

   displayedColumns: string[] = [ 'select', 'user_id', 'photo', 'first_name', 'last_name', 'wallet', 'menu'];
   dataSource = new MatTableDataSource(this.servicios);
   dataUsersBlocked = new MatTableDataSource(this.usersBlocked);
   dataUsersSuspending = new MatTableDataSource(this.servicios);
   selection = new SelectionModel(true, []);

  constructor(public globals: GlobalsService,
              public apiRegister: ApiRegisterService, private router: Router, matDialog: MatDialog) { }

  ngOnInit(
  ): void {
    this.listar();
    this.listUsersBlockeds();
  }

  @ViewChild('pagingUsersSuspending') set pagingUsersSuspending(content: MatPaginator) {
    this.setDataSourcePaginator(this.dataUsersSuspending, content);
  }
  // tslint:disable-next-line:typedef
  setDataSourcePaginator(
    dataSource: MatTableDataSource<any>,
    paginatorContent: MatPaginator
  ) {
    if (paginatorContent) {
      dataSource.paginator = paginatorContent;
    }
  }

  editUser(user): void
  {
    this.globals.cleraruserEdit();
    this.globals.setUserEdit(user);
    this.router.navigate(['/Pages/edit']);
  }

  selectItem(item): void{
    this.filter = item.username;
    this.globals.showFilter = false;
    this.listar();
  }

  // tslint:disable-next-line:typedef
  onScrollUsers(){
    //alert("se ejecuto la consulta");
  }

  onScrollUsersBlocked(){

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
  usuariosFiltrados(_this,data:User[]){
    var filtrados: User[] = new Array;
    for(let item of data){
      if(item.is_active){
        filtrados.push(item);
      }
    }
    _this.items = filtrados;
  }
  applyFilter(event: Event) {
    //const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.user_id + 1}`;
  }

  listar() {
    //this.confirm.set_phone(this.phone);
    let args = [{name:"page",value:(this.page + 1)},{name:"q",value:this.filter}];
    this.apiRegister.GetUsersFilter(this, args, this.UsuariosObtenidos, this.errorHanndler);
  }
  listUsersBlockeds(){
    let args = [{name:"page",value:(this.page + 1)},{name:"q",value:""}];
    this.apiRegister.GuetUsersBlockeds(this, args, this.successUsersBlockeds, this.errorHanndler);
  }

  filterList(list,x,y){
    let newList = [];
    for(var a of list){
      if(a[x]==y){
        newList.push(a);
      }
    }
    return newList;
  }

  successUsersBlockeds(_this, data){
    _this.usersBlockeds = data;
    _this.dataUsersBlocked = new MatTableDataSource(_this.usersBlockeds);

  }

  UsuariosObtenidos(_this, data) {
    _this.servicios = _this.filterList(data,"is_active",true);;
    _this.dataSource = new MatTableDataSource(_this.servicios);
    let usersBlocked = _this.filterList(data,"is_active",false);
    _this.dataUsersSuspending = new MatTableDataSource(usersBlocked);
    _this.dataUsersSuspending.paginator = _this.pagingUsersSuspending;
    _this.total = data.length;
    _this.size = data.length;
  }

  errorHanndler(_this, data) {
    console.log("error " + data.error.message);
  }

  BlockedUser(userBlocked){
    userBlocked.is_active = false;
    //this.globals.userToEdit = userBlocked;
    this.apiRegister.ChangeAdminInfo(this,userBlocked,this.successBlockedUser,this.errorHandlerBlockedUser);
  }
  successBlockedUser(_this, data){
    _this.listar();
    alert("El usurio fue bloquedo con exito");
    //_this.globals.setUserEdit(_this.globals.userToEdit);
    //_this.router.navigate(['/Pages/edit']);
  }
  errorHandlerBlockedUser(_this, data){
    _this._snackBar.open("error", data.error.errors[0]);
  }
}

