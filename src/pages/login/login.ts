import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../commom/baseui';
import { ResetProvider } from '../../providers/reset/reset';
import { RegisterPage } from '../register/register'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI{
  
  mobile: any;
  password: any;
  errorMessage: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ViewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public reset: ResetProvider,
    public storage : Storage
    ) {
      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    let loading = super.showLoading( this.loadingCtrl,'登陆中...' );
    this.reset.login(this.mobile,this.password).subscribe( data => {
       if(data['Status'] == 'OK'){
         //登陆成功
         this.storage.set('UserId',data['UserId']);
         loading.dismiss(); //关闭loading
         this.dismiss(); //关闭弹出
       }else{
         loading.dismiss(); //关闭loading层
         super.showToast(this.toastCtrl, data['StatusContent']);// 弹出错误
       }
    }, error => this.errorMessage = <any> error );
  }
  dismiss() {
    // 关闭modal
     this.ViewCtrl.dismiss();
  }
  pushRegisterPage(){
    this.navCtrl.push(RegisterPage);
  }
}
