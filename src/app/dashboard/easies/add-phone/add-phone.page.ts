import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert.service';
import { EasyService } from 'src/app/services/easy.service';
import { Response } from 'src/app/models/response.model';

@Component({
  selector: 'app-add-phone',
  templateUrl: './add-phone.page.html',
  styleUrls: ['./add-phone.page.scss'],
  standalone: false
})
export class AddPhonePage implements OnInit {

  easy: any;
  loading = false;
  id: any;
  unlimited = true;
  debut: any = new Date();
  fin: any = new Date();
  prefix: string;
  telephone: string;
  min: string;
  position: string;
  ordres: any[];
  nom: string;

  constructor(
    private service: EasyService,
    private route: ActivatedRoute,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.min = moment().format('YYYY-MM-DD');
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
    this.service.getOrdre(this.id).then((output: Response) => {
      if (output.etat === 'OK') {
        const data = output.data;
        if (Object.keys(data).length > 0) {
          this.ordres = data;
        }
      }
    });
  }

  valide() {
    if (this.prefix.indexOf('+') !== 0) {
      this.alert.presentAlert('Erreur', '', 'Le préfix téléphonique doit commencé par +');
      return;
    }
    if (this.telephone.indexOf('0') === 0) {
      this.alert.presentAlert('Erreur', '', 'Le numéro de téléphone ne doit pas commencé par 0');
      return;
    }
    if (this.position === '') {
      this.alert.presentAlert('Erreur', '', 'La position est requise');
      return;
    }
    this.loading = true;
    this.service.addPhone(
      this.nom,
      this.id,
      this.unlimited,
      this.debut,
      this.fin,
      this.prefix,
      this.telephone,
      this.position
    ).then((output: Response) => {
      this.loading = false;
      if (output.etat === 'OK') {
        if (output.data === true) {
          this.alert.presentAlert('Ajout', '', 'Numéro ajouté a la Serrure');
        } else {
          this.alert.presentAlert('Erreur', '', 'Ajout annulé , une erreur est survenue');
        }
      }
    })
    .catch((e) => {
      console.log(e);
      this.loading = false;
      this.alert.presentAlert('Erreur', '', 'Ajout annulé , une erreur est survenue');
    });



  }

}
