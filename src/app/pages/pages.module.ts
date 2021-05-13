import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';


import { CampaignComponent } from './campaign/campaign.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditInformationComponent } from './edit-information/edit-information.component';
import { MarketplaceComponent } from './market-place/market-place.component';
import { PagesComponent } from './pages.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { UsersComponent } from './users/users.component';

import {  MatFormFieldModule,   } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
    declarations: [
        CampaignComponent,
        ChangePasswordComponent,
        EditInformationComponent,
        MarketplaceComponent,
        TransactionsComponent,
        UserInformationComponent,
        UsersComponent,
        PagesComponent,
    ],
    imports: [CommonModule,
        RouterModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatSnackBarModule,
        MatIconModule,
        MatCardModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatMenuModule,
        MatTabsModule,
        MatTableModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatDialogModule,
        MatSlideToggleModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatPaginatorModule, MatSelectModule
    ],
    exports: [
        CampaignComponent,
        ChangePasswordComponent,
         EditInformationComponent,
         MarketplaceComponent,
        TransactionsComponent,
        UserInformationComponent,
        UsersComponent,
        PagesComponent
    ],
    providers: [],
})
export class pagesModule {}
