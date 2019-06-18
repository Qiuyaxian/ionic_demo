import { Component } from '@angular/core';
import { IonicPage, normalizeURL, NavController, NavParams, ActionSheetController, LoadingController, ToastController, Platform, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../commom/baseui';
import { ResetProvider } from '../../providers/reset/reset'
//导入native包
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { Camera } from '@ionic-native/camera';

//引入第三方js库
declare var cordova: any;
/**
 * Generated class for the HeadfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI{
  
  public userId: string;
  public errorMessage: any;
  public lastImage: string = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public storage: Storage,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public reset: ResetProvider,
    public file: File,
    public filePath: FilePath,
    public camera: Camera,
    public transfer: Transfer,
    public platform: Platform,
    public ViewCtrl: ViewController
    ) {
      super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeadfacePage');
  }
  
  ionViewDidEnter() {
    this.storage.get('UserId').then((val) => {
      if (val != null) {
        this.userId = val;
      }
    });
  }

  presentActionSheet(){
     let actionSheet = this.actionSheetCtrl.create({
        title: '选择图片',
        buttons: [
          {
            text:'从图片库中选择',
            handler: () => {
               this.takePicture( this.camera.PictureSourceType.PHOTOLIBRARY );
            }
          },
          {
            text:'使用相机',
            handler: () => {
              this.takePicture( this.camera.PictureSourceType.CAMERA );
            }
          },
          {
            text:'取消',
            role:'cancel'
          }
        ]
     });
     actionSheet.present();
  }
  takePicture(sourceType){
     var options = {
       quality: 100,
       sourceType: sourceType,
       saveToPhotoAlbum: false, //是否开启保存拍摄照片到相册中去
       correctOrientation: true //是否纠正拍摄照片的方向
     };
     this.camera.getPicture(options).then( imagePath => {
        //重点特别处理 android 下的文件路径
        if(this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY){
           this.filePath.resolveNativePath(imagePath).then( filePath => {
              //获取正确的路径
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
              //获取正确的文件名
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
              //拷贝文件到另外一个地方
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
           });
        }else{
           let correctPath = imagePath.substr(0,imagePath.lastIndexOf('/') + 1);
           let currentName = imagePath.substr( imagePath.lastIndexOf('/') + 1);
           this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        }
     }, ( error ) => {
       super.showToast( this.toastCtrl,"选择图片出错，请在App内检查相关的权限操作" );
     })
  }

  copyFileToLocalDir(namePath, currentName, newFileName){
     this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then( success => {
        this.lastImage = newFileName;
     }, error => {
        super.showToast( this.toastCtrl, "存储图片到本地图库失败" );
     })
  }
  createFileName(){
    var d = new Date(), n = d.getTime(), newFileName = n + '.jpg';
    return newFileName;
  }
  //判断文件是否可以上传
  public pathForImage(img){
    if(img === null){
       return '';
    }else{
       return normalizeURL(cordova.file.dataDirectory + img);
    }
  }
  
  uploadImage(){
    let url = 'https://imoocqa.gugujiankong.com/api/account/uploadheadface';
    let targetPath = this.pathForImage(this.lastImage);
    let filename = this.userId + '.jpg';
    let options = {
      fileKey: 'file',
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        "fileName": filename,
        "userid": this.userId
      } 
    }
    const fileTransfer: TransferObject = this.transfer.create();
    let loading = super.showLoading( this.loadCtrl,"上传中..." );
    fileTransfer.upload(targetPath, url, options).then( data => {
       loading.dismiss();
       super.showToast( this.toastCtrl,"上传成功" );
       setTimeout( () => {
          this.ViewCtrl.dismiss();
       },3000)
    }, error => {
      loading.dismiss();
      super.showToast( this.toastCtrl, "图片上传失败，请重试");
    })
  }
}
