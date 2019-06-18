import { Loading, LoadingController, ToastController, Toast } from 'ionic-angular';
//定义抽象类库
export abstract class BaseUI {
  constructor() {}
  
  protected showLoading( LoadingCtrl:LoadingController,message:string ): Loading {
     let loader = LoadingCtrl.create({
        content:message,
        dismissOnPageChange:true
     });
     loader.present();
     return loader;
  }

  protected showToast( ToastCtrl:ToastController,message:string ): Toast {
     let toaster = ToastCtrl.create({
       message: message,
       duration: 3000,
       position: 'buttom'
     });
     toaster.present();
     return toaster;
  }
}