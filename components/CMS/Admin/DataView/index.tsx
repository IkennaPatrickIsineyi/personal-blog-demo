'use client'

import Table from "@/components/Table";
import { Box } from "@mui/material";
import { indexStyle } from "./style";
import { useState } from "react";
import FilterTextMatcher from "@/components/Table/FilterTextMatcher";
import checkboxSelection from "@/utils/checkboxSelection";
import headerCheckboxSelection from "@/utils/headerCheckboxSelection";
import TextRenderer from "@/components/Table/TextRenderer";
import AvatarRenderer from "@/components/Table/AvatarRenderer";
import UiButton from "@/components/UiButton";
import { Add } from "@mui/icons-material";

export default function Admin() {
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
            field: 'profilePicture',
            minWidth: 100,
            cellRenderer: AvatarRenderer,
            headerName: 'Picture',
        },
        {
            field: 'fullName',
            minWidth: 100,
            cellRenderer: TextRenderer,
            headerName: 'Full Name',
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
            <UiButton href="/cms/admin/create" size="small" value={'Create Admin'}
                rightIcon={<Add />} variant={"contained"}
            />
        </Box>

        <Box sx={indexStyle.tableWrapper}>
            <Table headingArray={columnDefs}
                setValueSummary={() => { }} currentTab={'all'} tabKey={'all'}
                editUrl={'/cms/admin/edit'} filterRows={[]} title={'Admin'}
                floatingActions={['edit', 'delete', 'deleteAll']}
                viewUrl={'/cms/admin/view'} valuesURL={'/api/admin'} showTableAction={true}
                deleteEndpoint={'/api/admin/delete'} valuesArray={[]}
            />
        </Box>
    </Box>
}