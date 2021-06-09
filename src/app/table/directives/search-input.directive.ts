import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';

const X_CIRCLE_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g>
<rect x="2" y="2" width="20" height="20" rx="10" fill="black"/>
<path d="M15 9L9 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 9L15 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>

`;
const SEARCH_ICON = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g>
<path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21 21L16.65 16.65" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</svg>`;

@Directive({
  selector: '[isSearch]',
})
/**
 * Adds a clear button to the `el`
 */
export class SearchInputDirective implements OnDestroy {
  @Output() onClear: EventEmitter<any> = new EventEmitter<any>();

  closeButton: HTMLDivElement;
  searchIcon: HTMLDivElement;

  constructor(el: ElementRef<HTMLInputElement>, private renderer: Renderer2) {
    this.closeButton = this.renderer.createElement('div');
    this.searchIcon = this.renderer.createElement('div');
    this.closeButton.addEventListener('click', () => {
      this.onClear.emit();
      this.closeButton.style.display = 'none';
      this.searchIcon.style.display = 'flex';
    });
    this.closeButton.style.display = 'none';
    this.renderer.addClass(this.closeButton, 'clear-btn');
    this.renderer.addClass(this.searchIcon, 'search-icon');
    this.renderer.setProperty(this.closeButton, 'innerHTML', X_CIRCLE_ICON);
    this.renderer.setProperty(this.searchIcon, 'innerHTML', SEARCH_ICON);
    this.renderer.appendChild(el.nativeElement.parentElement, this.closeButton);
    this.renderer.appendChild(el.nativeElement.parentElement, this.searchIcon);
  }
  @HostListener('input', ['$event.target.value']) onValueChange(value: string) {
    if (value === '') {
      this.searchIcon.style.display = 'flex';
      this.closeButton.style.display = 'none';
    } else {
      this.searchIcon.style.display = 'none';
      this.closeButton.style.display = 'flex';
    }
  }
  ngOnDestroy(): void {
    this.closeButton.removeAllListeners?.('click');
  }
}
