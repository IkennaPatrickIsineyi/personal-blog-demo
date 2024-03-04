
import { Box, OutlinedInput } from "@mui/material";
import { ChangeEvent, useState } from "react";

export default function SearchBox() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = async (value: string) => {

    }

    const handleValueChange = async (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setSearchValue(value || '')
        value && await handleSearch(value);
    }



    return <Box>
        {/* Text field */}
        <OutlinedInput onChange={handleValueChange} value={searchValue}
            sx={{ height: 30 }}
        />

        {/* Search result list */}
        <Box>

        </Box>
    </Box>
}