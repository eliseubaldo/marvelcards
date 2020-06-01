import {
  Component,
  forwardRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';

@Component({
  selector: 'ngbd-rating-events',
  templateUrl: './rating-input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgbdRatingEventsComponent),
    multi: true
  }]
})
export class NgbdRatingEventsComponent implements ControlValueAccessor {
  selected = 0;
  hovered = 0;
  readonly = false;

  onChange: any = () => {};
  writeValue(value: any): void {
    this.selected = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState ?(isDisabled: boolean): void {

  }

  change() {
    this.onChange(this.selected);
  }

}
