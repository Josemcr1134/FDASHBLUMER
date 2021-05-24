import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { UserInformationComponent } from '../pages/user-information/user-information.component';
import { ChangePasswordComponent } from '../pages/change-password/change-password.component';
import { GlobalsService } from '../services/Globals/globals.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver,
              public dialog: MatDialog, public Global: GlobalsService, private route: Router ) {
    if (Global.id == null){
      Global.loadProfile();
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  name = this.Global.name;
  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  AccountDetails() {
    const dialogRef = this.dialog.open(UserInformationComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  // tslint:disable-next-line:typedef
  ChangePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  // tslint:disable-next-line:typedef
  logout(){
    this.Global.logout();
    this.route.navigate(['']);

  }
  // tslint:disable-next-line:typedef
  close(){
    this.Global.showFilter = false;
  }

}
