import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { BaseUI } from '../../commom/baseui';
import { ResetProvider } from '../../providers/reset/reset';
import { Storage } from '@ionic/storage';
import { AnswerPage } from '../../pages/answer/answer';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


//@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI{
  
  public id: string;
  public question: string[];
  public answers: string[];
  public errorMessage: any;
  public isFavourite: boolean;
  public userid: string;
  public isMyQuestion: boolean;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public reset: ResetProvider,
    public storage: Storage,
    public modalCtrl: ModalController
    ) {
    super();
  }
  ionViewDidLoad() {
    this.id = this.navParams.get('id');
    this.getQuestion(this.id);
  }
  getQuestion(id){
    this.storage.get('UserId').then( userid => {
      if( userid != null ){
        this.userid = userid;
        let loading = super.showLoading(this.loadCtrl,"加载中...");
        this.reset.getQuestionWithUser(id,userid).subscribe( data => {
          loading.dismiss();
          this.question = data;
          this.answers = data['Answers'];
          this.isFavourite = data['isFavourite'];
          this.isMyQuestion = ( data['OwnUserId'] == userid );
          
        },error => this.errorMessage = <any>error );
      }
    });
  }
  favouriteUpdate(){
    
    this.storage.get('UserId').then( userid => {
      if(userid != null){
        let loading = super.showLoading(this.loadCtrl,"请求中...");
        this.reset.favouriteUpdate(this.id, this.userid).subscribe( data => {
           loading.dismiss();
           if(/ok/gi.test(data['Status'])){
              super.showToast( this.toastCtrl,this.isFavourite?'取消关注成功':'关注问题成功' );
              this.isFavourite = !this.isFavourite;
           }
        },error => this.errorMessage = <any>error );
      }
    })
  }
  
  showAnswerPage(){
    let modal = this.modalCtrl.create( AnswerPage,{
      "id":this.id
    });
    //关闭弹窗刷新页面
    modal.onDidDismiss( () => {
      this.getQuestion( this.id );
    })
    modal.present();
  }
}
