import { FilterMatcherType } from "@/utils/types";

const DurationMatcher = {
    textMatcher: ({ filterOption, value, filterText }: FilterMatcherType) => {
        if (filterText == null) {
            return false;
        }
        //Check if the value contains any of the entry in filterText
        filterText = JSON.parse(filterText as string) as Array<any>
        const x = filterText[0]

        return value === `${x?.hours ? (x?.hours + 'hours') : ''} ${x?.minutes ? (x?.minutes + ' minutes') : ''}`
    }
}

export default DurationMatcher