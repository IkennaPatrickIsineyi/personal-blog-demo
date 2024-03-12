
import { GenericObjectType } from "./types";

export default function checkboxSelection(params: GenericObjectType) {
    return params.columnApi.getRowGroupColumns().length === 0;
}