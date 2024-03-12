import { GenericObjectType } from "@/utils/types";

const ColoredTextRenderer = (props: GenericObjectType) => {

    const colorCodes: GenericObjectType = {
        public: {
            color: '#6B9DFF',
            label: 'Public'
        },
        activists: {
            color: '#800080',
            label: 'Activists'
        },
        fixed: {
            color: '#FFA500',
            label: 'Fixed Deadline'
        },
        alwaysOpen: {
            color: '#008000',
            label: 'Always Open'
        },
        tempClosed: {
            color: '#FF0000',
            label: 'Temporarily Closed'
        },
    }

    const obj = colorCodes[props?.value]
    return (
        <span style={{
            color: obj?.color, fontSize: '12px'
        }}>
            {obj?.label || '--------'}
        </span>
    );
}

export default ColoredTextRenderer