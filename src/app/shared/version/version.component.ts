import { Component, OnInit } from '@angular/core';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss'],
  standalone: false
})
export class VersionComponent implements OnInit {

  info: any;

  constructor() {
  }

  ngOnInit() {
  }

}
