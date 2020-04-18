import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ConvertToSpacesPipe } from './pipes/convert-to-spaces.pipe';
import { StarComponent } from './products/star/star.component';
import {RouterModule} from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import {HttpClientModule} from '@angular/common/http';
import { ProductsDetailComponent } from './products/products-detail/products-detail.component';
import {ProductsDetailGuard} from './guards/products-detail.guard';


@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ConvertToSpacesPipe,
    StarComponent,
    WelcomeComponent,
    ProductsDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'products' , component: ProductsListComponent},
      {path: 'products/:id' , canActivate: [ProductsDetailGuard], component: ProductsDetailComponent},
      {path: 'welcome' , component: WelcomeComponent},
      {path: '**' , redirectTo: 'welcome'},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
