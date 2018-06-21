import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CustomerModule } from './components/customer/customer.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoadingDotComponent } from './components/loading-dot/loading-dot.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, LoadingDotComponent],
  imports: [BrowserModule, CustomerModule, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
