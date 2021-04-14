import { async } from '@angular/core/testing';
import { SustainableRepository } from './../repository/sustainable-repository';
import fetch from 'node-fetch';
import { descriptionAssembler } from '../assembler/description-assembler';
import { DescriptionModel } from '../models/descriptionModel';
import { mapAssembler } from '../assembler/map-assembler';
import { MapModel } from '../models/MapModel';

export class MaterialService {
  private materialService: MaterialService;
  private sustainableRepository: SustainableRepository = new SustainableRepository().getInstance();

  public MaterialService() {
    this.getInstance(); // singleton
    this.sustainableRepository = new SustainableRepository().getInstance();
    console.log(this.sustainableRepository);
  }

  public getInstance() {
    if (this.materialService) {
      return this.materialService;
    }
    this.materialService = new MaterialService();
    return this.materialService;
  }

  public async getMaterialDetail(
    materialId: number
  ): Promise<DescriptionModel[]> {
    const materialUrl = `https://api.recollect.net/api/areas/Regina/services/waste/pages/en/${materialId}.json`;
    const p = await this.sustainableRepository.isItemMaterialExist(materialId);
    // console.log(this.sustainableRepository.rowExists(materialId));
    if (p.valueOf()) {
      // get from database
      const k = await this.sustainableRepository.getDetailsByMaterialId(materialId);
      //console.log(k);
      return JSON.parse(JSON.stringify(k[0]));
    } else {
      //console.log("made it here");
      const response = await fetch(materialUrl);
      const body = await response.json();
      const assembled = descriptionAssembler(body);
      const o = assembled[0];
      //console.log("also made it here")
      this.sustainableRepository.setItemMaterial(o.id, o.label, o.description);
      // insert into database using the assembled variable
      const k = await this.sustainableRepository.getDetailsByMaterialId(o.id);
      return JSON.parse(JSON.stringify(k[0]));
    }
  }

  public async getLocations(
    materialId: number
  ): Promise<MapModel[]> {
    const materialUrl = `https://api.recollect.net/api/areas/Regina/services/waste/pages/en/${materialId}.json`;
    const p = await this.sustainableRepository.isLocationExistByMaterialId(materialId);
    // console.log(this.sustainableRepository.rowExists(materialId));
    if (p.valueOf()) {
      // get from database
      const k = await this.sustainableRepository.getLocationByMaterialId(materialId);
      return JSON.parse(JSON.stringify(k[0]));
    } else {
      //console.log("made it here");
      const response = await fetch(materialUrl);
      const body = await response.json();
      const assembled = mapAssembler(body);
      const o = assembled;

      Promise.all(o.map((e) =>{
        return this.sustainableRepository.addLocation(
          e.x,
          e.y,
          e.address,
          e.phoneNumber,
          e.haversine,
          e.id = materialId,
          e.locationId
        );
      })).then(d => {
        console.log(d);
      });
      // insert into database using the assembled variable
      const k = await this.sustainableRepository.getLocationByMaterialId(materialId);
      return JSON.parse(JSON.stringify(k[0]));
    }
  }
}
