import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
//import 'ag-grid-enterprise';


import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import style from './styles.module.css'

import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    useEffect,
    LegacyRef,
    CSSProperties,
} from 'react';

//import Filter from '../Filter'; 

import CMSFloatingActionBar from '../CMSFloatingActionBar';
import { Button, SxProps, Typography } from '@mui/material';
import Cancel from '@mui/icons-material/Cancel';
import { FilterChangedEvent, GridReadyEvent, RowSelectedEvent } from 'ag-grid-community';
import { GenericObjectType } from '@/utils/types';

type Props = {
    headingArray?: Array<GenericObjectType>, valuesArray?: [], valuesURL?: string, viewUrl?: string,
    filterRows?: Array<{ [key: string]: any }>,
    showTableAction?: boolean,
    editUrl?: string, title?: string, setValueSummary?: (props: {}) => void, currentTab: string, tabKey?: string,
    perPage?: number, floatingActions?: string[], deleteEndpoint?: string, replyUrl?: string, markAsReadEndpoint?: string,
    markAsUnreadEndpoint?: string, publishEndpoint?: string, unpublishEndpoint?: string,
    cancelEndpoint?: string, onRowClicked?: (props?: any) => void,
}


const Table = ({ headingArray, valuesArray, valuesURL, viewUrl, filterRows = [], showTableAction,
    editUrl, title, setValueSummary = () => { }, currentTab, tabKey = 'status', perPage, floatingActions = [],
    deleteEndpoint, replyUrl, markAsReadEndpoint, markAsUnreadEndpoint, publishEndpoint, unpublishEndpoint,
    cancelEndpoint, onRowClicked = () => { }, }: Props) => {


    const containerStyle = useMemo<CSSProperties>(() => ({ width: '100%', height: '100%', position: 'relative', }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<Array<{ [key: string]: any }>>([]);
    const [columnDefs, setColumnDefs] = useState<Array<GenericObjectType>>([]);
    const [selectItemsRows, setSelectedRows] = useState<Array<any>>([]);
    const [itemsPerPage, setItemsPerPage] = useState(perPage ?? 10)

    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: any } | null>(null);

    const [filterBarData, setFilterBarData] = useState<Array<any>>([]);

    const [read, setRead] = useState(false);
    const [replied, setReplied] = useState(false);
    const [published, setPublished] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const [defaultEmail, setDefaultEmail] = useState(false);

    const gridRef = useRef<GridReadyEvent>();

    useEffect(() => {
        if (headingArray) setColumnDefs(headingArray)

        setItemsPerPage(perPage ?? Math.ceil(window.innerHeight / 50))
    }, []);

    const defaultColDef = useMemo(() => {
        return {
            editable: false,
            sortable: true,
            domLayout: 'autoHeight',
            menuTabs: [],
            resizable: true,
            cellStyle: { fontSize: '12px' },
            flex: 1,
            headerCellClass: 'header-cell',
            minWidth: 80,
        };
    }, []);

    const getNewRowData = (currentTab: string, rowData: Array<{ [key: string]: any }>) => {
        return rowData.filter(item => currentTab === 'all' ? true
            : Array.isArray(item[tabKey]) ? item[tabKey].includes(currentTab)
                : (item[tabKey]?.toString() === currentTab?.toString()))
    }

    const processRows = (rowData: Array<{ [key: string]: any }>, currentTab: string) => {
        if (rowData?.length) {

            getNewRowData(currentTab, rowData)?.forEach(item => {
            });

            setValueSummary({
                total: getNewRowData(currentTab, rowData)?.length,
                read: getNewRowData(currentTab, rowData)?.filter(item => item?.status === 'read')?.length,
            })
        }
    }

    useEffect(() => {
        console.log('row data changed')
        processRows(rowData, currentTab)
    }, [rowData, /* currentTab */])


    const onGridReady = useCallback((params: GridReadyEvent<{ [key: string]: any }, any>) => {
        console.log('table is ready');

        if (valuesURL) {
            params.api.showLoadingOverlay();
            fetch(`${valuesURL}`, { method: 'GET', cache: 'no-store' })
                .then((resp) => resp.json())
                .then((data) => {
                    data = data?.data;

                    setRowData(data);
                });
        }
        else if (valuesArray) {
            setRowData(valuesArray)
        }

    }, [currentTab]);

    const handleCancelSelection = () => {
        setSelectedRows([]);
        gridRef.current?.api?.deselectAll();
    }

    const handleRowSelection = useCallback((event: RowSelectedEvent<{ [key: string]: any }, any>) => {
        const api = event.api;
        const selectedRows = api.getSelectedNodes();
        const x = selectedRows.map(item => item?.data?.id);

        console.log('selected row', selectedRows);

        // setStatus(status)

        setSelectedRows(x)
    }, [])

    const buildDurationLabel = (value: { [key: string]: any }) => {
        return `${value?.hours ? (value?.hours + 'hours') : ''} ${value?.minutes ? (value?.minutes + ' minutes') : ''}`
    }

    const updateFilterBarData = (filters: { [key: string]: any } | null) => {

        const data: Array<any> = []

        filters && Object.keys(filters).forEach(key => {
            const record = filters[key]
            const labelRecord = filterRows?.find(i => i?.value === key);

            key !== 'id' && JSON.parse(record?.filter)?.forEach((i: any) => {
                const label = labelRecord?.valueSet ?
                    labelRecord?.valueSet?.find((it: any) => it?.value === i)?.label
                    : i;

                data.push({
                    column: key,
                    value: i,
                    label: Number(label?.minutes) >= 0 ? buildDurationLabel(label) : label
                })
            })
        })

        setFilterBarData(data);
    }

    const applyFilter = ({ filters }: { filters: {} | null }) => {
        if (gridRef?.current?.api) {
            // Get a reference to the filter instance
            let gridApi = gridRef?.current.api;

            gridApi?.setFilterModel(filters)

            // Tell grid to run filter operation again
            gridApi.onFilterChanged();

            setSelectedFilters(filters)

            updateFilterBarData(filters)
        }
    }

    const handleFilterReset = () => {
        applyFilter({ filters: null })
    }

    const removeSelectedFilter = (columnId: string | number, value: string | number) => {
        if (gridRef?.current?.api) {
            // Get a reference to the filter instance
            let gridApi = gridRef.current.api;

            //Make a copy of the currently selected filters
            let copy: { [key: string]: any } | null = { ...(selectedFilters ?? {}) };

            //Get the column filter
            let columnFilter = selectedFilters && JSON.parse(selectedFilters[columnId]?.filter);

            console.log('column filter', columnId, value, columnFilter);

            //Remove the value from the array of values the column filter has
            columnFilter = columnFilter.filter((i: any) => i?.toString() !== value?.toString())

            console.log('new column filter', columnFilter)

            //If the columnFIlter is empty, delete the key from the copy
            if (!columnFilter?.length) {
                delete copy[columnId]
                //If the copy is now empty after the delete, set copy to null to reset the filter
                if (!Object.keys(copy)?.length) {
                    copy = null;
                    return handleFilterReset(); //Reset the filter since there is nothing left to filter
                }
            }
            else {
                //Put back the filter that has been changed if it is not empty
                copy[columnId] = { ...copy[columnId], filter: columnFilter?.length ? JSON.stringify(columnFilter) : null }
            }

            applyFilter({ filters: copy })
        }
    }

    const currentRowData = useMemo(() => {
        if (rowData) {
            setSelectedRows([])
            return rowData.filter(item => currentTab === 'all'
                ? true
                : Array.isArray(item[tabKey])
                    ? item[tabKey].includes(currentTab)
                    : (item[tabKey]?.toString() === currentTab?.toString()))
        }
        else {
            return []
        }
    }, [currentTab, rowData, tabKey])

    const onFilterChanged = (props: FilterChangedEvent<{ [key: string]: any }>) => {
        const nodes: Array<{ [key: string]: any }> = [];
        props.api.forEachNodeAfterFilter((item: { [key: string]: any }) => nodes.push(item.data))
        processRows(nodes, currentTab)
    }



    return (
        <div style={{ width: '100%', height: '100%', position: 'relative', }}>
            {filterBarData?.length > 0 && <div style={{
                display: 'flex', alignItems: 'center',
                background: '#F5F9FF', padding: '4px 12px',
            }}>
                <Typography sx={{ fontSize: '13px', mr: 1.5, minWidth: 'max-content' }}>
                    Showing the result of the following :
                </Typography>

                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                    {filterBarData?.map((item, index) => {
                        return <Typography key={index} style={{
                            display: 'flex', alignItems: 'center', maxWidth: 'max-content', fontSize: '12px',
                            minWidth: 'max-content', padding: '2px 8px', marginRight: '12px', color: '#0E60BF',
                            fontWeight: 400, background: '#F5F9FF', borderRadius: '12px', border: '1px solid #1414171A',
                            textTransform: 'capitalize'
                        }}>
                            {item?.label} <Cancel sx={{
                                cursor: 'pointer', ml: .5, fontSize: 14, color: 'black'
                            }} onClick={() => { removeSelectedFilter(item?.column, item?.value) }} />
                        </Typography>
                    })}
                </div>

                <Button sx={{
                    fontSize: '13px', mr: 1, color: '#0E60BF', textDecoration: 'underline',
                    minWidth: 'max-content', fontWeight: 600, ml: 'auto', py: .3
                }} onClick={handleFilterReset}>
                    Reset
                </Button>

            </div>
            }
            <div style={containerStyle}>
                <div style={gridStyle} className={`ag-theme-alpine ${style['ag-header']}`}>
                    <AgGridReact
                        ref={gridRef as unknown as LegacyRef<AgGridReact<{ [key: string]: any }>> | undefined}
                        rowData={currentRowData}
                        columnDefs={columnDefs}
                        //   autoGroupColumnDef={autoGroupColumnDef}
                        defaultColDef={defaultColDef}
                        //  onPaginationChanged={(prop) => { handlePaginationChange(prop) }}
                        overlayLoadingTemplate={`<img class='ag-grid-loader-image-gif'  style='height:20vh;width:20vh;' src='/images/loader.gif'/>`}
                        suppressRowClickSelection={true}
                        paginationPageSizeSelector={false}
                        unSortIcon={true}
                        onRowClicked={(e) => { onRowClicked(e.node.data?.id) }}
                        groupSelectsChildren={true}
                        /*  components={() => {
                             return { agColumnHeader: customHeader }
                         }} */
                        rowSelection={'multiple'}
                        onRowSelected={handleRowSelection}
                        paginationPageSize={itemsPerPage ?? 10}
                        onFilterChanged={onFilterChanged}
                        pivotPanelShow={'always'}
                        pagination={true}
                        onGridReady={onGridReady}
                    />
                </div>

                {showTableAction && selectItemsRows.length > 0 && <CMSFloatingActionBar selectItemsRows={selectItemsRows}
                    title={title} handleCancelSelection={handleCancelSelection}
                    floatingActions={floatingActions} viewUrl={viewUrl} read={read} replied={replied}
                    //  replyUrl={replyUrl || ''}
                    markAsReadEndpoint={markAsReadEndpoint} cancelled={cancelled} cancelEndpoint={cancelEndpoint}
                    markAsUnreadEndpoint={markAsUnreadEndpoint} published={published} defaultEmail={defaultEmail}
                    publishEndpoint={publishEndpoint} unpublishEndpoint={unpublishEndpoint}
                    editUrl={editUrl} deleteEndpoint={deleteEndpoint}
                />}

            </div>
        </div>

    );
};


export default Table