import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatdetailsPage } from '../chatdetails/chatdetails';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  public userInfo: Object;
  public ChatdetailsPage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userInfo = {
       "userId" : "123321",
       "username" : "章三"
    };
    this.ChatdetailsPage = ChatdetailsPage;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }
}
