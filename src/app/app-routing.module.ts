import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { authRoutingModule } from './auth/auth.routing';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
   {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: NotpagefoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            authRoutingModule,
            PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
