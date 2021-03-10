import { MapModel } from "../model/MapModel"
const DEPOT_LIST = "depot_list";

export function mapAssembler(data: any): MapModel[] {
    let result: MapModel[];
    let obj = JSON.parse(JSON.stringify(data));
    if (obj['sections']) {
      obj['sections'].forEach((element) => {
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
    }
    return result;
}