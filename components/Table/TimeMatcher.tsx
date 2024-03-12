import { FilterMatcherType } from "@/utils/types";
import moment from "moment";

const TimeMatcher = {
    textMatcher: ({ filterOption, value, filterText }: FilterMatcherType) => {
        console.log({ value, filterText })

        if (filterText == null) {
            return false;
        }
        //Check if the value contains any of the entry in filterText
        filterText = moment(JSON.parse(filterText as string), 'hh:mm').format('h:mma').toString()

        return filterText === value
    }
}

export default TimeMatcher