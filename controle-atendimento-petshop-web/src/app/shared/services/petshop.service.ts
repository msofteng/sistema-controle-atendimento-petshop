import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetshopService {
  private http = inject(HttpClient);

  getData(): Observable<string> {
    return this.http.get<string>('/teste');
  }
}