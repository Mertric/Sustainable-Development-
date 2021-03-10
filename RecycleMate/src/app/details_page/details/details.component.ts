import {
  HttpClientModule,
  HttpHeaders,
  HttpClient,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapModel } from 'src/app/model/MapModel';
import { Tab1Page } from 'src/app/tab1/tab1.page';
import { WasteWizardAPIService } from 'src/app/services/waste-wizard-api.service';
import { descriptionAssembler } from 'src/app/assembler/description-assembler';
import { DescriptionModel } from 'src/app/model/descriptionModel';

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
    private http: HttpClient
  ) {
    this.activatedRoute.params.subscribe((params) => {
      // console.log(this.tab1call.getCall(params.id));
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
  urlBase = 'api/recollect/Regina/services/waste/pages/en/';
  headers = new HttpHeaders();
  materialID?: string;
  locations?: MapModel[];
  descriptions?: DescriptionModel[];
  strippedHTML?: string;
  title?: String;

  ngOnInit() {
    //refactor later maybe
    let options = { headers: this.headers };
    this.http
      .get(this.urlBase + this.materialID + '.json', options)
      .subscribe((data) => {
        let obj = JSON.parse(JSON.stringify(data));
        this.title = obj.caption;
      });
  }

  setMap(): void {
    this.sharedService.getMap(this.materialID).subscribe((x) => {
      this.locations = x;
      console.log(x);
    });
  }
  setDescription(): void {
    this.sharedService.getDescription(this.materialID).subscribe((data) => {
      this.descriptions = data;
      data.forEach((element) => {
        this.strippedHTML = element.description;
      });
      console.log(data);
    });
  }

  goBack() {
    this.router.navigate(['/tabs/tab1'], { replaceUrl: true });
  }
}
