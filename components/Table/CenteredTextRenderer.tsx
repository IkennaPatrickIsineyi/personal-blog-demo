import { GenericObjectType } from "@/utils/types";

const CenteredTextRenderer = (props: GenericObjectType) => {

    const colorData: GenericObjectType = {
        availableLanguages: '#6F3D17',
        publishedLanguages: '#008000',
        creator: '#4F92AB',
    }

    const { url, members } = props.colDef.cellRendererParams ?? {}

    const useUrl = Boolean(url && props?.value && members?.includes(props?.value))

    const color = useUrl ? '#FF7593' : colorData[props?.column?.colDef?.field];

    return (
        <span style={{
            color, fontSize: '12px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center',
            maxWidth: '100%'
        }}>
            {Array.isArray(props?.value)
                ? props?.value?.join(', ')
                : useUrl
                    ? <a href={`${url}?id=${props?.data?.id}`} style={{ textDecorationLine: 'none', color }}>
                        {props?.value}
                    </a>
                    : (props?.value || '--------')}
        </span>
    );
}

export default CenteredTextRenderer