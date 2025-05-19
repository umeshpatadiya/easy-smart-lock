import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response.model';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly storageKey = 'auth';

  constructor(private http: HttpClient) { }

  get(): Promise<any> {
    return Preferences.get({ key: this.storageKey });
  }

  set(val: string): Promise<any> {
    return Preferences.set({ key: this.storageKey, value: val });
  }

  clear(): Promise<any> {
    return Preferences.clear();
  }

  connexion(email: string, password: string): Promise<Response> {
    return firstValueFrom(this.http.post<Response>(`${environment.apiUrl}/connexion`, {
      email,
      password
    }));
  }

  pass(email: string): Promise<Response> {
    return firstValueFrom(this.http.post<Response>(`${environment.apiUrl}/password`, {
      email
    }));
  }

  inscription(email: string, password: string, nom: string, prenom: string): Promise<Response> {
    return firstValueFrom(this.http.post<Response>(`${environment.apiUrl}/inscription`, {
      email: email,
      password: password,
      nom: nom,
      prenom: prenom
    }));
  }

}
