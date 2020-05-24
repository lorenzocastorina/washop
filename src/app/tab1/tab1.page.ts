import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../ajax.service';
import * as _ from 'lodash';
import { ModalController } from '@ionic/angular';
import { CartPage } from '../cart/cart.page';
import { ProductPage } from '../product/product.page'
import { AuthPage } from '../auth/auth.page';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  categories = [];    // le differenti categorie tirate fuori
  products;   // tutti i prodotti messi insieme
  filteredProducts; // prodotti filtrati a seconda della categoria

  cart = [];
  salvatiPerDopo = [];
  counter = 0;
  total = 0;

  user

  constructor(
    private ajax: AjaxService,
    private modal: ModalController,
    private db: Storage
  ) { }

  retriveProducts() {
    this.ajax.get('products.json').subscribe(response => {
      this.products = response;
      _.each(response, product => {
        const product_categories = product.categories.split(',');
        _.each(product_categories, category => {
          if (_.indexOf(this.categories, category) === -1) {
            this.categories.push(category);
          }
        })
      })
    }, error => {
      console.log("errore sulla chiamata /products.json")
      console.log(error)
    })
  }

  getProductsByCategory(category) {
    this.filteredProducts = _.filter(this.products, product => {
      const categories = product.categories.split(',')
      return _.indexOf(categories, category) !== -1;
    })
  }

  addItemToCart(product) {
    if (this.user) {
      const index = _.indexOf(this.cart, product);    // vale la pena farlo const?
      if (index === -1) {
        this.cart.push(product)
        this.cart[this.cart.length - 1]['quantity'] = 1   // per aggiungere un nuovo campo
      } else {
        this.cart[index]['quantity']++;
      }

      this.counter++;
      this.total = this.total + product.purchasable_item.price;
    } else {
      this.auth();
    }

  }

  logout() {
    this.db.set('user', false);
    this.user = null;
  }

  addToCart(product, quantity) {

    if (this.user) {
      const index = _.indexOf(this.cart, product);    // vale la pena farlo const?
      if (index === -1) {
        this.cart.push(product)
        this.cart[this.cart.length - 1]['quantity'] = quantity   // per aggiungere un nuovo campo
      } else {
        this.cart[index]['quantity'] = this.cart[index]['quantity'] + quantity;
      }

      this.counter = this.counter + quantity
      this.total = this.total + (product.purchasable_item.price * quantity);
    } else {
      this.auth();
    }

  }

  async showCart() {
    const modal = await this.modal.create({
      component: CartPage,
      componentProps: {
        cart: this.cart,
        counter: this.counter,
        total: this.total,
        salvatiPerDopo: this.salvatiPerDopo,
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        this.cart = data.data.cart;
        this.counter = data.data.counter;
        this.total = data.data.total;
        this.salvatiPerDopo = data.data.salvatiPerDopo;
      });

    return await modal.present();
  }

  async showInfo(product) {
    const modal = await this.modal.create({
      component: ProductPage,
      componentProps: {
        product: product,
        callback: (product, quantity) => {
          this.addToCart(product, quantity);
        }

      }
    });

    return await modal.present();
  }

  ngOnInit() {
    this.getUser();
    this.retriveProducts();
  }

  async auth() {
    const modal = await this.modal.create({
      component: AuthPage,
      componentProps: {
        callback: () => {
          this.getUser();
        },
        callback2: (obg) => {
          this.registerNewUser(obg);
        }
      }
    })

    return await modal.present();
  }

  getUser() {
    this.db.get('user').then(resource => {
      this.user = resource;
    })
  }

  async registerNewUser(obj) {
    const modal = await this.modal.create({
      component: RegisterPage,
      componentProps: {
        obj: obj 
      }
    });

    return await modal.present();
  }

}
