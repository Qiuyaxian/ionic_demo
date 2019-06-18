import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ResetProvider} from '../../providers/reset/reset';
import { BaseUI } from '../../commom/baseui';
import { HeadfacePage } from '../headface/headface'
/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI{

  public nickname: string;
  public headface: string;
  public errorMessage: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public ViewCtrl: ViewController,
    public reset: ResetProvider
    ) {
    super();
  }


  ionViewDidLoad() {
    this.getUserIdHandle().then( val => {
      //加载用户信息 
      let loading = this.showLoading(this.loadCtrl,"加载中...");
      this.reset.getUserInfo( val ).subscribe( data => {
        this.nickname = data['UserNickName'];
        this.headface = `${data['UserHeadface']}?t=${new Date().valueOf()}`;  //防止缓存;
        loading.dismiss();
      },error => this.errorMessage = <any>error );
      
    })
  }

  updateNickNameHandle(){
    this.getUserIdHandle().then( val => {
      let loading = this.showLoading(this.loadCtrl,"提交中...");
      this.reset.updateNickName( val, this.nickname ).subscribe( data => {
         loading.dismiss();
         this.showToast( this.toastCtrl, data['Status'] == 'OK'?'修改成功！':data['StatusContent'] );
      }, error => this.errorMessage = <any> error);
    });
  }

  getUserIdHandle():any{
    return new Promise( ( resolve, reject ) => {
      this.storage.get('UserId').then( userid => {
        if(userid != null){
          resolve(userid);
        }else{ 
          reject(userid)
        }
      }).catch( err => {
        reject(err);
      })
    });
  }

  loginOutHandle(){
    this.storage.remove('UserId');
    this.ViewCtrl.dismiss();
  }
  
  gotoHeadFace(){
    this.navCtrl.push(HeadfacePage);
  }

}
