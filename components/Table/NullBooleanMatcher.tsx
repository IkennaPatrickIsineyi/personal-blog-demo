import { FilterMatcherType } from "@/utils/types";

const NullBooleanMatcher = {
    textMatcher: ({ filterOption, value, filterText }: FilterMatcherType) => {
        //Check if the value contains any of the entry in filterText
        filterText = JSON.parse(filterText as string) as Array<any>

        return filterText?.filter(item => item === true
            ? value?.toString()?.trim() != 'false'
            : item?.toString()?.trim() == value?.toString()?.trim())?.length ? true : false
    }
}

export default NullBooleanMatcher