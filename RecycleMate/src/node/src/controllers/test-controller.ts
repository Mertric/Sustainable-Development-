import {SustainableRepository} from "../repository/sustainable-repository"


const something = new SustainableRepository();
const exists = something.rowExists(231)
console.log(exists)

