import { FilterMatcherType } from "@/utils/types";

const FilterArrayMatcher = {
    textMatcher: ({ filterOption, value, filterText }: FilterMatcherType) => {
        //This is for matching array value
        if (filterText == null) {
            return false;
        }
        //Check if the value contains all the entry in filterText
        const valueArr = value?.split(',');
        filterText = JSON.parse(filterText as string) as Array<any>

        console.log('value', valueArr, 'filterText', filterText)

        return valueArr?.filter((item: any) => filterText.includes(item))?.length === filterText?.length ? true : false
    }
}

export default FilterArrayMatcher