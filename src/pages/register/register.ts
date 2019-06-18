import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../commom/baseui';
import { ResetProvider } from '../../providers/reset/reset';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI{
  
  public mobile: any;
  public nickname: any;
  public password: any;
  public repassword: any;
  public erroeMessage: any;
  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ViewCtrl: ViewController,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public reset: ResetProvider
    ) {
      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  dismiss(){
    this.ViewCtrl.dismiss(); //关闭页面
  }
  registerHandle() {
    if(/^1[345789]\d{9}$/.test(this.mobile)){
      this.showToast( this.toastCtrl, '请输入正确的手机号码');
    }else if(this.nickname.length < 3 || this.nickname.length > 10){
      this.showToast( this.toastCtrl, '昵称名称长度不对');
    }else if(this.password.length < 6 || this.password.length > 20){
      this.showToast( this.toastCtrl, '密码长度不对');
    }else if(this.repassword.length < 6 || this.repassword.length > 20){
      this.showToast( this.toastCtrl, '确认密码长度不对');
    }else if(this.password == this.repassword){
      this.showToast( this.toastCtrl, '两次密码输入不对'); 
    }else{
      try{
        let loading = super.showLoading( this.loadCtrl,"注册中..." );
        this.reset.registerHandle( this.mobile, this.nickname, this.password ).subscribe( data => {
          if(data['Status'] == 'OK'){
              loading.dismiss(); // 关闭loading
              this.dismiss(); //关闭当前
          }else{
              loading.dismiss();
              this.showToast( this.toastCtrl, data['StatusContent']);
          }
        },error => this.erroeMessage = <any> error);
      }catch(e){
        console.log(e,"e");
      }
    }
    
    
  }
  gotoLogin(){
    this.navCtrl.pop(); //返回上一个层级，操作路由栈；
  }
}
