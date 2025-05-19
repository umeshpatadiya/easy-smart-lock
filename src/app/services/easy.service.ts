import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EasyService {

  static readonly actions = {
    actionAjoutTel: 'action_ajout_tel',
    actionSuppressionTel: 'action_suppression_tel',
    actionAccess: 'access',
    actionDuration: 'duration',
    actionListeTel: 'liste_tel',
    actionSMS: 'sms'
  };

  constructor(
    private http: HttpClient
  ) { }

  get(): Promise<Response> {
    return firstValueFrom(this.http.get<Response>(`${environment.apiUrl}/easies`));
  }

  find(id: any): Promise<Response> {
    return firstValueFrom(this.http.get<Response>(`${environment.apiUrl}/easies/${id}`));
  }

  addPhone(
    nom: string,
    id: string,
    unlimited: boolean,
    debut: any ,
    fin: any ,
    prefix: string,
    telephone: string,
    ordre: string): Promise<Response>
  {
    return firstValueFrom(this.http.post<Response>(`${environment.apiUrl}/easies/add-phone`, {
      nom,
      id,
      unlimited,
      debut,
      fin,
      prefix,
      telephone,
      ordre
    }));
  }

  editAccess(id: string, action: string): Promise<Response> {
    return firstValueFrom(this.http.post<Response>(`${environment.apiUrl}/easies/edit-access`, {
      id,
      action
    }));
  }

  editDuration(id: string, duration: string): Promise<Response> {
    return firstValueFrom(this.http.post<Response>(`${environment.apiUrl}/easies/edit-duration`, {
      id,
      duration
    }));
  }

  requestListPhone(id: string): Promise<Response> {
    return firstValueFrom(this.http.post<Response>(`${environment.apiUrl}/easies/request-list-phone`, {
      id
    }));
  }

  getPhones(id: string): Promise<Response> {
    return firstValueFrom(this.http.get<Response>(`${environment.apiUrl}/easies/phones?id=${id}`));
  }

  remove(id: any, phoneId: any): Promise<Response> {
    return firstValueFrom(this.http.post<Response>(`${environment.apiUrl}/easies/delete-phone`, {
      id,
      phoneId
    }));
  }

  editSMS(id: string , action: string): Promise<Response> {
    return firstValueFrom(this.http.post<Response>(`${environment.apiUrl}/easies/sms`, {
      id,
      action
    }));
  }

  getOrdre(id: string): Promise<Response> {
    return firstValueFrom(this.http.get<Response>(`${environment.apiUrl}/easies/ordre?id=${id}`));
  }
}
