import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  @Input() product;
  contatore;
  callback

  constructor(
    private modalController: ModalController
  ) { }

  close() {
    this.modalController.dismiss();
  }

  aggiungi() {
    if(this.contatore !== 32) {
      this.contatore++;
    }
  }

  rimuovi() {
    if(this.contatore !== 0) {
      this.contatore--
    }
  }

    addToCart(){
      this.modalController.dismiss().then(() => {
        this.callback(this.product, this.contatore);
      })
    }


  ngOnInit() {
    this.contatore = 0;
  }

}
