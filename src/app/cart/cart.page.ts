import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as _ from 'lodash';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  lottieConfig = {
    path: 'assets/animations/patata.json',
    renderer: 'svg',
    autoplay: true,
    loop: true
}; 

  @Input() cart;
  @Input() counter;   // a che serve mettere string?
  @Input() total;   //risolvere problema della lista salvata per dopo che riotrna a uno
  @Input() salvatiPerDopo;    // perchè dice can't read proprety of undefined quando nell altra tab lo utilizzo senza array?

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {
    // this.calcolaCounter();
  }

  add(product) {
    const index = _.indexOf(this.cart, product)
    this.cart[index].quantity++;
    this.counter++
    this.total = this.total + product.purchasable_item.price
  }

  remove(product) {
    const index = _.indexOf(this.cart, product)
    
    if(this.cart[index].quantity === 1) {
      _.remove(this.cart, item => {
        return item.id === product.id;
      })
    } else {
      this.cart[index].quantity--
    }

    this.counter--
    this.total = this.total - product.purchasable_item.price
  }

  delete(product) {
    _.remove(this.cart, item => {
      return item.id === product.id;
    })

    this.counter = this.counter - product.quantity
    this.total = this.total - (product.purchasable_item.price * product.quantity)
  }

  save(product) {
    _.remove(this.cart, item => {
      return item.id === product.id;
    })

    const index = _.indexOf(this.salvatiPerDopo, product)

    if(index === -1) {
      this.salvatiPerDopo.push(product);
    } else {
      this.salvatiPerDopo[index].quantity = this.salvatiPerDopo[index].quantity + product.quantity
    }

    this.counter = this.counter - product.quantity
    this.total = this.total - (product.purchasable_item.price * product.quantity)
  }

  addToCart(product) {
    _.remove(this.salvatiPerDopo, item => {
      return item.id === product.id;
    })

    const index = _.indexOf(this.cart, product)

    if(index === -1) {
      this.cart.push(product);
    } else {
      this.cart[index].quantity = this.cart[index].quantity + product.quantity
    }

    this.counter = this.counter + product.quantity
    this.total = this.total + (product.purchasable_item.price * product.quantity)
  }

  addFromSave (product) {
    const index = _.indexOf(this.salvatiPerDopo, product)
    this.salvatiPerDopo[index].quantity++;
  }

  removeFromSave(product) {
    const index = _.indexOf(this.salvatiPerDopo, product)
    
    if(this.salvatiPerDopo[index].quantity === 1) {
      _.remove(this.salvatiPerDopo, item => {
        return item.id === product.id;
      })
    } else {
      this.salvatiPerDopo[index].quantity--
    }
  }

  deleteFromSave(product) {
    _.remove(this.salvatiPerDopo, item => {
      return item.id === product.id;
    })
  }

  close() {
    this.modal.dismiss({
      cart: this.cart,
      counter: this.counter,
      total: this.total,
      salvatiPerDopo: this.salvatiPerDopo
    });
  }

  // calcolaCounter() {
  //   this.counter = 0;
  //   _.each(this.cart, item => {
  //     this.counter = this.counter + item.quantity;
  //   })
  // }

}
