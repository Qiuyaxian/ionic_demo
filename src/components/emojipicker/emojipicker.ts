import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmojiProvider } from '../../providers/emoji/emoji';
/**
 * Generated class for the EmojipickerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
const EMOJI_ACCESSOR : any = {
  provide : NG_VALUE_ACCESSOR,
  useExisting : forwardRef( () => EmojipickerComponent ),
  multi : true
};
@Component({
  selector: 'emojipicker',
  templateUrl: 'emojipicker.html',
  providers: [ EMOJI_ACCESSOR ] 
})
export class EmojipickerComponent implements ControlValueAccessor{
  
  emojiArray = [];
  content = '';
  onChanged : Function;
  onTouched : Function;

  constructor( public emojiProvider : EmojiProvider ) {
    console.log(emojiProvider.getEmojis() ,"this.emojiArray")
    this.emojiArray = emojiProvider.getEmojis();
    
  }
  writeValue(obj: any): void {
     this.content = obj;
  }
  registerOnChange(fn: any): void {
     this.onChanged = fn;
     this.setValue(this.content);
  }
  registerOnTouched(fn: any): void {
     this.onTouched = fn;
  }
  
  setDisabledState?(isDisabled: boolean): void {
  }

  setValue(val: any):any{
    if(this.content) this.content += val;
    else this.content = val;
    if(this.content){
      if(this.onChanged) this.onChanged(this.content);
    }
  }
  
}
