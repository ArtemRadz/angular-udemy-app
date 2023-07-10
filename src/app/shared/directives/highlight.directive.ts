import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective implements OnInit {
  @Input() defaultColor = 'transparent';
  @Input('appHighlight') highlightColor = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor!: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter', ['$event'])
  mouseenter(eventData: Event) {
    this.backgroundColor = this.highlightColor;
    console.dir(eventData);
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   'background-color',
    //   'blue'
    // );
  }

  @HostListener('mouseleave', ['$event']) mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
    console.dir(eventData);
    // this.renderer.setStyle(
    //   this.elementRef.nativeElement,
    //   'background-color',
    //   'transparent'
    // );
  }
}
