import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BaseUI } from '../../commom/baseui';
import { Storage } from '@ionic/storage';
import { ResetProvider } from '../../providers/reset/reset'
import { DetailsPage } from '../../pages/details/details'
/**
 * Generated class for the QuestionListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'question-list',
  templateUrl: 'question-list.html'
})
export class QuestionListComponent extends BaseUI{

  public messageError: any;
  public questions: string[];

  @Input('datatype') dataSourceType;
  
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage,
    public reset: ResetProvider,
    public loadCtrl: LoadingController
  ) {
     super();
  }

  ngAfterContentInit(){
    this.storage.get('UserId').then(val => {
      if(val != null){
        let loading = this.showLoading( this.loadCtrl,"加载中" );
        this.reset.getQuestionList(val,this.dataSourceType).subscribe( res => {
          this.questions = res;
          loading.dismissAll();
        },error => {
          loading.dismissAll();
          this.messageError = <any>error;
        });
      }
    })
  }

  //跳转详情
  gotoDetails(id){
    this.navCtrl.push(DetailsPage,{
      id: id
    });
  }

}
