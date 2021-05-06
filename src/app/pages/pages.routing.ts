import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { EditInformationComponent } from './edit-information/edit-information.component';
import { CampaignComponent } from './campaign/campaign.component';
import { MarketplaceComponent } from './market-place/market-place.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UsersComponent } from './users/users.component';
import { PagesComponent } from './pages.component';
import { GuardsService } from '../services/Guard-services/guards.service';

const routes: Routes = [
    {path: 'Pages',
    component: PagesComponent,
    canActivate:[GuardsService],
    children:[
     {path: '', component: UsersComponent, canActivate:[GuardsService], },
      {path: 'campaign', component: CampaignComponent , canActivate:[GuardsService],},
      {path: 'marketPlace', component: MarketplaceComponent, canActivate:[GuardsService],},
      {path: 'transactions', component: TransactionsComponent, canActivate:[GuardsService],},
      {path: 'edit',component: EditInformationComponent, canActivate:[GuardsService],}
    ]
   },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
