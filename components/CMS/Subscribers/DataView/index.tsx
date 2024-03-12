'use client'

import Table from "@/components/Table";
import { Box } from "@mui/material";
import { indexStyle } from "./style";
import { useState } from "react";
import FilterTextMatcher from "@/components/Table/FilterTextMatcher";
import checkboxSelection from "@/utils/checkboxSelection";
import headerCheckboxSelection from "@/utils/headerCheckboxSelection";
import TextRenderer from "@/components/Table/TextRenderer";
import UiButton from "@/components/UiButton";
import { Add } from "@mui/icons-material";
import DateRenderer from "@/components/Table/DateRenderer";

export default function Subscribers() {
    const [columnDefs,] = useState([
        {
            field: 'id',
            headerName: null,
            maxWidth: 50,
            filter: 'agTextColumnFilter',
            filterParams: FilterTextMatcher,
            checkboxSelection: checkboxSelection,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: headerCheckboxSelection,
        },
        {
            field: 'createdAt',
            minWidth: 100,
            cellRenderer: DateRenderer,
            headerName: 'Date',
        },
        {
            field: 'email',
            minWidth: 100,
            cellRenderer: TextRenderer,
            headerName: 'Email',
        },
    ]);

    return <Box sx={{ height: '100%', width: '100%' }}>
        {/* Actions */}
        <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', sm: 'flex-end' }, maxWidth: '100%',
            position: 'sticky', top: 0, zIndex: 323, py: 1, px: 2
        }}>
            {/* Create button */}
            <UiButton href="/cms/subscribers/create" size="small" value={'Create Subscriber'}
                rightIcon={<Add />} variant={"contained"}
            />
        </Box>

        <Box sx={indexStyle.tableWrapper}>
            <Table headingArray={columnDefs}
                setValueSummary={() => { }} currentTab={'all'} tabKey={'all'}
                editUrl={'/cms/subscribers/edit'} filterRows={[]} title={'Subscriber'}
                floatingActions={['edit', 'delete', 'deleteAll']}
                viewUrl={'/cms/subscribers/view'} valuesURL={'/api/subscribers'} showTableAction={true}
                deleteEndpoint={'/api/subscribers/delete'} valuesArray={[]}
            />
        </Box>
    </Box>
}