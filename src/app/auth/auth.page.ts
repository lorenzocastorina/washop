import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../ajax.service';
import { ToastController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(
    private ajax: AjaxService,
    private toast: ToastController,
    private db: Storage,
    private modal: ModalController,
  ) { }

  email;
  password;

  callback;
  callback2

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  authUser() {
    const obj = {
      'user': {
        'email': this.email,
        'password': this.password
      }
    }

    this.ajax.post('users/sign_in.json', obj, true).subscribe( response => {
      this.db.set('user', response);
      this.modal.dismiss().then(() => {
        this.callback();
      })
    }, error => {
      this.presentToast("Credenziali errate")
    })
  }

  registerUser() {
    const obj = {
      'user': {
        'email': this.email,
        'password': this.password
      }
    }

    this.modal.dismiss().then(() => {
      this.callback2(obj);
    })

  }

  ngOnInit() {
  }

}
