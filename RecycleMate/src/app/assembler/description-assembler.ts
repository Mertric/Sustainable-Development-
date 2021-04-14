import { DescriptionModel } from "../model/descriptionModel"

const DESCRIPTION: string = 'description';

export function descriptionAssembler(descriptions: any): DescriptionModel {
    var results: DescriptionModel[] = [];
    let obj = JSON.parse(JSON.stringify(descriptions));
    const objectId = obj.id;
    const objectCaption = obj.caption;
    const descriptionObj = obj[0];
    let temp: DescriptionModel[] = [];
    let p: DescriptionModel = new DescriptionModel();
    p.description = descriptionObj.item_desc;
    p.id = descriptionObj.id;
    p.label = descriptionObj.label;
    return p;
    // obj.forEach((element:any) => {
    //   console.log("this is some data",element.item_desc)
    //   let temp: DescriptionModel[] = [];
    //   let p: DescriptionModel = new DescriptionModel();
    //   p.description = element.item_desc;
    //   p.id = element.id;
    //   p.label = element.label;
      
      
    //   /* if (element?.name == DESCRIPTION) {
    //     let temp: DescriptionModel[] = element.rows
    //       .map((e) => {
    //         if (e?.field == 'Description') {
    //         let p: DescriptionModel = new DescriptionModel();
    //           p.description = e.value;
    //           p.id = objectId;
    //           p.description = objectCaption;
    //           return p;
    //         }
    //         return null;
    //       })
    //       .filter((e) => e);
    //       results = temp;
    //   } */
    // });
    // console.log("hey this is some results", results)
    // return results;
}