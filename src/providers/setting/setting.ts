import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
/*
  Generated class for the SettingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingProvider {
  public theme: BehaviorSubject<string>;
  constructor(public http: Http) {
    this.theme =  new BehaviorSubject('light-theme');
  }
  setActiveTheme(val){
    this.theme.next(val);
  }
  getActiveTheme(){
    return this.theme.asObservable();
  }

}
