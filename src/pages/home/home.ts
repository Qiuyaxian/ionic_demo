import { Component } from '@angular/core';
import { NavController, ModalController, Tabs, LoadingController } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { BaseUI } from '../../commom/baseui';
import { ResetProvider } from '../../providers/reset/reset';
import { DetailsPage } from '../details/details';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI{
  
  public feeds: string[];
  public errorMessage: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public reset: ResetProvider,
    public loadCtrl: LoadingController
    ) {
      super();
  }
  ionViewDidLoad(){
    this.getFeeds();
  }
  gotoQuestion(){
    let modal = this.modalCtrl.create(QuestionPage);
    modal.present();
  }
  gotoChat(){
    this.tabSelect(2);
  } 
  tabSelect(index: number){
    let tab: Tabs = this.navCtrl.parent;
    tab.select(index);
  }
  getFeeds() {
    let loading = this.showLoading(this.loadCtrl,"加载中...");
    this.reset.getFeeds().subscribe( data => {
      loading.dismiss();
      console.log(data);
       this.feeds = data;
    }, error => this.errorMessage = <any>error );
  }
  //跳转详情
  gotoDetails(id){
    this.navCtrl.push(DetailsPage,{
      id: id
    })
  
  }
  
}
