import { DescriptionModel } from "../models/descriptionModel";


const DESCRIPTION: string = 'description';

export function descriptionAssembler(descriptions: any): DescriptionModel[] {
    let results: DescriptionModel[] = [];
    const obj = JSON.parse(JSON.stringify(descriptions));
    // console.log(obj.id , obj.caption);
    const objectId = obj.id;
    const objectCaption = obj.caption;
    obj.sections.forEach((element:any) => {
      if (element?.name === DESCRIPTION) {
        const temp: DescriptionModel[] = element.rows
          .map((e: any) => {
            if (e?.field === 'Description') {
              const p: DescriptionModel = new DescriptionModel();
              p.description = e.value;
              p.label = objectCaption;
              p.id = objectId;
              return p;
            }
            return null;
          })
          // .filter((e) => e);
          results = temp;
      }
    });
    return results;
}