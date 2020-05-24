import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { AjaxService } from '../ajax.service';
import { HttpClientModule } from '@angular/common/http';
import { CartPage } from '../cart/cart.page';
import { CartPageModule } from '../cart/cart.module';
import { ProductPage } from '../product/product.page';
import { ProductPageModule } from '../product/product.module';
import { AuthPage } from '../auth/auth.page';
import { AuthPageModule } from '../auth/auth.module';
import { RegisterPage } from '../register/register.page';
import { RegisterPageModule } from '../register/register.module';




@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    CartPageModule,
    ProductPageModule,
    RegisterPageModule,
    AuthPageModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  providers: [
    AjaxService
  ],
  declarations: [
    Tab1Page,
  ],
  entryComponents: [
    CartPage,
    ProductPage,
    AuthPage,
    RegisterPage
  ]
})
export class Tab1PageModule {}
