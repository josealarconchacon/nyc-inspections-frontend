import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InspectionsService {
  private api: string;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.api =
        (window as any).__env?.API_URL ||
        'http://localhost:4000/api/inspections';
    } else {
      this.api = 'http://localhost:4000/api/inspections';
    }
  }

  list(params: any): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params || {}).forEach((k) => {
      if (params[k] !== null && params[k] !== undefined && params[k] !== '') {
        httpParams = httpParams.set(k, String(params[k]));
      }
    });
    return this.http.get(this.api, { params: httpParams });
  }
}
