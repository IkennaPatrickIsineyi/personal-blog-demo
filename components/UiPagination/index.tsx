import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import style from './style.module.css'
import { East, KeyboardArrowLeft, KeyboardArrowRight, MoreHoriz, West } from "@mui/icons-material";

type Props = {
    itemsPerPage: number,
    totalItems: number,
    pageRangeDisplayed: number,
    onPaginate: ({ offset, endOffset }: { offset: number, endOffset: number }) => void
}

export default function UiPagination({ itemsPerPage, pageRangeDisplayed, totalItems, onPaginate }: Props) {
    const [offset, setOffset] = useState(0);

    const darkmode = useTheme().palette.mode === 'dark';
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % totalItems;
        setOffset(newOffset)
        onPaginate({ offset: newOffset, endOffset: newOffset + itemsPerPage })
    }

    const PageinationButton = ({ direction }: { direction: 'next' | 'previous' }) => {
        return <IconButton sx={{ borderRadius: '8px' }}>
            <Typography sx={{ display: 'flex', alignItems: 'center', fontSize: 12, fontWeight: 600, fontFamily: 'inter' }}>
                {direction === 'next' && 'Next'} {direction === 'next' ? <East sx={{ fontSize: 18, ml: 1 }} /> : <West sx={{ fontSize: 18, mr: 1 }} />} {direction === 'previous' && 'Previous'}
            </Typography>
        </IconButton>
    }

    const PaginationLabel = ({ page }: { page: number }) => {
        return <IconButton sx={{ borderRadius: '8px', }}>
            <Typography sx={{ borderRadius: '8px', fontFamily: 'inter', px: 1, fontSize: 12, fontWeight: 700 }}>
                {page}
            </Typography>
        </ IconButton>
    }

    return <ReactPaginate
        breakLabel={<MoreHoriz />}
        nextLabel={<PageinationButton direction="next" />}
        previousLabel={<PageinationButton direction="previous" />}
        onPageChange={handlePageClick}
        containerClassName={style.container}
        pageClassName={style.pageClassName}
        previousClassName={style.previousClassname}
        activeClassName={darkmode ? style.activeClassnameDark : style.activeClassname}
        nextClassName={style.nextClassname}
        pageRangeDisplayed={pageRangeDisplayed}
        pageLabelBuilder={(page) => <PaginationLabel page={page} />}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
    />
}