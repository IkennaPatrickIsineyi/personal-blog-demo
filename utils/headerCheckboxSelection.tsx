import { GenericObjectType } from "./types";

export default function headerCheckboxSelection(params: GenericObjectType) {
    return params.columnApi.getRowGroupColumns().length === 0;
}