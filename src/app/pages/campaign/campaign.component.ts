
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  ID: number,
  Category: string,
  Title: string,
  Location: string,
  Price: number,
  Date: string,
  Status: string;

}
const ELEMENT_DATA: PeriodicElement[] = [
  {ID: 1456, Category: 'Cepillos', Title: '@ambiTeath', Location: 'Barranquilla/Colombia', Price:1567, Date: '11/11/20', Status: 'ACTIVO' },
  {ID: 2341, Category: 'Tennis Deportivos ', Title: '@BSPORTS', Location: 'Santiago/Chile', Price:4345, Date: '11/09/21', Status: 'ACTIVO'},
  {ID: 3452, Category: 'Pitillos Reutilizables', Title: '@ambillos', Location: 'Buenos Aires/Argentina', Price:987, Date: '11/08/20', Status: 'ACTIVO'},
  {ID: 4789, Category: 'Bolsas Biodegradables', Title: '@BioBags', Location: 'Ciudad de mexico', Price:7812, Date:  '11/10/20', Status: 'ACTIVO'},
  
  
];
@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = [ 'select', 'ID', 'Category', 'Title', 'Location','Price', 'Date', 'Status','menu'];
   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
   selection = new SelectionModel<PeriodicElement>(true, []);

  
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
