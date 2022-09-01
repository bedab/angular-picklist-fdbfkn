import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>{{name}}!</h1> <hr>`,
  styles: [`h1 { font-family: Lato; text-align: center;}`]
})
export class HelloComponent  {
  @Input() name: string;
}
