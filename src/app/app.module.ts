import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageModule } from './auth/auth.module';
import { LottieAnimationViewModule } from 'ng-lottie';
import { IonicStorageModule } from '@ionic/storage';
import { RegisterPageModule } from './register/register.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [IonicStorageModule.forRoot(), LottieAnimationViewModule.forRoot(), RegisterPageModule, AuthPageModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
