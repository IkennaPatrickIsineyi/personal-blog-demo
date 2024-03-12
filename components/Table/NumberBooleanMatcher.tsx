import { FilterMatcherType } from "@/utils/types";

const NumberBooleanMatcher = {
    textMatcher: ({ filterOption, value, filterText }: FilterMatcherType) => {
        //This is for matching array value
        if (filterText == null) {
            return false;
        }
        //Check if the value evaluates to true 
        return Number(value) ? true : false
    }
}

export default NumberBooleanMatcher