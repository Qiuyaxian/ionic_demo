import { NgModule } from '@angular/core';
import { RelativetimePipe } from './relativetime/relativetime';
import { SettingPipe } from './setting/setting';
@NgModule({
	declarations: [RelativetimePipe,
    SettingPipe],
	imports: [],
	exports: [RelativetimePipe,
    SettingPipe]
})
export class PipesModule {}
