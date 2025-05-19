import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from 'src/app/models/response.model';
import { BoxService } from 'src/app/services/box.service';
import { CallNumber } from 'capacitor-call-number';
import { Device } from '@capacitor/device';

declare var $: any;

@Component({
  selector: 'app-box',
  templateUrl: './box.page.html',
  styleUrls: ['./box.page.scss'],
  standalone: false
})
export class BoxPage implements OnInit {

  id: any;
  box: any;
  loading: boolean;
  actions: any = BoxService.actions;
  action: string;
  device: any;

  constructor(
    private route: ActivatedRoute,
    private service: BoxService,
    private router: Router
  ) { }

  async ngOnInit() {
    const info = await Device.getInfo();
    console.log(info);
    this.device = info;
  }

  ionViewDidEnter() {
    this.buildSlide();
    this.loading = true;
    this.box = null;
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.find(this.id).then((output: Response) => {
      this.loading = false;
      if (output.etat === 'OK') {
        const data = output.data;
        if (Object.keys(data).length > 0) {
          this.box = data;
        }
      }
    })
      .catch((e) => {

      });
  }

  valide() {
    if (this.action === this.actions.actionAjoutTel) {
      this.router.navigate(['/dashboard/add-phone/' + this.id]);
    }
    if (this.action === this.actions.actionAccess) {
      this.router.navigate(['/dashboard/access/' + this.id]);
    }
    if (this.action === this.actions.actionDuration) {
      this.router.navigate(['/dashboard/duration/' + this.id]);
    }
    if (this.action === this.actions.actionListeTel) {
      this.router.navigate(['/dashboard/list-phone/' + this.id]);
    }
    if (this.action === this.actions.actionSuppressionTel) {
      this.router.navigate(['/dashboard/list-phone/' + this.id]);
    }
    if (this.action === this.actions.actionSMS) {
      this.router.navigate(['/dashboard/sms/' + this.id]);
    }
  }


  buildSlide() {
    const doCall = this.doCall;
    $('#divlock').slideToUnlock({
      lockText: 'Glisser pour appeler la box!',
      allowToLock: true,
      unlockfn: doCall,
      lockfn: doCall,
      status: false
    });
  }

  doCall = async () => {

    try {
      await CallNumber.call({ number: this.box.telephone, bypassAppChooser: true });
    } catch (error) {
      console.error('Error making call:', error);
    }
  }

}
