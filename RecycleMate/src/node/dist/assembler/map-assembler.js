"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapAssembler = void 0;
const MapModel_1 = require("../models/MapModel");
const DEPOT_LIST = "depot_list";
function mapAssembler(data) {
    let result;
    const obj = JSON.parse(JSON.stringify(data));
    const materialId = obj.id;
    if (obj.sections) {
        obj.sections.forEach((element) => {
            if ((element === null || element === void 0 ? void 0 : element.name) === DEPOT_LIST) {
                const temp = element.rows
                    .map((e) => {
                    if ((e === null || e === void 0 ? void 0 : e.class) === 'MapResult') {
                        const p = new MapModel_1.MapModel();
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
                    .filter((e) => e);
                result = temp;
            }
        });
    }
    return result;
}
exports.mapAssembler = mapAssembler;
//# sourceMappingURL=map-assembler.js.map