import { MapModel } from "../models/MapModel"
const DEPOT_LIST = "depot_list";

export function mapAssembler(data: any): MapModel[] {
    let result: MapModel[];
    const obj = JSON.parse(JSON.stringify(data));
    const materialId = obj.id;
    if (obj.sections) {
      obj.sections.forEach((element: any) => {
        if (element?.name === DEPOT_LIST) {
          const temp: MapModel[] = element.rows
            .map((e: any) => {
              if (e?.class === 'MapResult') {
                const p: MapModel = new MapModel();
                p.address = e.result_address;
                p.id = materialId;
                p.x = e.geo_x;
                p.y = e.geo_y;
                p.label = e.label;
                p.phoneNumber = e.result_phone_number1;
                p.locationId = e.id;
               
                return p;
              }
              return null;
            })
            .filter((e:any) => e);
          result = temp;
        }
      });
    }
    return result;
}