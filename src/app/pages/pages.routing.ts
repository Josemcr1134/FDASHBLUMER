import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { EditInformationComponent } from './edit-information/edit-information.component';
import { CampaignComponent } from './campaign/campaign.component';
import { MarketplaceComponent } from './market-place/market-place.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UsersComponent } from './users/users.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    {path: 'Pages',
    component: PagesComponent,
    children:[
     {path: 'users', component: UsersComponent, },
      {path: 'campaign', component: CampaignComponent},
      {path: 'marketPlace', component: MarketplaceComponent},
      {path: 'transactions', component: TransactionsComponent},
      {path: 'edit',component: EditInformationComponent}
    ]
   },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
