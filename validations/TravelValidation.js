import Validator from "validator";
import { isEmpty } from "./is-empty.js";
const travelInput =(data)=>{
    data.location = !isEmpty(data.location) ? data.location : "";
    data.heritages = !isEmpty(data.heritages) ? data.heritages : "";
    let errors = ""
    if(Validator.isEmpty(data.location)){
        errors = "Location field is required"
    }
    if(Validator.isEmpty(data.heritages)){
        errors = "Heritage field is required"
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}

export {travelInput}