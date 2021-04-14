import { publishFacade } from "@angular/compiler";
import { element } from "protractor";
import { MapModel } from "../model/MapModel"
const DEPOT_LIST = "depot_list";

export function mapAssembler(data: any): MapModel[] {
    let result: MapModel[];
    let obj = JSON.parse(JSON.stringify(data));
    console.log("what Am i looking at rn",obj);
    return obj.map((element) => {
      let p: MapModel = new MapModel();
      p.x = element.geoX;
      p.y = element.geoY;
      p.address = element.address;
      p.id = element.id;
      return p;
      //result.push(element);
    })
  }
/*     if (obj['sections']) {
      obj.forEach((element) => {
        if (element?.name == DEPOT_LIST) {
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
    } */
    //console.log("newarray" ,result)

    function haversien(userLong: any, userLat: any, locationLong: any, locationLat: any) {
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
    