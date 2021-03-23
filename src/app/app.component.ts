import { Component } from '@angular/core';
import { HeaderColor } from '@ionic-native/header-color/ngx';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private headerColor: HeaderColor, private statusBar: StatusBar) {
    this.statusBar.backgroundColorByHexString('#f9fafb');
    this.statusBar.styleDefault()
    this.statusBar.overlaysWebView(true);
    //headerColor.tint("#FFF") header na visao de multitarefas
  }
}
