import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { AjaxService } from '../ajax.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  email
  password
  name

  obj

  constructor(
    private modal: ModalController,
    private ajax: AjaxService,
    private toast: ToastController,
  ) { }

  ngOnInit() {
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  registerUser() {
    const obj = {
      'user': {
        'email': this.email,
        'password': this.password,
        "name" : this.name,
        "reset_password_app_id" : 1,
        "user_type": 2
      }
    }

    this.ajax.post('users.json', obj, true).subscribe(response => {
      console.log(response)
      this.modal.dismiss(); //da fare il login dopo essersi registrati !!!
    }, error => {
      this.presentToast("Errore")
    })
  
  }

}
