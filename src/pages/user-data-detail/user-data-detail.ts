import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserDataDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-data-detail',
  templateUrl: 'user-data-detail.html',
})
export class UserDataDetailPage {
  public dataType:string;
  public title: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.get('dataType'),"navParams.get('dataType')")
    this.dataType = navParams.get('dataType');
    switch(this.dataType){
       case 'question':
        this.title = '我的提问' 
        break;
      case 'favourite':
        this.title = '我的关注' 
        break;
      case 'answer':
        this.title = '我的回答' 
        break;
    }
  }
  
  ionViewDidLoad() {
    
  }
}
