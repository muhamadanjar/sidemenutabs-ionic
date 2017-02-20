import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-jj',
  //templateUrl: 'jj.html',
  template: `
    <form (ngSubmit)="logForm()">
      <ion-item>
        <ion-label>Todo</ion-label>
        <ion-input type="text" [(ngModel)]="todo.title" name="title"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Description</ion-label>
        <ion-textarea [(ngModel)]="todo.description" name="description"></ion-textarea>
      </ion-item>
      <button ion-button type="submit" block>Add Todo</button>
    </form>
  `,
})
export class JaringanJalanFungsiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  todo = {}
  ionViewDidLoad() {
    console.log('ionViewDidLoad JaringanJalanFungsi');
  }

  logForm() {
    console.log(this.todo)
  }

  goBack() {
    this.navCtrl.pop();
  }

}
