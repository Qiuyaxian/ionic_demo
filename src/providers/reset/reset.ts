//import { HttpClient, Response } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
/*
  Generated class for the ResetProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResetProvider {

    constructor(public http: Http) {
      //console.log('Hello ResetProvider Provider');
    }
    //feed
    private apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get';
    //account
    private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
    private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
    private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
    private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';
    private apiGetUserQuestionList = "https://imoocqa.gugujiankong.com/api/account/getuserquestionlist";
    //question
    private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
    private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/list?index=1&number=10';
    private apiUrlGetQuestion = "https://imoocqa.gugujiankong.com/api/question/get";
    private apiUrlGetQuestionWithUser = "https://imoocqa.gugujiankong.com/api/question/getwithuser";
    private apiUrlAnswer = "https://imoocqa.gugujiankong.com/api/question/answer";
    private apiUrlSaveFavourite = "https://imoocqa.gugujiankong.com/api/question/savefavourite";
    //notification
    private apiUrlUserNotifications = "https://imoocqa.gugujiankong.com/api/account/usernotifications";
    //定义登陆方法调用服务器接口
    public login(mobile: any, passowrd: any): Observable<string[]>{
      return this.getUrlReturn(`${this.apiUrlLogin}?mobile=${mobile}&password=${passowrd}`);
    }
    public registerHandle(mobile: any, nickname: any, passowrd: any): Observable<string[]>{
      return this.getUrlReturn(`${this.apiUrlRegister}?mobile=${mobile}&nickname=${nickname}&password=${passowrd}`);
    }
    public getUserInfo(userid:string): Observable<string[]>{
      return this.getUrlReturn(`${ this.apiUrlUserInfo }?userid=${userid}`);
    }
    public updateNickName( userid: string, nickname: string): Observable<string[]>{
      return this.getUrlReturn(`${this.apiUrlUpdateNickName}?userid=${userid}&nickname=${nickname}`);
    }
    public saveQuestion(userid, title, content): Observable<string[]> {
      return this.getUrlReturn( `${ this.apiUrlQuestionSave }?userid=${userid}&title=${title}&content=${ content }`);
    }
    public getFeeds(): Observable<string[]>{
      return this.getUrlReturn( this.apiUrlFeeds );
    }
    public getQuestion(id: string): Observable<string[]>{
      return this.getUrlReturn(`${ this.apiUrlGetQuestion }?id=${id}`);
    }
    public getQuestionWithUser(id: string, userid: string): Observable<string[]>{
      return this.getUrlReturn( `${ this.apiUrlGetQuestionWithUser }?id=${id}&userid=${userid}` );
    }

    public favouriteUpdate(id: string,userid: string): Observable<string[]>{
      return this.getUrlReturn(`${ this.apiUrlSaveFavourite }?questionid=${id}&userid=${userid}`);
    }
    
    public answerUpdate(userid: string, questionid: string, content: string):Observable<string[]>{
      return this.getUrlReturn(`${ this.apiUrlAnswer }?userid=${userid}&questionid=${questionid}&content=${content}`);
    }

    public getDiscovery():Observable<string[]>{
      return this.getUrlReturn( this.apiUrlQuestionList );
    }
    public getQuestionList(userId:string, type:string):Observable<string[]>{
      return this.getUrlReturn(`${ this.apiGetUserQuestionList }?userId=${userId}&type=${type}`);
    }

    
    public getNotification(userid:string):Observable<string[]>{
      return this.getUrlReturn( `${this.apiUrlUserNotifications}?userid=${userid}` );
    }
    /* ------------------ */
    private getUrlReturn(url:string): Observable<string[]> {
      return this.http.get(url).map(this.extractData).catch(this.handleError);
    }
    private extractData(res:Response) {
      let body = res.json();
      return JSON.parse(body) || {};
    }
    private handleError(error:Response | any) {
      let errMsg:string;
      if(error instanceof Response){
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        
      }else{
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }

}
