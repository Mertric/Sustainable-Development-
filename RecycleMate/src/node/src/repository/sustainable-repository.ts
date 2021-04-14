import { async } from '@angular/core/testing';
import * as mysql from 'mysql2';

export class SustainableRepository {
  private sustainableRepository: SustainableRepository;
  con = mysql.createConnection({
    host: 'localhost',
    user: 'node_test',
    password: 'forsaken1.',
    database: 'recyclesmart',
  });

  private SustainableRepository() {
    this.con.connect();
  }

  public getInstance() {
    if (this.sustainableRepository) {
      return this.sustainableRepository;
    }
    this.sustainableRepository = new SustainableRepository();
    return this.sustainableRepository;
  }

  public async isItemMaterialExist(id: any): Promise<boolean> {
    const sql = `SELECT 1 FROM item_material WHERE id=${id}`;
    const result = await this.con.promise().execute(sql);
    // console.log(result);
    const aResult: [] = JSON.parse(JSON.stringify(result[0])); // fixme - performance hog
    // console.log("hello",aResult);
    return aResult.length > 0;
  }

  public async isLocationExistByMaterialId(id: any): Promise<boolean> {
    const sql = `SELECT 1 FROM location WHERE id=${id}`;
    const result = await this.con.promise().execute(sql);
    // console.log(result);
    const aResult: [] = JSON.parse(JSON.stringify(result[0])); // fixme - performance hog
    // console.log("hello",aResult);
    return aResult.length > 0;
  }

  public async isLocationExistByLocationId(
    locId: any,
    materialId: number
  ): Promise<boolean> {
    const sql = `SELECT 1 FROM location WHERE locationId=${locId} AND id=${materialId}`;
    console.log(sql);
    const result = await this.con.promise().execute(sql);
    // console.log(result);
    const aResult: [] = JSON.parse(JSON.stringify(result[0])); // fixme - performance hog
    // console.log("hello",aResult);
    return aResult.length > 0;
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

  public async setItemMaterial(
    id: number,
    label: string,
    description: string
  ): Promise<string> {
    const x = this.isItemMaterialExist(id);
    if ((await x).valueOf()) {
      return 'item exists already';
    } else {
      return await Promise.resolve(
        this.getItemMaterialQuery(id, label, description)
      );
    }
  }

  private async getItemMaterialQuery(
    id: number,
    label: string,
    description: string
  ): Promise<any> {
    const sql = `INSERT INTO item_material (id , label, item_desc) VALUES (
      ${id}, 
      ${mysql.escape(label)}, 
      ${mysql.escape(description)}
    );`;
    console.log(sql);
    const result = await this.con.promise().execute(sql);
    return result;
  }

  public async addLocation(
    geoX: number,
    geoY: number,
    address: string,
    phoneNumber: string,
    haversine: number = null,
    materialId: number,
    locationId: number
  ): Promise<string> {
    const x = this.isLocationExistByLocationId(locationId, materialId);
    if ((await x).valueOf()) {
      return 'item exists already';
    } else {
      return await Promise.resolve(
        this.getLocationQuery(
          geoX,
          geoY,
          address,
          phoneNumber,
          haversine,
          materialId,
          locationId
        )
      );
    }
  }
  
  private async getLocationQuery(
    geoX: number,
    geoY: number,
    address: string,
    phoneNumber: string,
    haversine: number = null,
    materialId: number,
    locationId: number
  ): Promise<any> {
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
    const result = await this.con.promise().execute(sql);
    return result;
  }

  public getLocationByMaterialId(id: number) {
    if (!id) {
      return '';
    }
    const sql = `SELECT * FROM location WHERE id=${id}`;
    console.log(sql);
    const result = this.con.promise().execute(sql);
    console.log(result);
    return result;
  }


  public async getDetailsByMaterialId(id: number) {
    if (!id) {
      return '';
    }
    const sql = `SELECT item_desc, id, label from item_material where id = ${id}`;
    const result = await this.con.promise().execute(sql);
    return result;
  }
}

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


