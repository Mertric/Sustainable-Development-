"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SustainableRepository = void 0;
const mysql = __importStar(require("mysql2"));
class SustainableRepository {
    constructor() {
        this.con = mysql.createConnection({
            host: 'localhost',
            user: 'node_test',
            password: 'forsaken1.',
            database: 'recyclesmart',
        });
    }
    SustainableRepository() {
        this.con.connect();
    }
    getInstance() {
        if (this.sustainableRepository) {
            return this.sustainableRepository;
        }
        this.sustainableRepository = new SustainableRepository();
        return this.sustainableRepository;
    }
    isItemMaterialExist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT 1 FROM item_material WHERE id=${id}`;
            const result = yield this.con.promise().execute(sql);
            // console.log(result);
            const aResult = JSON.parse(JSON.stringify(result[0])); // fixme - performance hog
            // console.log("hello",aResult);
            return aResult.length > 0;
        });
    }
    isLocationExistByMaterialId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT 1 FROM location WHERE id=${id}`;
            const result = yield this.con.promise().execute(sql);
            // console.log(result);
            const aResult = JSON.parse(JSON.stringify(result[0])); // fixme - performance hog
            // console.log("hello",aResult);
            return aResult.length > 0;
        });
    }
    isLocationExistByLocationId(locId, materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `SELECT 1 FROM location WHERE locationId=${locId} AND id=${materialId}`;
            console.log(sql);
            const result = yield this.con.promise().execute(sql);
            // console.log(result);
            const aResult = JSON.parse(JSON.stringify(result[0])); // fixme - performance hog
            // console.log("hello",aResult);
            return aResult.length > 0;
        });
    }
    // Return a new promise
    //     return new Promise((resolve) => {
    //       // Create the sql query (this uses placeholders)
    //       // Hard coded values don't need to be placeholders but just for example:
    //       const sql = "SELECT 1 FROM ?? WHERE ?? = ?";
    //       // Query the database replacing the ?? and ? with actual data
    //       this.con.query(
    //         sql,
    //         ["item_material", "id", id],
    //         (error, result, field) => {
    //           // Result will either be undefined or a row.
    //           // Convert it to a boolean and return it.
    //           resolve(!!result);
    //         }
    //       );
    //     });
    // }
    setItemMaterial(id, label, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const x = this.isItemMaterialExist(id);
            if ((yield x).valueOf()) {
                return 'item exists already';
            }
            else {
                return yield Promise.resolve(this.getItemMaterialQuery(id, label, description));
            }
        });
    }
    getItemMaterialQuery(id, label, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO item_material (id , label, item_desc) VALUES (
      ${id}, 
      ${mysql.escape(label)}, 
      ${mysql.escape(description)}
    );`;
            console.log(sql);
            const result = yield this.con.promise().execute(sql);
            return result;
        });
    }
    addLocation(geoX, geoY, address, phoneNumber, haversine = null, materialId, locationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const x = this.isLocationExistByLocationId(locationId, materialId);
            if ((yield x).valueOf()) {
                return 'item exists already';
            }
            else {
                return yield Promise.resolve(this.getLocationQuery(geoX, geoY, address, phoneNumber, haversine, materialId, locationId));
            }
        });
    }
    getLocationQuery(geoX, geoY, address, phoneNumber, haversine = null, materialId, locationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = `INSERT INTO Location (geoX, geoY, address, phoneNumber, haversine, id, locationId) VALUES (
      ${geoX}, 
      ${geoY}, 
      ${mysql.escape(address)},
      ${mysql.escape(phoneNumber)},
      ${haversine},
      ${materialId},
      ${locationId}
    );`;
            console.log(sql);
            const result = yield this.con.promise().execute(sql);
            return result;
        });
    }
    getLocationByMaterialId(id) {
        if (!id) {
            return '';
        }
        const sql = `SELECT * FROM location WHERE id=${id}`;
        console.log(sql);
        const result = this.con.promise().execute(sql);
        console.log(result);
        return result;
    }
    getDetailsByMaterialId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                return '';
            }
            const sql = `SELECT item_desc, id, label from item_material where id = ${id}`;
            const result = yield this.con.promise().execute(sql);
            return result;
        });
    }
}
exports.SustainableRepository = SustainableRepository;
//get -> getting single row
//getByX
//findObjectNameByParameters - multiple rows expect back (or an array back)
//findMaterialsByMaterialIdAndLocationId
//findMaterialsByMaterialIdOrLocationId
//findLocatioNidByMaterialId
//is
//(param)
//getMaterialId -> number/string/uuid
//get
//CRUD (repo/controller/services) 
//create (create/add)
//delete
//update 
//read (get/find)
//# sourceMappingURL=sustainable-repository.js.map