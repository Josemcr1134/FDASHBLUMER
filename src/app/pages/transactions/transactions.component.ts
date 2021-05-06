import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

export interface PeriodicElement {
  ID: number,
  Emisor: string,
  Receptor: string,
  CARBONPAY: number,
  Comision: number,
  fecha: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {ID: 1456, Emisor: ' Juan', Receptor: 'Pedro', Comision: 12, CARBONPAY:1567, fecha: '40/11/20' },
  {ID: 2341, Emisor: 'Jose ', Receptor: 'Kenny', Comision: 13, CARBONPAY:4345, fecha: '70/09/21'},
  {ID: 3452, Emisor: 'Vincenzo', Receptor: 'Juan', Comision: 8, CARBONPAY:987, fecha: '60/08/20'},
  {ID: 4789, Emisor: 'Ricardo', Receptor: 'Manuel', Comision: 4, CARBONPAY:7812, fecha:  '40/10/20'},
  
  
];
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

 
  displayedColumns: string[] = [ 'select', 'ID', 'Emisor', 'Receptor', 'CARBONPAY','Comision', 'fecha','menu'];
   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
   selection = new SelectionModel<PeriodicElement>(true, []);

  constructor() { }

  ngOnInit(): void {
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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ID + 1}`;
  }
}
