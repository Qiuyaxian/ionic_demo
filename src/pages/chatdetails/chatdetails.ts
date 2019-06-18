import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, TextInput } from 'ionic-angular';
import { ChatServiceProvider, ChatMessage } from '../../providers/chat-service/chat-service'
import { ResetProvider } from '../../providers/reset/reset'
import { Storage } from '@ionic/storage'
import { Events } from 'ionic-angular'
import { resolveDep } from '@angular/core/src/view/provider'

/**
 * Generated class for the ChatdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//@IonicPage()
@Component({
  selector: 'page-chatdetails',
  templateUrl: 'chatdetails.html',
})
export class ChatdetailsPage {
  public chatUserId : string;
  public chatUserName : string;
  public chatUserImgUrl : string;
  public userId : string;
  public userName : string;
  public userImgUrl : string;
  public isEmojiPicker: boolean = false;
  public messageList : ChatMessage[] = [];
  public messageError : any;
  public editorMessage : string;
  @ViewChild(Content) content : Content;
  @ViewChild('chatInput') messageInput : TextInput;
  
  constructor(
    public navCtrl : NavController, 
    public navParams : NavParams,
    public chatServer : ChatServiceProvider,
    public reset : ResetProvider,
    public storage : Storage,
    public event : Events) {

    this.chatUserName = navParams.get('username'); 
    this.chatUserId = navParams.get('userId');

  }
  ionViewDidLoad() {
     
  }
  ionViewDidEnter() {
    this.storage.get('UserId').then( val => {
       if(val != null){
          
          this.reset.getUserInfo(val).subscribe( userinfo => {
            this.userId = '140000198202211138';
            this.userName = userinfo['UserNickName'];
            this.userImgUrl = userinfo['UserHeadface'] + "?" + (new Date()).valueOf();
          }, err => this.messageError = <any>err);
       }
    });
    this.getMessage().then(()=>{
      this.scrollToBottom();
    })
    this.event.subscribe('chat.received',(msg, time) => {
      this.messageList.push(msg);
      this.scrollToBottom();
    })
  }
  ionViewWillLeave(){
    //进行事件的取消订阅
    this.event.unsubscribe('chat.received');
  }
  /*
     获取消息列表 
  */
  getMessage(){
    return this.chatServer.getMessageList().then( res => {
       this.messageList = res;
    }).catch( err => {
      console.log(err);
    });
  }
  /**
   * 切换到表情
   */
  switchEmojiPicker(){
    this.isEmojiPicker = !this.isEmojiPicker;
  }
  scrollToBottom () : any {
   let timer = setTimeout(() => {
     if(this.content.scrollToBottom){
       this.content.scrollToBottom()
     }
     clearTimeout(timer);
   }, 300)
  }

  sendMessage(){ 
    if(!this.editorMessage.trim()) return;
    const id = Date.now().toString();
    let message : ChatMessage = {
       messageId : id,
       userId : this.userId,
       userName : this.userName,
       userImgUrl : this.userImgUrl,
       toUserId : this.chatUserId,
       time : Date.now(),
       message : this.editorMessage,
       status : 'pending'

    };
    this.messageList.push(message);
    this.scrollToBottom();
    this.editorMessage = '';
    if(this.isEmojiPicker){
      this.messageInput.setFocus();
    }
    this.chatServer.sendMessage(message).then(()=>{
      let index = this.getMessageIndex(id);
      if(index !== -1){
        this.messageList[index].status = 'success';
      }
    });
  }
  focus(){
     this.isEmojiPicker = false;
     if(this.content.resize) this.content.resize();
     this.scrollToBottom();
  }
  getMessageIndex(id: string){
    return this.messageList.findIndex( e => e.messageId === id);
  }
}
