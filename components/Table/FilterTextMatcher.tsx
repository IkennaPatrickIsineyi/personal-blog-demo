import { FilterMatcherType } from "@/utils/types";

const FilterTextMatcher = {
    textMatcher: ({ filterOption, value, filterText }: FilterMatcherType) => {
        //This is for matching text value
        console.log('value', value, 'filterText', filterText)
        if (filterText == null) {
            return false;
        }

        //Check if the value contains any of the entry in filterText
        filterText = JSON.parse(filterText as string) as Array<any>

        return filterText?.find(item => item?.toString()?.trim() === value?.toString()?.trim()) ? true : false
    }
}

export default FilterTextMatcher