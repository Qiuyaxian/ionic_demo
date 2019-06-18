import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../commom/baseui';
import { ResetProvider } from '../../providers/reset/reset';
import { UserPage } from '../user/user';
import { UserDataDetailPage } from '../user-data-detail/user-data-detail'
import { SettingProvider } from '../../providers/setting/setting';
import { ScanPage } from '../scan/scan';
import { VersionPage } from '../version/version';
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage extends BaseUI{
  
  public nolign: boolean = true;
  public logined: boolean = false;
  public userinfo: Object;
  public headface: string;
  public errorMessage: any;
  public selectTheme: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public reset: ResetProvider,
    private setting: SettingProvider
    ) {
      super();
      this.setting.getActiveTheme().subscribe( val => {
         this.selectTheme = val;
      });
  }
  //生命周期函数
  ionViewDidLoad() {
    this.loadUser();
  }

  showModel(){
     let modal = this.modalCtrl.create( LoginPage );
     //关闭弹窗刷新事件
     modal.onDidDismiss( _ => {
        this.loadUser();
     });
     modal.present();// 显示弹出框
  }

  loadUser(){
    this.storage.get('UserId').then( userid => {
      console.log(userid,"user")
      if(userid != null){
        //加载用户信息
        let loading = this.showLoading(this.loadCtrl,"加载中...");
        this.reset.getUserInfo(userid).subscribe( data => {
          //  if(data['Status'] == 'OK'){
              
          //  }
          this.userinfo = data;
          this.headface = `${data['UserHeadface']}?t=${new Date().valueOf()}`;  //防止缓存;
          this.nolign = false;
          this.logined = true;
          loading.dismiss();
        },error => this.errorMessage = <any>error );
        
      }else{
        this.nolign = true;
        this.logined = false;
      }
    })
  }

  public gotoDataList(type:string){
    this.navCtrl.push(UserDataDetailPage, { "dataType":type })
  }
  public gotoUserPage(){
    this.navCtrl.push(UserPage);
  }
  /* 
     跳转扫码页面
  */
 
  public gotoScanPage(){
    this.navCtrl.push(ScanPage, null, { "animate" : false });
  }
  public gotoVersion(){
    this.navCtrl.push(VersionPage);
  }

  toggleChangeTheme(){
    if(this.selectTheme === 'dark-theme'){
      this.setting.setActiveTheme('light-theme');
    }else{
      this.setting.setActiveTheme('dark-theme');
    }
  }
}
