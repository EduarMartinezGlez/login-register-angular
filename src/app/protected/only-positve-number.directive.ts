import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appOnlyPositveNumber]'
})
export class OnlyPositveNumberDirective {

  constructor(private el: ElementRef) { }

}
