import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../commom/baseui';
import { ResetProvider } from '../../providers/reset/reset';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the AnswerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-answer',
  templateUrl: 'answer.html',
})
export class AnswerPage extends BaseUI{
  
  public id: string;
  public errorMessage: any;
  public content: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public reset: ResetProvider,
    public storage: Storage,
    public viewCtrl: ViewController) {
      super();
      this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnswerPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
  
  submit(){
    this.storage.get('UserId').then(val => {
       if(val != null){
          let loading = super.showLoading(this.loadCtrl,"提交中...");
          this.reset.answerUpdate(val,this.id,this.content).subscribe( data => {
            
            if(data['Status'] == 'OK'){
              loading.dismiss();
               this.dismiss();
            }else{
              loading.dismiss();
              super.showToast( this.toastCtrl, data['StatusContent'] );
            }
          },error => this.errorMessage = <any>error );
       }
    });
  } 
}
