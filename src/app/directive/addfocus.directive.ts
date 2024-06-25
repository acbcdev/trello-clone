import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[addfocus]',
  standalone: true
})
export class AddfocusDirective {
  el = inject(ElementRef)
  ngAfterViewInit() {
    this.el.nativeElement.focus()
  }


}
