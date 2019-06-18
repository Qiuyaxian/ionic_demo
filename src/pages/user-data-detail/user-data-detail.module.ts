import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDataDetailPage } from './user-data-detail';

@NgModule({
  declarations: [
    UserDataDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDataDetailPage),
  ],
})
export class UserDataDetailPageModule {}
