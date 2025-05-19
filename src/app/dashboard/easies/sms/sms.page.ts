import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { EasyService } from 'src/app/services/easy.service';
import { Response } from 'src/app/models/response.model';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
  standalone: false
})
export class SmsPage implements OnInit {

  easy: any;
  id: any;
  loading: boolean;
  action: string;

  constructor(
    private service: EasyService,
    private route: ActivatedRoute,
    private alert: AlertService
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.loading = true;
    this.easy = null ;
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.find(this.id).then((output: Response) => {
      this.loading = false;
      if (output.etat === 'OK') {
        const data = output.data;
        if (Object.keys(data).length > 0) {
          this.easy = data;
        }
      }
    })
    .catch((e) => {

    });
  }

  valide() {
    if (this.action !== null) {
      this.loading = true;
      this.service.editSMS(this.id, this.action).then((output: Response) => {
        this.loading = false;
        if (output.etat === 'OK') {
          if (output.data === true) {
            this.alert.presentAlert('Modification', '', 'SMS ouverture modifier sur la Serrure');
          } else {
            this.alert.presentAlert('Modification', '', 'Une erreur est survenue');
          }
        }
      })
      .catch((e) => {
        console.log(e);
        this.loading = false;
        this.alert.presentAlert('Modification', '', 'Une erreur est survenue');
      });
    }
  }
}
