import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { MapModel } from '../model/MapModel';
import { DescriptionModel } from '../model/descriptionModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { mapAssembler } from '../assembler/map-assembler';
import { descriptionAssembler } from '../assembler/description-assembler';


@Injectable({
  providedIn: 'root',
})
export class WasteWizardAPIService {
  urlBase = 'api/recollect/Regina/services/waste/pages/en/';
  headers = new HttpHeaders();
  DEPOT_LIST: string = 'depot_list';

  private $mapSu = new Subject<any>();

  constructor(private http: HttpClient, ) {
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append(
      'Access-Control-Allow-Methods',
      'POST, GET, OPTIONS, PUT'
    );
    this.headers.append('Accept', 'application/json');
    this.headers.append('content-type', 'application/json');
  }

  getMap(mid: string): Observable<MapModel[]> {
    let options = { headers: this.headers };
    return this.http
      .get(this.urlBase + mid + '.json', options)
      .pipe(map((data) => mapAssembler(data)));
  }

  getDescription(mid: string): Observable<DescriptionModel[]> {
    let options = { headers: this.headers };
    return this.http
      .get(this.urlBase + mid + '.json', options)
      .pipe(map((data) => descriptionAssembler(data)));
  }


}
