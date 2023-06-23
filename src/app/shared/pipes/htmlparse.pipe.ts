import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'htmlDecoder'
})
export class HtmlDecoderPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string) :SafeHtml|null{
    const doc = new DOMParser().parseFromString(value, 'text/html');
    const textContent = doc.documentElement.textContent;
    return textContent?this.sanitizer.bypassSecurityTrustHtml(textContent):"";
  }

}
