import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';

import { pagesModule } from './pages/pages.module';

@NgModule({
  declarations: [
    AppComponent,
    NotpagefoundComponent,
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    pagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
