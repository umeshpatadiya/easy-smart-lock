import { Component } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {

  prenom: string = '';

  constructor(
    private platform: Platform,
    private auth: AuthService,
    private router: Router,
    private user: UserService,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Check if running on native platform
      if (this.platform.is('capacitor')) {
        StatusBar.setStyle({ style: Style.Default });
        StatusBar.setOverlaysWebView({ overlay: false });
        StatusBar.setBackgroundColor({ color: '#1976d2' });
        SplashScreen.hide();
      }
      this.login();
    });
  }

  close() {
    this.menu.close('first');
  }

  logout() {
    this.menu.close('first');
    this.auth.clear().then(() => {
      this.router.navigate(['/home/connexion']);
    });
  }

  async login() {
    const token = await this.auth.get();
    if (token != null && token.value != null) {
      this.user.get().then((reponse) => {
        if (reponse.etat === 'OK') {
          const data = reponse.data;
          console.log(data);
          this.prenom = data.prenom;
        }
      });
    }
  }
}
