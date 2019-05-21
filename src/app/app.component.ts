import { Component } from '@angular/core';
import 'jquery';
import 'bootstrap';
import 'hammerjs';

@Component({
  selector: 'lg-root',
  template: `
   <lg-login></lg-login>
   <lg-new-flight></lg-new-flight>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'logbook';
}
