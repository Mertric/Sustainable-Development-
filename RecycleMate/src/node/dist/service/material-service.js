"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialService = void 0;
const sustainable_repository_1 = require("./../repository/sustainable-repository");
const node_fetch_1 = __importDefault(require("node-fetch"));
const description_assembler_1 = require("../assembler/description-assembler");
const map_assembler_1 = require("../assembler/map-assembler");
class MaterialService {
    constructor() {
        this.sustainableRepository = new sustainable_repository_1.SustainableRepository().getInstance();
    }
    MaterialService() {
        this.getInstance(); // singleton
        this.sustainableRepository = new sustainable_repository_1.SustainableRepository().getInstance();
        console.log(this.sustainableRepository);
    }
    getInstance() {
        if (this.materialService) {
            return this.materialService;
        }
        this.materialService = new MaterialService();
        return this.materialService;
    }
    getMaterialDetail(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            const materialUrl = `https://api.recollect.net/api/areas/Regina/services/waste/pages/en/${materialId}.json`;
            const p = yield this.sustainableRepository.isItemMaterialExist(materialId);
            // console.log(this.sustainableRepository.rowExists(materialId));
            if (p.valueOf()) {
                // get from database
                const k = yield this.sustainableRepository.getDetailsByMaterialId(materialId);
                //console.log(k);
                return JSON.parse(JSON.stringify(k[0]));
            }
            else {
                //console.log("made it here");
                const response = yield node_fetch_1.default(materialUrl);
                const body = yield response.json();
                const assembled = description_assembler_1.descriptionAssembler(body);
                const o = assembled[0];
                //console.log("also made it here")
                this.sustainableRepository.setItemMaterial(o.id, o.label, o.description);
                // insert into database using the assembled variable
                const k = yield this.sustainableRepository.getDetailsByMaterialId(o.id);
                return JSON.parse(JSON.stringify(k[0]));
            }
        });
    }
    getLocations(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            const materialUrl = `https://api.recollect.net/api/areas/Regina/services/waste/pages/en/${materialId}.json`;
            const p = yield this.sustainableRepository.isLocationExistByMaterialId(materialId);
            // console.log(this.sustainableRepository.rowExists(materialId));
            if (p.valueOf()) {
                // get from database
                const k = yield this.sustainableRepository.getLocationByMaterialId(materialId);
                return JSON.parse(JSON.stringify(k[0]));
            }
            else {
                //console.log("made it here");
                const response = yield node_fetch_1.default(materialUrl);
                const body = yield response.json();
                const assembled = map_assembler_1.mapAssembler(body);
                const o = assembled;
                Promise.all(o.map((e) => {
                    return this.sustainableRepository.addLocation(e.x, e.y, e.address, e.phoneNumber, e.haversine, e.id = materialId, e.locationId);
                })).then(d => {
                    console.log(d);
                });
                // insert into database using the assembled variable
                const k = yield this.sustainableRepository.getLocationByMaterialId(materialId);
                return JSON.parse(JSON.stringify(k[0]));
            }
        });
    }
}
exports.MaterialService = MaterialService;
//# sourceMappingURL=material-service.js.map