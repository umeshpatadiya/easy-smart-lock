import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response } from '../models/response.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Promise<Response> {
    return firstValueFrom(this.http.get<Response>(`${environment.apiUrl}/user`));
  }

  post(nom: any, prenom: any): Promise<Response> {
    return firstValueFrom(this.http.post<Response>(`${environment.apiUrl}/user`, {
      nom,
      prenom
    }));
  }

}
