import { MapModel } from './../../model/MapModel';
import {
  HttpClientModule,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSerializer } from '@angular/router';
//import { MapModel } from 'src/app/model/MapModel';
import { Tab1Page } from 'src/app/tab1/tab1.page';
import { WasteWizardAPIService } from 'src/app/services/waste-wizard-api.service';
import { descriptionAssembler } from 'src/app/assembler/description-assembler';
import { DescriptionModel } from 'src/app/model/descriptionModel';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { type } from 'os';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: WasteWizardAPIService,
    private router: Router,
    private http: HttpClient,
    private serializer: UrlSerializer,
    private geolocation: Geolocation
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.materialID = params.id;
      console.log('this ' + this.materialID);
    });
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append(
      'Access-Control-Allow-Methods',
      'POST, GET, OPTIONS, PUT'
    );
    this.headers.append('Accept', 'application/json');
    this.headers.append('content-type', 'application/json');
  }

  headers = new HttpHeaders();
  materialID?: string;
  locations?: MapModel[];
  descriptions?: DescriptionModel;
  strippedHTML?: string;
  title?: String;
  baseURLMaps = 'https://www.google.com/maps?q=';
  private userLongitude: any;
  private userLatitude: any;
  public isMenuOpen: boolean = false;

  ngOnInit() {
    //refactor later maybe
    let options = { headers: this.headers };
    this.http
      .get(`/api/detail?materialId=${this.materialID}`, options)
      .subscribe((data) => {
        let obj = JSON.parse(JSON.stringify(data));
        this.title = obj.caption;
      });
    this.setMap();
    this.setDescription();
    this.getUserCurrentLocation();
  }

  setMap(): void {
    this.sharedService.getMap(this.materialID).subscribe((x: MapModel[]) => {
      this.locations = x.map((element) => {
        element.haversine = this.haversien(
          this.userLongitude,
          this.userLatitude,
          Number(element.x),
          Number(element.y)
        );
        return element;
      }).sort((a,b) => a.haversine - b.haversine);
    });
  }
  
  setDescription(): void {
    this.sharedService
      .getDescription(this.materialID)
      .subscribe((data: DescriptionModel) => {
        this.descriptions = data;
        this.strippedHTML = data.description;
        this.title = data.label;
      });
  }

  goBack() {
    this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
  }

  private getUserCurrentLocation(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.userLongitude = resp.coords.longitude;
      this.userLatitude = resp.coords.latitude;
    });
  }

  onSelect($location) {
    window.location.href = this.baseURLMaps + $location.y + ',' + $location.x;
  }

  //return distance from user to location in mapmodel
  haversien(userLong: any, userLat: any, locationLong: any, locationLat: any) {
    let pi = Math.PI;
    let radius = 6371;
    let userLongRadians = userLong * (pi / 180);
    let userLatRadians = userLat * (pi / 180);
    let locationLongRadians = locationLong * (pi / 180);
    let locationLatRadians = locationLat * (pi / 180);

    let deltaLong = locationLongRadians - userLongRadians;
    let deltaLat = locationLatRadians - userLatRadians;
    let a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(userLatRadians) *
        Math.cos(locationLatRadians) *
        Math.sin(deltaLong / 2) ** 2;
    let c = 2 * Math.asin(Math.sqrt(a));
    return c * radius;
  }
}
