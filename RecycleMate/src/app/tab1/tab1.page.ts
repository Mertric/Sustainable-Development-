import { Component, Input, OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MapModel } from '../model/MapModel';
import { DescriptionModel } from '../model/descriptionModel';
import { FormControl, Validators } from '@angular/forms';
import { title } from 'process';
import { SuggestionModel } from '../model/suggestionModel';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Observable, Subject } from 'rxjs';
import { MaterialListModel } from '../model/materialListModel';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  urlBase = 'api/recollect/Regina/services/waste/pages/en/';
  //anotherURLBase ='api/recollect/Regina/services/waste/pages/en/' + this.itemURICreate();
  urlListMaterial = '/api/material?id=';
  urlSearchSuggestionBase = '/api/search?suggest=';
  DEPOT_LIST: string = 'depot_list';
  DESCRIPTION: string = 'description';


  headers = new HttpHeaders();
  userInput = '';
  suggestions: SuggestionModel[];
  suggestionsID = '';
  selectedMaterial?: SuggestionModel;
  description?: MapModel[];
  map?: MapModel[];

  constructor(private http: HttpClient, private router: Router) {
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append(
      'Access-Control-Allow-Methods',
      'POST, GET, OPTIONS, PUT'
    );
    this.headers.append('Accept', 'application/json');
    this.headers.append('content-type', 'application/json');
  }
  onInput(event): void {
    //console.log(this.userInput);
    //console.log(event);
    let options = { headers: this.headers };
    this.http
      .get(this.suggestionURICreate(this.userInput), options)
      .subscribe((data) => {
        let obj = JSON.parse(JSON.stringify(data));
        let temp: SuggestionModel[] = obj.map((e) => {
          if (e?.locale == 'en') {
            let p: SuggestionModel = new SuggestionModel();
            p.itemName = e.title;
            p.materialID = e.id;
            return p;
          }
        });
        this.suggestions = temp;
        console.log(temp);
      });
  }

  getMap(mid: string): MapModel[] {
    let options = { headers: this.headers };
    let result: MapModel[];
    let fileEnding = '.json';
    let concatURL = this.urlBase.concat(mid.toString(), fileEnding.toString());
    this.http.get(concatURL, options).subscribe((data) => {
      let obj = JSON.parse(JSON.stringify(data));
      obj['sections'].foreach((element) => {
        if (element?.name == this.DEPOT_LIST) {
          let temp: MapModel[] = element.rows
            .map((e) => {
              if (e?.class == 'MapResult') {
                let p: MapModel = new MapModel();
                p.address = e.result_address;
                p.id = e.id;
                p.x = e.geo_x;
                p.y = e.geo_y;
                p.label = e.label;
                p.phoneNumber = e.result_phone_number1;
                return p;
              }
              return null;
            })
            .filter((e) => e);
          result = temp;
        }
      });
    });
    return result;
  }

  getDescription(mid: string): MapModel[] {
    let options = { headers: this.headers };
    let result: MapModel[];
    this.http.get(this.urlBase + mid + '.json', options).subscribe((data) => {
      let obj = JSON.parse(JSON.stringify(data));
      obj['sections'].forEach((element) => {
        if (element?.name == this.DESCRIPTION) {
          let temp: MapModel[] = element.rows
            .map((e) => {
              if (e?.field == 'Description') {
                let p: DescriptionModel = new DescriptionModel();
                p.description = e.value;
                return p;
              }
              return null;
            })
            .filter((e) => e);
          result = temp;
        }
      });
    });
    return result;
  }

  listMaterial() {
    let options = { headers: this.headers };
    let result: MaterialListModel[];
    let listOfTitles = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'Y',
    ];
    this.http.get(this.urlListMaterial, options).subscribe((data) => {
      let obj = JSON.parse(JSON.stringify(data));
      obj['sections'].forEach((element) => {
        if (listOfTitles.includes(element.title)) {
          let temp: MaterialListModel[] = element.rows
            .map((e) => {
              if (e?.type == 'url') {
                let p: MaterialListModel = new MaterialListModel();
                p.materialLabel = e.label;
                p.url = e.href;
                return p;
              }
              return null;
            })
            .filter((e) => e);
          result = temp;
          console.log(result);
        }
      });
    });
  }

  private suggestionURICreate(suggestion: string): string {
    return this.urlSearchSuggestionBase + suggestion;
  }

  onSelect(suggestion: SuggestionModel): void {
    this.selectedMaterial = suggestion;
    console.log(this.selectedMaterial.materialID);
    console.log(
      'redirecting to details page with id: ' + this.selectedMaterial.materialID
    );
    this.router.navigate([`/details/${this.selectedMaterial.materialID}`]);
  }

  //refactor into 2 different functions
  /*   getCall(mid: string): void {
    let options = { headers: this.headers };
    this.http.get(this.urlBase + mid + '.json', options).subscribe((data) => {
      let obj = JSON.parse(JSON.stringify(data));

      obj['sections'].forEach((element) => {
        //console.log(element.name)
        if (element?.name == this.DEPOT_LIST) {
          console.log(element?.rows);
          let temp: MapModel[] = element.rows
            .map((e) => {
              if (e?.class == 'MapResult') {
                let p: MapModel = new MapModel();
                p.address = e.result_address;
                p.id = e.id;
                p.x = e.geo_x;
                p.y = e.geo_y;
                p.label = e.label;
                p.phoneNumber = e.result_phone_number1;
                return p;
              }
              return null;
            })
            .filter((e) => e);
          this.map = temp;
          console.log(temp);
        } else if (element?.name == this.DESCRIPTION) {
          console.log(element?.rows);
          let temp: MapModel[] = element.rows
            .map((e) => {
              if (e?.field == 'Description') {
                let p: DescriptionModel = new DescriptionModel();
                p.description = e.value;
                return p;
              }
              return null;
            })
            .filter((e) => e);
          this.description = temp;
          console.log(temp);
        }
      });
    });
  } */

  //Details page
  //create uri 'api/recollect/Regina/services/waste/pages/en/'+'suggestion.materialID'+'.json'
  // use getCall function with the create uri
  // descriptions, geolocations.
}
