import { FilterMatcherType } from "@/utils/types";

const EmailorPhoneMatcher = {
    textMatcher: ({ filterOption, value, filterText }: FilterMatcherType) => {
        //This is for matching text value 
        if (filterText == null) {
            return false;
        }
        //Check if the value contains any of the entry in filterText
        filterText = JSON.parse(filterText as string) as Array<any>

        if (filterText?.length === 1 && filterText.includes('email address')) {
            //Check if this value has @ 
            return value?.includes('@') ? true : false
        }
        if (filterText?.length === 1 && filterText.includes('phone number')) {
            //Check if this value does not have @ 
            return value?.includes('@') ? false : true
        }
        else return true
    }
}

export default EmailorPhoneMatcher