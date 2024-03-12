import { GenericObjectType } from "@/utils/types";
import moment from "moment/moment";

const DateRenderer = (props: GenericObjectType) => {

    const colorData: GenericObjectType = {
        availableLanguages: '#6F3D17',
        publishedLanguages: '#008000',
        creator: '#4F92AB'
    }

    return (
        <span style={{
            fontSize: '12px'
        }}>
            {props?.value ? moment(props?.value).format('DD/MM/yyyy') : '------'}
        </span>
    );
}

export default DateRenderer