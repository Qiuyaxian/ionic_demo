import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../commom/baseui';
import { ResetProvider } from '../../providers/reset/reset';
import { DetailsPage } from '../details/details';
/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI{
  
  public questions: string[];
  public errorMessage: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public reset: ResetProvider
    ) {
    super();
  }

  ionViewDidLoad() {
    this.getQuestions();
  }
  getQuestions(){
    let loading = super.showLoading( this.loadCtrl,"加载中..." );
    this.reset.getDiscovery().subscribe( data => {
       loading.dismiss();
       this.questions = data;
    },error => this.errorMessage = <any>error );
  }
  doRefresh(refresher){
    this.getQuestions();
    refresher.complete();
  }

  gotoDetails(id){
    this.navCtrl.push(DetailsPage,{
      id: id
    })
  
  }
}
