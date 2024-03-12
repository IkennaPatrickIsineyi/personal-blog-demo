import { FilterMatcherType } from "@/utils/types";

const BooleanMatcher = {
    textMatcher: ({ filterOption, value, filterText }: FilterMatcherType) => {
        //This is for matching text value 
        if (filterText == null) {
            return false;
        }

        //Check if the value contains any of the entry in filterText
        filterText = JSON.parse(filterText as string) as Array<any>

        return filterText?.filter((item: any) => (item?.toString()?.trim() === value?.toString()?.trim()))?.length ? true : false
    }
}

export default BooleanMatcher