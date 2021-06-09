import {
  Directive,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[isClearable]',
})
/**
 * Adds a clear button to the `el`
 */
export class ClearableInputDirective implements OnDestroy {
  @Output() onClear: EventEmitter<any> = new EventEmitter<any>();

  closeButton: HTMLDivElement;

  constructor(el: ElementRef<HTMLInputElement>, private renderer: Renderer2) {
    this.closeButton = this.renderer.createElement('div');
    this.closeButton.addEventListener('click', () => this.onClear.emit());
    this.renderer.appendChild(this.closeButton, this.renderer.createText('X'));
    this.renderer.appendChild(el.nativeElement.parentElement, this.closeButton);
  }
  ngOnDestroy(): void {
    this.closeButton.removeAllListeners?.('click');
  }
}
