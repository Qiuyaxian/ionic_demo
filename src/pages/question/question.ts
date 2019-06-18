import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../commom/baseui';
import { ResetProvider } from '../../providers/reset/reset';
/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage extends BaseUI{
  
  public title: string;
  public content: string;
  public errorMessage: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ViewCtrl: ViewController,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public resst: ResetProvider
    ) {
      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
  }
  
  dismiss(){
    this.ViewCtrl.dismiss();
  }
  submitQuestion(){
    this.storage.get('UserId').then( val => {
       if(val != null){
         let loading = super.showLoading( this.loadCtrl,"提交中..." );
         this.resst.saveQuestion(val,this.title, this.content).subscribe( data => {
           if(data['Status'] == 'OK'){
             loading.dismiss();
             this.dismiss();
           }else{
            loading.dismiss();
             super.showToast( this.toastCtrl, data['StatusContent'] );
           }
         }, error => this.errorMessage = <any>error );
       }else{
        super.showToast( this.toastCtrl, '请登陆后再发布');
       }
    });
  }
}
