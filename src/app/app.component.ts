import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [StatusBar]
})
export class AppComponent {
  constructor(private statusBar: StatusBar) {
    this.statusBar.backgroundColorByHexString('#333');
    this.statusBar.styleBlackTranslucent();
    this.statusBar.overlaysWebView(false);
  }
}
