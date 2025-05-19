import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.scss'],
  standalone: false
})
export class VerComponent implements OnInit {

  info: any;

  constructor() { }

  async ngOnInit() {
    this.info = await Device.getInfo();
    console.log(Capacitor.isNativePlatform());
    if (Capacitor.isNativePlatform()) {
      const info = await App.getInfo();
      this.info.appVersion = info.version;
    } else {
      this.info.appVersion = environment.version;
    }
    console.log(this.info);
  }

}
