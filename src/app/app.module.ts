import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { ChatPage } from '../pages/chat/chat';
import { NotificationPage } from '../pages/notification/notification';
import { MorePage } from '../pages/more/more';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from  '../pages/login/login';
import { RegisterPage } from  '../pages/register/register';
import { UserPage } from '../pages/user/user';
import { HeadfacePage } from '../pages/headface/headface'
import { QuestionPage } from '../pages/question/question'
import { DetailsPage } from '../pages/details/details';
import { AnswerPage } from '../pages/answer/answer';
import { ChatdetailsPage } from '../pages/chatdetails/chatdetails';
import { VersionPage } from '../pages/version/version';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ResetProvider } from '../providers/reset/reset';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';
import { fromEvent } from 'rxjs/observable/fromEvent';

import { RelativetimePipe } from '../pipes/relativetime/relativetime';
//导入native包
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { Camera } from '@ionic-native/camera';
import { EmojiProvider } from '../providers/emoji/emoji';
import { ComponentsModule } from '../components/components.module';
import { QRScanner } from '@ionic-native/qr-scanner';
import { AppVersion } from '@ionic-native/app-version';

import { UserDataDetailPage } from '../pages/user-data-detail/user-data-detail';
import{ ScanPage } from '../pages/scan/scan';
import { SettingProvider } from '../providers/setting/setting';
import { from } from 'rxjs/observable/from';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatdetailsPage,
    RelativetimePipe,
    UserDataDetailPage,
    ScanPage,
    VersionPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    ComponentsModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:'返回'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DiscoveryPage,
    ChatPage,
    NotificationPage,
    MorePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    UserPage,
    HeadfacePage,
    QuestionPage,
    DetailsPage,
    AnswerPage,
    ChatdetailsPage,
    UserDataDetailPage,
    ScanPage,
    VersionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ResetProvider,
    File,
    FilePath,
    Transfer,
    Camera,
    QRScanner,
    AppVersion,
    EmojiProvider,
    ChatServiceProvider,
    SettingProvider
  ]
})

export class AppModule {}
