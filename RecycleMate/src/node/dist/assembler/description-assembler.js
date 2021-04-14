"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptionAssembler = void 0;
const descriptionModel_1 = require("../models/descriptionModel");
const DESCRIPTION = 'description';
function descriptionAssembler(descriptions) {
    let results = [];
    const obj = JSON.parse(JSON.stringify(descriptions));
    // console.log(obj.id , obj.caption);
    const objectId = obj.id;
    const objectCaption = obj.caption;
    obj.sections.forEach((element) => {
        if ((element === null || element === void 0 ? void 0 : element.name) === DESCRIPTION) {
            const temp = element.rows
                .map((e) => {
                if ((e === null || e === void 0 ? void 0 : e.field) === 'Description') {
                    const p = new descriptionModel_1.DescriptionModel();
                    p.description = e.value;
                    p.label = objectCaption;
                    p.id = objectId;
                    return p;
                }
                return null;
            });
            // .filter((e) => e);
            results = temp;
        }
    });
    return results;
}
exports.descriptionAssembler = descriptionAssembler;
//# sourceMappingURL=description-assembler.js.map