import { GenericObjectType } from "@/utils/types";
import moment from "moment/moment";

const DateRenderer = (props: GenericObjectType) => {

    return (
        <span style={{
            fontSize: '12px'
        }}>
            {props?.value ? moment(props?.value).format('DD/MM/yyyy h:mma') : '------'}
        </span>
    );
}

export default DateRenderer