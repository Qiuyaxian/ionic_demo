import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BaseUI } from '../../commom/baseui';
import { Storage } from '@ionic/storage';
import { ResetProvider } from '../../providers/reset/reset'
import { DetailsPage } from '../details/details'
/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage extends BaseUI{
  public messageError: any;
  public notifications: string[];
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage,
    public reset: ResetProvider,
    public loadCtrl: LoadingController
    ) {
      super();
  }

  ionViewDidLoad() {
    this.storage.get('UserId').then( val => {
       if(val != null){
         let loading = this.showLoading( this.loadCtrl,'加载中' );
         this.reset.getNotification(val).subscribe( res => {
            this.notifications = res;
            loading.dismissAll(); 
         },error => this.messageError = <any>error);
       }
    });
  }
  //跳转详情
  gotoDetails(id){
    this.navCtrl.push(DetailsPage,{
      id: id
    });
  }
}
