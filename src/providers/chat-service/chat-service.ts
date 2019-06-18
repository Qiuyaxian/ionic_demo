import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
/*
  Generated class for the ChatServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
//聊天信息属性
export class ChatMessage {
   messageId : string;
   userId : string;
   userName : string;
   userImgUrl : string;
   toUserId : string;
   time : number | string;
   message : string;
   status : string;
}
//用户属性
export class UserInfo {
   userId : string;
   userName : string;
   userImgUrl : string;
}
@Injectable()
export class ChatServiceProvider {

  constructor(
    public http: Http, 
    public event: Events
    ) {
    console.log('Hello ChatServiceProvider Provider');
  }

  getMessageList() : Promise<ChatMessage[]> {
    const url = '../../../assets/mock/msg-list.json';
    return this.http.get(url).toPromise().then( response  => response.json().array as ChatMessage[] )
    .catch( error => Promise.reject(error || '错误信息') )
  }
  sendMessage(message:ChatMessage){
    return new Promise( resolve => setTimeout(()=>{
      resolve(message);  
    }, Math.random() * 1000)).then(() => {
       this.mockNewMessage(message);
    }).catch( err => {
      console.log(err,"err");
    });
  }
 
  mockNewMessage(message : ChatMessage){
    const id = Date.now().toString();
    let sendMessage : ChatMessage = {
      messageId : id,
      userId : '123321',
      userName : '慕女神',
      userImgUrl : 'http://img.mukewang.com/user/57a322f00001e4ae02560256-40-40.jpg',
      toUserId : message.userId,
      time : Date.now(),
      message : '你是不是刚才给我发送了「' + message.message + '」？',
      status : 'success'
    };

    let timer = setTimeout(()=>{
      this.event.publish('chat.received', sendMessage, Date.now())
    },Math.random() * 1000)
  }
}
