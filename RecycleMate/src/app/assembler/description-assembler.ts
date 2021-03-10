import { DescriptionModel } from "../model/descriptionModel"

const DESCRIPTION: string = 'description';

export function descriptionAssembler(descriptions: any): DescriptionModel[] {
    var results: DescriptionModel[] = [];
    let obj = JSON.parse(JSON.stringify(descriptions));
    obj['sections'].forEach((element:any) => {
      if (element?.name == DESCRIPTION) {
        let temp: DescriptionModel[] = element.rows
          .map((e) => {
            if (e?.field == 'Description') {
              let p: DescriptionModel = new DescriptionModel();
              p.description = e.value;
              return p;
            }
            return null;
          })
          .filter((e) => e);
          results = temp;
      }
    });
    return results;
}