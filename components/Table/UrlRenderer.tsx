import { GenericObjectType } from "@/utils/types";

const UrlRenderer = (props: GenericObjectType) => {

    const linkFormatter = ({ link = '' }) => {
        return `https://${link.split('://').pop() ?? ''}`
    }

    return (<a href={linkFormatter({ link: props?.url ?? props?.value })}  >
        {props?.value}
    </a>
    );
}

export default UrlRenderer