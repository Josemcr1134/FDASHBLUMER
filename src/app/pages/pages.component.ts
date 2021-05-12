import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { UserInformationComponent } from "../pages/user-information/user-information.component";
import { ChangePasswordComponent } from '../pages/change-password/change-password.component';
import { GlobalsService } from '../services/Globals/globals.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

constructor(private breakpointObserver: BreakpointObserver,
           public dialog: MatDialog, private Global: GlobalsService, private route: Router ) {}
           AccountDetails() {
            const dialogRef = this.dialog.open(UserInformationComponent);

            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
            });
          }
          name=this.Global.name;
           ChangePassword() {
            const dialogRef = this.dialog.open(ChangePasswordComponent);

            dialogRef.afterClosed().subscribe(result => {
              console.log(`Dialog result: ${result}`);
            });
          }

          ngOnInit(): void {
          }
          logout(){
            this.Global.logout()
            this.route.navigate([''])

          }
          close(){
             this.Global.showFilter = false;
          }

}
